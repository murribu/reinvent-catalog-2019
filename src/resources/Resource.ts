import { API, graphqlOperation } from 'aws-amplify';
import { capitalize, get, set } from 'lodash';
import pluralize from 'pluralize';
import { v4 as uuidv4 } from 'uuid';
import IResource from './interfaces/IResource';
import { IAttribute, IAttributeType, ICollectionAttribute, IImageAttribute } from './interfaces/IAttribute';
import { fileService } from '../services';
import { promises } from 'fs';

export enum ResourceAPIType {
  GRAPHQL,
  REST
}

export const DEFAULT_API_NAME = 'rest';

export abstract class Resource implements IResource {
  static $name = 'OVERRIDE_ME';
  static $versioned = false;
  static $listGraphQLResponseShape = 'id';

  static async all(responseShape: string | undefined = undefined, limit: number = 25, nextToken: string | null = null): Promise<any[]> {
    //! Allow for non GraphQL list operations
    const query = this.makeListGraphQLQuery(responseShape);
    const input = {
      limit
    } as any;

    if (nextToken && nextToken !== '') {
      input.nextToken = nextToken;
    }

    const response = await API.graphql(graphqlOperation(query, input));
    const resultKey = Object.keys((<any>response).data).shift() as string;
    const data = (<any>response).data[resultKey];

    console.log('GRAPHQL LIST RESPONSE', resultKey, response, data);

    return [data.items.map((item: any) => item), data.nextToken];
  }

  static makeListGraphQLQuery(responseShape: string | undefined = undefined): string {
    const resourceName = capitalize(this.$name);
    const pluralResourceName = pluralize(resourceName);

    return `query ListRecords(
      $filter: Model${resourceName}FilterInput
      $limit: Int
      $nextToken: String
    ) {
      list${pluralResourceName}(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          ${responseShape || this.$listGraphQLResponseShape}
          ${this.$versioned ? 'version' : ''}
        },
        nextToken
      }
    }`;
  }

  static async get(id: string, responseShape: string | undefined = undefined): Promise<any> {
    const query = this.makeGetGraphQLQuery(responseShape);
    const response = await API.graphql(graphqlOperation(query, { id }));
    const resultKey = Object.keys((<any>response).data).shift() as string;

    console.log('GRAPHQL GET RESPONSE', resultKey, response, (<any>response).data[resultKey]);

    return (<any>response).data[resultKey];
  }

  static makeGetGraphQLQuery(responseShape: string | undefined = undefined): string {
    const resourceName = capitalize(this.$name);

    return `query GetRecord($id: ID!) {
      get${resourceName}(id: $id) {
        ${responseShape || 'id'}
        ${this.$versioned ? 'version' : ''}
      }
    }`;
  }

  public id?: string;
  public signature: string = uuidv4();

  protected $apiPath = '';
  protected $apiName = DEFAULT_API_NAME;
  protected $currentVersion = 1;
  protected $listApiType: ResourceAPIType = ResourceAPIType.GRAPHQL;
  protected $createApiType: ResourceAPIType = ResourceAPIType.GRAPHQL;
  protected $updateApiType: ResourceAPIType = ResourceAPIType.GRAPHQL;
  protected $deleteApiType: ResourceAPIType = ResourceAPIType.GRAPHQL;
  protected $defaultAttributes: IAttribute[] = [];
  protected $attributes?: IAttribute[];
  protected $partialRecord: boolean;
  protected $recordToLoadOnInit: any;
  protected $getGraphQLResponseShape = 'id';

  public get attributes(): IAttribute[] {
    if (this.$attributes === undefined) {
      this.$attributes = this.makeAttributes();
    }

    return this.$attributes as IAttribute[];
  }

  constructor(record: any = null, partialRecord: boolean = false) {
    this.$partialRecord = partialRecord;

    if (record) {
      const { rawRecord } = record;

      if (rawRecord) {
        this.id = rawRecord.id;

        if (!partialRecord) {
          this.$recordToLoadOnInit = record;
        }
      }
    }
  }

  public async initialize() {
    await this.onInitialize();
    await this.hydrateAttributes();
  }

  public async save(): Promise<IResource> {
    if (!this.id) {
      return this.create(this.toData());
    }

    return this.update(this.id as string, this.toData());
  }

  public async delete(): Promise<any> {
    if (this.id) {
      if (this.$deleteApiType === ResourceAPIType.GRAPHQL) {
        return await this.postGraphQLRequestWithoutTransformedResponse(
          this.makeDeleteGraphQLMutation(),
          { input: { id: this.id } }
        );
      }

      return await this.deleteRequest(`${this.$apiPath}/${this.id}`, null);
    }

    return Promise.resolve();
  }

