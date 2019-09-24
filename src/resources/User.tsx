import React from 'react';
import AWS from 'aws-sdk';
import { difference } from 'lodash';
import { API, graphqlOperation } from 'aws-amplify';
import Resource, { ResourceAPIType } from './Resource';
import IResource from './interfaces/IResource';
import { IAttribute, ActionType, IAttributeType, ICollectionAttribute, ICollectionAttributeOption, IBooleanAttribute, AttributeColumnWidth, IElementAttribute } from './interfaces/IAttribute';

const states = require('./data/states.json');

export class User extends Resource {
  static $name = 'User';
  static $listGraphQLResponseShape = 'id profile { private chatEnabled } privateProfile { firstName lastName email }';
  static groups: IResource[] = [];

  static columns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Email Address', field: 'email' }
  ];

  static rowTransformer(rawRecord: any) {
    if (!rawRecord) {
      return {};
    }

    let attrs: any = {};
    try {
      if (rawRecord.privateProfile) {
        attrs = rawRecord.privateProfile;
      }
    } catch (err) {}

    return {
      id: rawRecord.id,
      username: rawRecord.id,
      name: [attrs.firstName, attrs.lastName].join(' '),
      email: attrs.email,
      rawRecord,
    };
  };

  protected $apiPath = '/users';
  protected $createApiType = ResourceAPIType.REST;
  protected $getGraphQLResponseShape = 'id profile { id bio state chatEnabled private } privateProfile { id firstName lastName email phoneNumber pushNotificationsEnabled emailNotificationsEnabled smsNotificationsEnabled primaryTreatmentCenter }';
  protected $profileId?: string;
  protected $privateProfileId?: string;
  protected originalUserGroups: any[] = [];

  protected $defaultAttributes = [
    { name: 'privateProfile.email', displayName: 'Email Address', type: IAttributeType.Email, required: true, readOnly: [ActionType.UPDATE], helpText: 'Email Address can only be changed by a user.' },
    { name: 'mfa', displayName: 'Multi-factor Authentication', type: IAttributeType.Boolean, variant: 'pill', helpText: 'MFA settings can only be changed by a user.', readOnly: [ActionType.UPDATE], visible: [ActionType.UPDATE] },
    { name: 'public-divider', type: IAttributeType.Divider, label: 'Public Data', helpText: 'This data is visible to all Cooperative Health users.' },
    { name: 'username', displayName: 'Username', type: IAttributeType.Text, required: true, readOnly: [ActionType.UPDATE], helpText: 'This cannot be changed once a user is created.' },
    { name: 'profile.bio', displayName: 'Bio', type: IAttributeType.TextArea, visible: [ActionType.UPDATE] },
    { name: 'profile.state', displayName: 'State', type: IAttributeType.Select, options: this.makeStateOptions(), visible: [ActionType.UPDATE] },
    { name: 'private-divider', type: IAttributeType.Divider, label: 'Private Data', helpText: 'This data is only visible to agents and employees of Cooperative Health.' },
    { name: 'privateProfile.firstName', displayName: 'First Name', type: IAttributeType.Text, required: true, columnWidth: 6 as AttributeColumnWidth },
    { name: 'privateProfile.lastName', displayName: 'Last Name', type: IAttributeType.Text, required: true, columnWidth: 6 as AttributeColumnWidth },
    { name: 'privateProfile.primaryTreatmentCenter', displayName: 'Primary Treatment Center', type: IAttributeType.Text, visible: [ActionType.UPDATE] },
    { name: 'settings-divider', type: IAttributeType.Divider, label: 'Settings', visible: [ActionType.UPDATE] },
    { name: 'profile.private', displayName: 'Privacy', type: IAttributeType.Boolean, helpText: 'The user cannot connect to others and others cannot connect to the user when Privacy is On. Changing your privacy setting does not impact existing connections. Privacy does not impact Public Profile, which is always visible.', visible: [ActionType.UPDATE] },
    { name: 'profile.chatEnabled', displayName: 'Chat Enabled', type: IAttributeType.Boolean, helpText: 'The user cannot send or receive chat messages if Chat is Off.', visible: [ActionType.UPDATE] },
    { name: 'privateProfile.pushNotificationsEnabled', displayName: 'Push Notifications Enabled', type: IAttributeType.Boolean, helpText: 'The user cannot send or receive chat messages if Chat is Off.', visible: [ActionType.UPDATE] },
    { name: 'privateProfile.emailNotificationsEnabled', displayName: 'Email Notifications Enabled', type: IAttributeType.Boolean, helpText: 'The user cannot send or receive chat messages if Chat is Off.', visible: [ActionType.UPDATE] },
    { name: 'privateProfile.smsNotificationsEnabled', displayName: 'SMS Notifications Enabled', type: IAttributeType.Boolean, helpText: 'The user cannot send or receive chat messages if Chat is Off.', visible: [ActionType.UPDATE] },
  ];

  getSaveMessage(apiResponse: any): string | JSX.Element {
    if (apiResponse.status === 201) {
      // Created
      const { tempPassword } = apiResponse.data;
      return (<span>Resource was successfully saved.The temporary password is <code style={{fontWeight: 'bold', display: 'inline', color: 'black'}}>{tempPassword}</code>. Please make a copy because this will only be displayed once.</span>);
    } else {
      // Updated
      return 'Resource was successfully saved.';
    }
  }

  protected async onInitialize() {
    await Promise.all([
      super.onInitialize(),
      this.fetchGroups(),
    ]);
  }

  protected async beforeCreate(data: any) {
    return {
      username: data.username,
      firstName: data.privateProfile.firstName,
      lastName: data.privateProfile.lastName,
      email: data.privateProfile.email,
      groups: data.groups,
    };
  }

  protected async beforeUpdate(data: any) {
    const dataCopy = Object.assign({}, data);

    delete dataCopy.profile;
    delete dataCopy.privateProfile;
    delete dataCopy.groups;
    delete dataCopy.enabled;
    delete dataCopy.username;
    delete dataCopy.mfa;

    return dataCopy;
  }

  protected async afterUpdate(data: any, originalData: any, response: any) {
    console.log('AFTER UPDATE', data, originalData, response);

    let profilePromise = this.$profileId
      ? this.updateProfile(this.$profileId, originalData.profile)
      : Promise.resolve();

    let privateProfilePromise = this.$privateProfileId
      ? this.updatePrivateProfile(this.$privateProfileId, originalData.privateProfile)
      : Promise.resolve();

    let groupsPromise = this.updateGroups(originalData.groups);

    return await Promise.all([
      profilePromise,
      privateProfilePromise,
      groupsPromise,
    ]);
  }

  protected async updateProfile(profileId: string, profileData: any): Promise<any> {
    const mutation = `mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
      updateUserProfile(input: $input) {
        id
      }
    }`;

    const input = {
      id: profileId,
      ...profileData
    };

    return API.graphql(graphqlOperation(mutation, { input }));
  }

  protected async updatePrivateProfile(profileId: string, profileData: any): Promise<any> {
    const mutation = `mutation UpdatePrivateUserProfile($input: UpdatePrivateUserProfileInput!) {
      updatePrivateUserProfile(input: $input) {
        id
      }
    }`;

    const input = {
      id: profileId,
      ...profileData
    };

    return API.graphql(graphqlOperation(mutation, { input }));
  }

  protected async updateGroups(newGroups: any[]) {
    const groupsToAdd = difference(newGroups, this.originalUserGroups);
    const groupsToRemove = difference(this.originalUserGroups, newGroups);
    let promises = [] as any;

    if (groupsToAdd.length > 0) {
      groupsToAdd.forEach((group: string) => promises.push(this.addGroupToUser(group)));
    }

    if (groupsToRemove.length > 0) {
      groupsToRemove.forEach((group: string) => promises.push(this.removeGroupFromUser(group)));
    }

    if (promises.length === 0) {
      return Promise.resolve();
    }

    return await Promise.all(promises);
  }

  protected async addGroupToUser(groupName: string) {
    const userId = this.id;
    if (!userId) {
      return Promise.resolve();
    }

    return new Promise<any[]>((resolve, reject) => {
      const service = new AWS.CognitoIdentityServiceProvider();
      service.adminAddUserToGroup({ UserPoolId: String(process.env.REACT_APP_AWS_AUTH_USER_POOL_ID), Username: userId, GroupName: groupName }, (err: any, data: any) => {
        if (err) {
          console.error('ADDED USER TO GROUP ERR:', err);
          reject(err);
        } else {
          console.log('ADDED USER TO GROUP:', data);
          resolve();
        }
      });
    });
  }

  protected async removeGroupFromUser(groupName: string) {
    const userId = this.id;
    if (!userId) {
      return Promise.resolve();
    }

    return new Promise<any[]>((resolve, reject) => {
      const service = new AWS.CognitoIdentityServiceProvider();
      service.adminRemoveUserFromGroup({ UserPoolId: String(process.env.REACT_APP_AWS_AUTH_USER_POOL_ID), Username: userId, GroupName: groupName }, (err: any, data: any) => {
        if (err) {
          console.error('REMOVE USER FROM GROUP ERR:', err);
          reject(err);
        } else {
          console.log('REMOVE USER FROM GROUP:', data);
          resolve();
        }
      });
    });
  }

  protected fetchGroups(): Promise<any> {
    if (User.groups && User.groups.length > 0) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const service = new AWS.CognitoIdentityServiceProvider();
      service.listGroups({ UserPoolId: String(process.env.REACT_APP_AWS_AUTH_USER_POOL_ID) }, (err: any, data: any) => {
        if (err) {
          console.error('COGNITO GROUPS ERR:', err);
          resolve();
        } else {
          console.log('COGNITO GROUPS:', data);
          User.groups = data.Groups;
          resolve();
        }
      });
    });
  }

  protected fetchGroupsForUser(userId: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const service = new AWS.CognitoIdentityServiceProvider();
      service.adminListGroupsForUser({ UserPoolId: String(process.env.REACT_APP_AWS_AUTH_USER_POOL_ID), Username: userId }, (err: any, data: any) => {
        if (err) {
          console.error('USER GROUPS ERR:', err);
          reject(err);
        } else {
          console.log('USER GROUPS:', data);
          resolve(data.Groups);
        }
      });
    });
  }

  protected fetchCognitoUser(userId: string): Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      const service = new AWS.CognitoIdentityServiceProvider();
      service.adminGetUser({ UserPoolId: String(process.env.REACT_APP_AWS_AUTH_USER_POOL_ID), Username: userId }, (err: any, data: any) => {
        if (err) {
          console.error('COGNITO USER ERR:', err);
          reject(err);
        } else {
          console.log('COGNITO USER:', data);
          resolve(data);
        }
      });
    });
  }

  protected enableUser(userId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const service = new AWS.CognitoIdentityServiceProvider();
      service.adminEnableUser({ UserPoolId: String(process.env.REACT_APP_AWS_AUTH_USER_POOL_ID), Username: userId }, (err: any, data: any) => {
        if (err) {
          console.error('USER ENABLED ERR:', err);
          reject(err);
        } else {
          console.log('USER ENABLED:', data);
          resolve();
        }
      });
    });
  }

  protected disableUser(userId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const service = new AWS.CognitoIdentityServiceProvider();
      service.adminDisableUser({ UserPoolId: String(process.env.REACT_APP_AWS_AUTH_USER_POOL_ID), Username: userId }, (err: any, data: any) => {
        if (err) {
          console.error('USER DISABLED ERR:', err);
          reject(err);
        } else {
          console.log('USER DISABLED:', data);
          resolve();
        }
      });
    });
  }

  protected async onHydrateAttributes(rawRecord: any): Promise<any> {
    try {
      if (rawRecord.id) {
        const result = await Promise.all([
          this.fetchGroupsForUser(rawRecord.id),
          this.fetchCognitoUser(rawRecord.id),
        ]);

        const groups = result[0].map(g => g.GroupName);
        this.originalUserGroups = groups;

        this.setAttribute('groups', groups);
        this.setAttribute('enabled', result[1].Enabled);
        this.setAttribute('mfa', Object.keys(result[1]).includes('MFAOptions'));
      }

      this.setAttribute('username', rawRecord.id);

      // Set profile association IDs, but only if they are present.
      try {
        this.$profileId = rawRecord.profile.id;
      } catch (err) {}

      try {
        this.$privateProfileId = rawRecord.privateProfile.id;
      } catch (err) {}
    } catch (err) { }
  }

  protected makeAttributes(): IAttribute[] {
    const enabled = {
      name: 'enabled',
      displayName: 'User Account Enabled',
      type: IAttributeType.Boolean,
      visible: [ActionType.UPDATE],
      helpText: 'If off, the user will not be able to log in, but their data is preserved.',
      onChange: (checked: boolean) => {
        if (this.id) {
          return checked ? this.enableUser(this.id) : this.disableUser(this.id);
        }

        return Promise.resolve();
      }
    } as IBooleanAttribute;

    const groups = {
      name: 'groups',
      displayName: 'Groups',
      type: IAttributeType.Select,
      required: true,
      multiple: true,
      options: this.makeGroupOptions(),
    } as ICollectionAttribute;

    return [
      { name: 'auth-divider', type: IAttributeType.Divider, label: 'Security', helpText: 'This data is used for authentication and authorization. It is only visible to the user and agents and employees of Cooperative Health.' },
      enabled,
      groups,
      ...this.$defaultAttributes,
    ];
  }

  protected makeGroupOptions(): ICollectionAttributeOption[] {
    return User.groups.map((group: any) => {
      return {
        key: group.GroupName,
        value: group.GroupName,
      };
    }).sort((a, b) => a.key.localeCompare(b.key)) as ICollectionAttributeOption[];
  }

  protected makeStateOptions(): ICollectionAttributeOption[] {
    return states.map((state: any) => {
      return {
        key: state.name,
        value: state.name,
        // value: state.abbreviation,
      };
    });
  }
}

export default User;