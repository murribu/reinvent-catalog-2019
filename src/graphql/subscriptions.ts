// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateMessage = `subscription OnCreateMessage($messageConversationId: ID!) {
  onCreateMessage(messageConversationId: $messageConversationId) {
    id
    owner
    conversation {
      id
      owner
      participants
      messages {
        nextToken
      }
      meta
      createdAt
      updatedAt
      version
    }
    participants
    type
    textContent
    media {
      bucket
      region
      key
      identityId
    }
    meta
    messageConversationId
    createdAt
    updatedAt
    version
  }
}
`;
