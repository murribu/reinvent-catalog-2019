import { makeRelatedTableLink } from '../components/RelatedTableLink';
import Resource from './Resource';
import { IImageAttribute, IAttributeType, ActionType } from './interfaces/IAttribute';

export class Partner extends Resource {
  static $name = 'Partner';
  static $listGraphQLResponseShape = 'id name enabled';

  /*
  id: ID!
  name: String!
  enabled: Boolean!
  navLogo: S3Object
  users: [User]! @connection(name: "PartnerUsers")
  admins: [PartnerAdmin]! @connection(name: "PartnerAdmins")
  */

  static columns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Enabled', field: 'enabled', type: 'boolean' },
  ];

  static rowTransformer(rawRecord: any) {
    if (!rawRecord) {
      return {};
    }

    return {
      id: rawRecord.id,
      name: rawRecord.name,
      enabled: rawRecord.enabled,
      rawRecord,
    };
  };

  protected $getGraphQLResponseShape = 'id name enabled navLogo { key bucket region identityId } users(limit: 1000000) { items { id } }';
  protected $defaultAttributes = [
    { name: 'enabled', displayName: 'Enabled', type: IAttributeType.Boolean, helpText: 'When a partner is disabled, any users associated with it can still sign in, but they will not see any partner branding.' },
    { name: 'name', displayName: 'Name', type: IAttributeType.Text, required: true },
    { name: 'navLogo', displayName: 'Nav Logo', type: IAttributeType.Image, visible: [ActionType.UPDATE], width: 100, height: 100, helpText: 'Shown inside the navigation bar of the mobile app for users which are associated with this partner.' },
  ];
}

export default Partner;