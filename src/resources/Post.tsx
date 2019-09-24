import React from 'react';
import { Link } from 'react-router-dom';
import { makeRelatedTableLink } from '../components/RelatedTableLink';
import Resource from './Resource';
import IResource from './interfaces/IResource';
import Category from './Category';
import Diagnosis from './Diagnosis';
import { IAttribute, IAttributeType, ICollectionAttribute, ICollectionAttributeOption } from './interfaces/IAttribute';

export class Post extends Resource {
  static $name = 'Post';
  static $listGraphQLResponseShape = 'id title content hidden author { id privateProfile { firstName lastName } } category { id name } diagnosis { id name }';
  static $versioned = true;
  static categories: IResource[] = [];
  static diagnoses: IResource[] = [];

  static columns = [
    { title: 'ID', field: 'id' },
    { title: 'Title', field: 'title' },
    { title: 'Content', field: 'content' },
    { title: 'Author', field: 'postAuthorName', render: (rowData: any) => makeRelatedTableLink('users', rowData.postAuthorName, rowData.postAuthorName) },
    { title: 'Category', field: 'postCategoryName', render: (rowData: any) => makeRelatedTableLink('categories', rowData.postCategoryId, rowData.postCategoryName) },
    { title: 'Diagnosis', field: 'postDiagnosisName', render: (rowData: any) => rowData.postDiagnosisId ? makeRelatedTableLink('diagnoses', rowData.postDiagnosisId, rowData.postDiagnosisName) : '--' },
    { title: 'Hidden', field: 'hidden', type: 'boolean' },
  ];

  static rowTransformer(rawRecord: any) {
    if (!rawRecord) {
      return {};
    }

    return {
      id: rawRecord.id,
      title: rawRecord.title,
      content: rawRecord.content,
      postAuthorName: rawRecord.author.id,
      postCategoryName: rawRecord.category.name,
      postCategoryId: rawRecord.category.id,
      postDiagnosisName: rawRecord.diagnosis ? rawRecord.diagnosis.name : '--',
      postDiagnosisId: rawRecord.diagnosis ? rawRecord.diagnosis.id : null,
      hidden: rawRecord.hidden,
      rawRecord,
    };
  };

  protected $getGraphQLResponseShape = 'id title content postCategoryId postDiagnosisId hidden';
  protected $defaultAttributes = [
    { name: 'title', displayName: 'Title', type: IAttributeType.Text, required: true },
    { name: 'content', displayName: 'Content', type: IAttributeType.TextArea, required: true },
    { name: 'hidden', displayName: 'Hidden', type: IAttributeType.Boolean },
  ];

  protected async onInitialize() {
    await Promise.all([
      super.onInitialize(),
      this.fetchGroups(),
      this.fetchDiagnoses(),
    ]);
  }

  protected async fetchGroups() {
    const [data] = await Category.all(`id name`, 1000000);
    Post.categories = data;
  }

  protected async fetchDiagnoses() {
    const [data] = await Diagnosis.all(`id name`, 1000000);
    Post.diagnoses = data;
  }

  protected makeAttributes(): IAttribute[] {
    const categories = {
      name: 'postCategoryId',
      displayName: 'Category',
      type: IAttributeType.Select,
      required: true,
      options: this.makeCategoryOptions(),
    } as ICollectionAttribute;

    const diagnoses = {
      name: 'postDiagnosisId',
      displayName: 'Diagnosis',
      type: IAttributeType.Select,
      required: false,
      options: this.makeDiagnosisOptions(),
    } as ICollectionAttribute;

    return [
      ...this.$defaultAttributes,
      categories,
      diagnoses,
    ];
  }

  protected makeCategoryOptions(): ICollectionAttributeOption[] {
    return Post.categories.map((category: any) => {
      return {
        key: category.name,
        value: category.id,
      };
    }).sort((a, b) => a.key.localeCompare(b.key)) as ICollectionAttributeOption[];
  }

  protected makeDiagnosisOptions(): ICollectionAttributeOption[] {
    return Post.diagnoses.map((diagnosis: any) => {
      return {
        key: diagnosis.name,
        value: diagnosis.id,
      };
    }).sort((a, b) => a.key.localeCompare(b.key)) as ICollectionAttributeOption[];
  }

  protected onHydrateAttributes(rawRecord: any): Promise<any> {
    if (rawRecord && rawRecord.category) {
      const categoryAttr = this.attributes.find(attr => attr.name === 'postCategoryId') as ICollectionAttribute;
      categoryAttr.value = rawRecord.category.id;
    }

    if (rawRecord && rawRecord.diagnosis) {
      const diagnosisAttr = this.attributes.find(attr => attr.name === 'postDiagnosisId') as ICollectionAttribute;
      diagnosisAttr.value = rawRecord.diagnosis.id;
    }

    return Promise.resolve();
  }
}

export default Post;