import {
  FETCH_FLAGS,
  RECEIVE_FLAGS,
  BEGIN_FLAG_UPDATE,
  END_FLAG_UPDATE,
  SET_FLAG_ERROR,
} from '../actions';

const initialState = {
  fetching: true,
  flagError: null,
  markingAsReviewed: false,
  posts: {
    data: null,
    count: 0,
  },
  comments: {
    data: null,
    count: 0,
  },
};

function flags(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_FLAGS:
      return Object.assign({}, state, {
        fetching: true,
      });
    case RECEIVE_FLAGS:
      const { posts, comments } = action;

      return Object.assign({}, state, {
        fetching: false,
        posts: {
          data: posts,
          count: posts.length,
        },
        comments: {
          data: comments,
          count: comments.length,
        },
      });
    case BEGIN_FLAG_UPDATE:
      return Object.assign({}, state, {
        markingAsReviewed: true,
      });
    case END_FLAG_UPDATE:
      return Object.assign({}, state, {
        markingAsReviewed: false,
      });
    case SET_FLAG_ERROR:
      return Object.assign({}, state, {
        flagError: action.message,
      });
    default:
      return state;
  }
}

export default flags;