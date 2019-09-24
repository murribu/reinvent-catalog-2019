export const updatePostFlagMutation = `mutation UpdatePostFlag($input: UpdatePostFlagInput!) {
  updatePostFlag(input: $input) {
    id
  }
}`;

export const updateCommentFlagMutation = `mutation UpdateCommentFlag($input: UpdateCommentFlagInput!) {
  updateCommentFlag(input: $input) {
    id
  }
}`;