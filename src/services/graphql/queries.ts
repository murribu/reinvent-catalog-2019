export const listPostFlags = `query ListPostFlags(
  $filter: ModelPostFlagFilterInput
  $limit: Int
  $nextToken: String
) {
  listPostFlags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        owner
      }
      post {
        id
        title
        author {
          id
        }
      }
      status
      reviewedAt
      reviewedBy {
        id
        owner
      }
    }
  }
}
`;

export const listCommentFlags = `query ListCommentFlags(
  $filter: ModelCommentFlagFilterInput
  $limit: Int
  $nextToken: String
) {
  listCommentFlags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        owner
      }
      comment {
        id
        content
        author {
          id
        }
      }
      status
      reviewedAt
      reviewedBy {
        id
        owner
      }
    }
  }
}
`;

export const fetchMyProfile = `query FetchMyProfile {
  fetchMyProfile {
    PK,
    SK
    firstName,
    lastName,
    organizationName,
    organizationId,
    admin
  }
}`;
