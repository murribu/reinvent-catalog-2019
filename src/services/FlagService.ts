import { Auth, API, graphqlOperation } from 'aws-amplify';
import BaseService from './BaseService';
import { listPostFlags, listCommentFlags } from './graphql/queries';
import { updatePostFlagMutation, updateCommentFlagMutation } from './graphql/mutations';

class FlagService extends BaseService {
  async fetch() {
    const [posts, comments] = await Promise.all([
      this.fetchPostFlags(),
      this.fetchCommentFlags(),
    ]);

    return {
      posts,
      comments,
    };
  }

  async fetchPostFlags() {
    try {
      const result = await API.graphql(graphqlOperation(listPostFlags, {
        filter: {
          status: {
            eq: 'NEEDS_REVIEW',
          }
        },
        limit: 1000000,
      })) as any;

      return result.data.listPostFlags.items;
    } catch (err) {
      try {
        const partialResult = this.recoverGraphQLFailure(err);
        console.warn('FETCHED POST FLAGS WITH PARTIAL RESULTS', err);
        return partialResult.data.listPostFlags.items.filter((i: any) => i !== null);
      } catch (innerError) {
        console.error('COULD NOT FETCH POST FLAGS', err);
      }

      return [];
    }
  }

  async fetchCommentFlags() {
    try {
      const result = await API.graphql(graphqlOperation(listCommentFlags, {
        filter: {
          status: {
            eq: 'NEEDS_REVIEW',
          }
        },
        limit: 1000000,
      })) as any;

      return result.data.listCommentFlags.items;
    } catch (err) {
      try {
        const partialResult = this.recoverGraphQLFailure(err);
        console.warn('FETCHED COMMENT FLAGS WITH PARTIAL RESULTS', err);
        return partialResult.data.listCommentFlags.items.filter((i: any) => i !== null);
      } catch (innerError) {
        console.error('COULD NOT FETCH COMMENT FLAGS', err);
      }

      return [];
    }
  }

  async markFlagAsReviewed(id: string, type: string) {
    const POST_TYPE = 'Post';
    const COMMENT_TYPE = 'Comment';
    let query = '';

    switch (type) {
      case POST_TYPE:
        query = updatePostFlagMutation;
        break;
      case COMMENT_TYPE:
        query = updateCommentFlagMutation;
        break;
      default:
        throw new Error(`Cannot mark flag as reviewed: Type ${type} is not supported.`);
    }

    try {
      const reviewedByKey = `${type.toLowerCase()}FlagReviewedById`;

      return await API.graphql(graphqlOperation(query, {
        input: {
          id,
          status: 'REVIEWED',
          reviewedAt: new Date().toISOString(),
          [reviewedByKey]: (await Auth.currentAuthenticatedUser() as any).username,
        }
      }));
    } catch (err) {
      try {
        const partialResult = this.recoverGraphQLFailure(err);
        console.warn(`MARK "${type}" FLAG REVIEWED WITH PARTIAL RESULTS`, err);
        const key = `update${type}Flag`;

        const data = partialResult.data[key];

        if (!data) {
          throw new Error(err.errors);
        }

        return data;
      } catch (innerError) {
        console.error(`COULD NOT MUTATE "${type}" FLAG`, err);

        throw err;
      }
    }
  }
}

export const flagService = new FlagService();
export default FlagService;