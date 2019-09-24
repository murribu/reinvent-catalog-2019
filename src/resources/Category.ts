import Resource from './Resource';
import IResource from './interfaces/IResource';
import { IAttribute, IAttributeType, ICollectionAttribute, ICollectionAttributeOption } from './interfaces/IAttribute';
import { makeRelatedTableLink } from '../components/RelatedTableLink';

export class Category extends Resource {
  static $name = 'Category';
  static $listGraphQLResponseShape = 'id name parent { id name }';
  static categories: IResource[] = [];

  static columns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Parent Category', field: 'categoryParentName', render: (rowData: any) => rowData.categoryParentId ? makeRelatedTableLink('categories', rowData.categoryParentId, rowData.categoryParentName) : '--' },
  ];

  static rowTransformer(rawRecord: any) {
    if (!rawRecord) {
      return {};
    }

    return {
      id: rawRecord.id,
      name: rawRecord.name,
      categoryParentName: rawRecord.parent ? rawRecord.parent.name : '--',
      categoryParentId: rawRecord.parent ? rawRecord.parent.id : null,
      rawRecord,
    };
  };

  protected $getGraphQLResponseShape = 'id name parent { name id }';
  protected $defaultAttributes = [
    { name: 'name', displayName: 'Name', type: IAttributeType.Text, required: true },
  ];

  protected async onInitialize() {
    await Promise.all([
      super.onInitialize(),
      this.fetchCategories(),
    ]);
  }

  protected async fetchCategories() {
    const [data] = await Category.all(`id name`, 1000000);
    Category.categories = data;
  }

  protected makeAttributes(): IAttribute[] {
    const parentCategories = {
      name: 'categoryParentId',
      displayName: 'Parent Category',
      type: IAttributeType.Select,
      required: false,
      options: this.makeParentCategoryOptions(),
    } as ICollectionAttribute;

    return [
      ...this.$defaultAttributes,
      parentCategories,
    ];
  }

  protected makeParentCategoryOptions(): ICollectionAttributeOption[] {
    return Category.categories.map((category: any) => {
      return {
        key: category.name,
        value: category.id,
      };
    }).sort((a, b) => a.key.localeCompare(b.key)) as ICollectionAttributeOption[];
  }

  protected onHydrateAttributes(rawRecord: any): Promise<any> {
    if (rawRecord && rawRecord.parent) {
      const parentCategoryAttr = this.attributes.find(attr => attr.name === 'categoryParentId') as ICollectionAttribute;
      parentCategoryAttr.value = rawRecord.parent.id;
    }

    return Promise.resolve();
  }
}

export default Category;