  public getSaveMessage(apiResponse: any): string | JSX.Element {
    return 'Resource was successfully saved.';
  }

  public toData() {
    const data: { [key: string]: any } = {};

    this.attributes
      .filter(attr => ![IAttributeType.Divider, IAttributeType.Element].includes(attr.type))
      .forEach(attr => {
        let value = attr.value;

        if (attr.type === IAttributeType.Select) {
          const collectionAttr = attr as ICollectionAttribute;
          if (collectionAttr.multiple) {
            value = this.formatAttrValue(collectionAttr.arrayValue);
          } else {
            value = this.formatAttrValue(collectionAttr.value);
          }
        }

        if (attr.type === IAttributeType.Boolean) {
          value = !!attr.value;
        }

        if (attr.name.includes('.')) {
          set(data, attr.name, this.formatAttrValue(value));
        } else {
          data[attr.name] = this.formatAttrValue(value);
        }

      });

    return data;
  }

  public setAttribute(name: string, value: any) {
    const matchedAttr = this.attributes.find(attr => attr.name === name);

    if (matchedAttr) {
      if (matchedAttr.type === IAttributeType.Select) {
        const collectionAttr = matchedAttr as ICollectionAttribute;
        if (collectionAttr.multiple) {
          collectionAttr.arrayValue = value;
        } else {
          collectionAttr.value = value;
        }
      } else {
        matchedAttr.value = value;
      }
    }
  }

  protected formatAttrValue(value: any): any {
    if (value === undefined) {
      return null;
    } else if (typeof value === 'string' && value === '') {
      return null;
    } else if (Array.isArray(value)) {
      return value.map(v => this.formatAttrValue(v));
    }

    return value;
  }

  protected async create(data: any, responseShape: string | null = null): Promise<Resource> {
    let requestData = data;
    const beforeCreateResult = await this.beforeCreate(data);

    if (beforeCreateResult === false) {
      return Promise.reject({
        response: {
          data: {
            error: 'Before Create Check Failed!',
          }
        }
      });
    }

    if (typeof beforeCreateResult === 'object') {
      requestData = beforeCreateResult;
    }

    await this.uploadFiles(requestData);

    if (this.$createApiType === ResourceAPIType.GRAPHQL) {
      return await this.postGraphQLRequest(
        this.makeCreateGraphQLMutation(responseShape),
        { input: { id: this.id, ...requestData } }
      ).then(async (response: any) => {
        await this.afterCreate(requestData, data, response);

        return response;
      });
    }

    return await this.postRequest(this.$apiPath, requestData)
      .then(async (response: any) => {
        await this.afterCreate(requestData, data, response);

        return response;
      });
  }

  protected async beforeCreate(data: any): Promise<any> {
    return Promise.resolve();
  }

  protected async afterCreate(data: any, originalData: any, response: any): Promise<any> {
    return Promise.resolve();
  }

  protected async update(id: string, data: any, responseShape: string | null = null): Promise<Resource> {
    let requestData = data;
    const beforeUpdateResult = await this.beforeUpdate(data);

    if (beforeUpdateResult === false) {
      return Promise.reject({
        response: {
          data: {
            error: 'Before Update Check Failed!',
          }
        }
      });
    }

    if (typeof beforeUpdateResult === 'object') {
      requestData = beforeUpdateResult;
    }

    await this.uploadFiles(requestData);

    const input = {
      id: this.id,
      ...requestData,
    } as any;

    if (this.getConstructor().$versioned) {
      input.expectedVersion = this.$currentVersion;
    }

    if (this.$updateApiType === ResourceAPIType.GRAPHQL) {
      return await this.postGraphQLRequest(
        this.makeUpdateGraphQLMutation(responseShape),
        { input }
      ).then(async (response: any) => {
        await this.afterUpdate(requestData, data, response);

        return response;
      });
    }

    return await this.putRequest(`${this.$apiPath}/${id}`, requestData)
      .then(async (response: any) => {
        await this.afterUpdate(requestData, data, response);

        return response;
      });
  }

  protected async beforeUpdate(data: any): Promise<any> {
    return Promise.resolve();
  }

  protected async afterUpdate(data: any, originalData: any, response: any): Promise<any> {
    return Promise.resolve();
  }

  protected async uploadFiles(requestData: any) {
    const promises: any[] = [];
    const attrs = Object.keys(requestData);

    attrs.forEach(attr => {
      const value = requestData[attr];

      if (value instanceof File) {
        promises.push(this.uploadFile(value, requestData, attr))
      }
    });

    await Promise.all(promises);

    return requestData;
  }

