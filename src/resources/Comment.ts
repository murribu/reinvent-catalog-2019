import { makeRelatedTableLink } from '../components/RelatedTableLink';
import Resource from './Resource';
import { IAttribute, IAttributeType } from './interfaces/IAttribute';

export class Comment extends Resource {
  static $name = 'Comment';
  static $listGraphQLResponseShape = 'id content hidden author { id } post { id title }';
  static $versioned = true;

  static columns = [
    { title: 'ID', field: 'id' },
    { title: 'Content', field: 'content' },
    { title: 'Author', field: 'commentAuthorName', render: (rowData: any) => makeRelatedTableLink('users', rowData.commentAuthorName, rowData.commentAuthorName) },
    { title: 'Post', field: 'commentPostTitle', render: (rowData: any) => makeRelatedTableLink('posts', rowData.commentPostId, rowData.commentPostTitle) },
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
      commentAuthorName: rawRecord.author.id,
      commentPostTitle: rawRecord.post.title,
      commentPostId: rawRecord.post.id,
      hidden: rawRecord.hidden,
      rawRecord,
    };
  };

  protected $getGraphQLResponseShape = 'id content hidden';
  protected $defaultAttributes = [
    { name: 'content', displayName: 'Content', type: IAttributeType.TextArea, required: true },
    { name: 'hidden', displayName: 'Hidden', type: IAttributeType.Boolean },
  ];

  protected onHydrateAttributes(rawRecord: any): Promise<any> {
    if (rawRecord && rawRecord.post) {
      const postAttr = this.attributes.find(attr => attr.name === 'commentPostId') as IAttribute;
      postAttr.value = rawRecord.post.id;
    }

    return Promise.resolve();
  }
}

export default Comment;