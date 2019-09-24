import Resource from './Resource';
import { IAttributeType } from './interfaces/IAttribute';

export class Diagnosis extends Resource {
  static $name = 'Diagnosis';
  static $listGraphQLResponseShape = 'id name enabled icd10Code';

  static columns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'ICD-10 Code', field: 'icd10Code' },
    { title: 'Enabled?', field: 'enabled', type: 'boolean' },
  ];

  static rowTransformer(rawRecord: any) {
    if (!rawRecord) {
      return {};
    }

    return {
      id: rawRecord.id,
      name: rawRecord.name,
      icd10Code: rawRecord.icd10Code,
      enabled: rawRecord.enabled,
      rawRecord,
    };
  };

  protected $getGraphQLResponseShape = 'id name enabled icd10Code';
  protected $defaultAttributes = [
    { name: 'enabled', displayName: 'Enabled?', type: IAttributeType.Boolean },
    { name: 'name', displayName: 'Name', type: IAttributeType.Text, required: true },
    { name: 'icd10Code', displayName: 'ICD-10 Code', type: IAttributeType.Text, required: true },
  ];
}

export default Diagnosis;