  protected async uploadFile(file: File, requestData: any, attributeName: string) {
    const { bucket, region, key, identityId } = await fileService.upload(file);

    requestData[attributeName] = {
      bucket,
      region,
      key,
      identityId,
    };
  }

  protected makeCreateGraphQLMutation(responseShape: string | null = null): string {
    const resourceName = capitalize(this.getConstructor().$name);

    return `mutation Create${resourceName}($input: Create${resourceName}Input!) {
      create${resourceName}(input: $input) {
        ${responseShape || 'id'}
      }
    }`;
  }

  protected makeUpdateGraphQLMutation(responseShape: string | null = null): string {
    const resourceName = capitalize(this.getConstructor().$name);

    return `mutation Update${resourceName}($input: Update${resourceName}Input!) {
      update${resourceName}(input: $input) {
        ${responseShape || 'id'}
      }
    }`;
  }

  protected makeDeleteGraphQLMutation(responseShape: string | null = null): string {
    const resourceName = capitalize(this.getConstructor().$name);

    return `mutation Delete${resourceName}($input: Delete${resourceName}Input!) {
      delete${resourceName}(input: $input) {
        ${responseShape || 'id'}
      }
    }`;
  }

  protected async postGraphQLRequest(operation: string, data: any): Promise<Resource> {
    const response = await API.graphql(graphqlOperation(operation, data));
    const errors = (<any>response).errors;
    if (errors && errors.length) {
      throw new Error(errors[0].message);
    }

    const resultKey = Object.keys((<any>response).data).shift() as string;
    this.$recordToLoadOnInit = { rawRecord: (<any>response).data[resultKey] };
    await this.hydrateAttributes();

    return this;
  }

  protected async postGraphQLRequestWithoutTransformedResponse(operation: string, data: any): Promise<Resource> {
    const response = await API.graphql(graphqlOperation(operation, data));
    const errors = (<any>response).errors;
    if (errors && errors.length) {
      throw new Error(errors[0].message);
    }

    return this;
  }

  protected async postRequest(path: string, data: any): Promise<Resource> {
    return await API.post(this.$apiName, path, this.makeRequest(data));
  }

  protected async putRequest(path: string, data: any): Promise<Resource> {
    return await API.put(this.$apiName, path, this.makeRequest(data));
  }

  protected async deleteRequest(path: string, data: any): Promise<Resource> {
    return await API.del(this.$apiName, path, this.makeRequest(data));
  }

  protected makeRequest(body: any = {}, headers: any = {}): any {
    return {
      body,
      headers,
      response: true,
    };
  }

  protected getConstructor() {
    return this.constructor as typeof Resource;
  }

  protected async onInitialize() {
    if (this.$partialRecord && this.id) {
      const ctor = this.getConstructor();
      this.$recordToLoadOnInit = {
        rawRecord: await ctor.get(this.id, this.makeGetResponseShapeFromAttributes()),
      };

      if (this.getConstructor().$versioned) {
        this.$currentVersion = this.$recordToLoadOnInit.rawRecord.version;
      }

      this.$partialRecord = false;
    }

    return Promise.resolve();
  }

  protected makeGetResponseShapeFromAttributes(): string {
    return this.$getGraphQLResponseShape;
  }

  protected makeAttributes(): IAttribute[] {
    return this.$defaultAttributes;
  }

  protected async hydrateAttributes() {
    if (this.$recordToLoadOnInit) {
      const imagePromises: any[] = [];
      const { rawRecord } = this.$recordToLoadOnInit;

      this.attributes.forEach((attr) => {
        let value = rawRecord[attr.name]

        if (attr.name.includes('.')) {
          value = get(rawRecord, attr.name);
        }

        if (attr.type === IAttributeType.Select) {
          const collectionAttr = attr as ICollectionAttribute;
          if (collectionAttr.multiple) {
            collectionAttr.originalValue = value;
            collectionAttr.arrayValue = value;
          } else {
            collectionAttr.originalValue = value;
            collectionAttr.value = value;
          }
        } else if (attr.type === IAttributeType.Image) {
          const imageAttr = attr as IImageAttribute;

          if (value) {
            imageAttr.value = value;
            imageAttr.originalValue = value;
            const imagePromise = fileService.get(value)
              .then((src: string) => {
                imageAttr.src = src;
              });

            imagePromises.push(imagePromise);
          }
        } else {
          attr.originalValue = value;
          attr.value = value;
        }
      });

      await Promise.all(imagePromises);
      await this.onHydrateAttributes(rawRecord);
    }
  }

  protected onHydrateAttributes(rawRecord: any): Promise<any> {
    return Promise.resolve();
  }
}

export default Resource;