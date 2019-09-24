import React from 'react';
import { API, graphqlOperation } from "aws-amplify";

interface Props {}
interface State {
  pendingMessage: string | undefined;
}

const sub = `subscription OnCreateMessage($messageConversationId: ID!) {
  onCreateMessage(messageConversationId: $messageConversationId) {
    id
    owner
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

const mutation = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    owner
    conversation {
      id
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

class Messages extends React.Component<Props, State> {
  subscription?: any;

  state: State = {
    pendingMessage: 'This is a test',
  }

  componentDidMount() {
    const messageConversationId = '978b26ee-8243-44e6-8e00-204e1e9b30ab';

    this.subscription = (API.graphql(graphqlOperation(sub, { messageConversationId })) as any).subscribe({
      next: (data: any) => {
        console.log('GOT NEW SUB DATA', data);
      },
      error: (error: any) => {
        console.error('SUB ERROR', error);
      },

    });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    return (
      <div>
        <div>Messages</div>
        <textarea
          value={this.state.pendingMessage}
          onChange={(e) => this.onMessageChanged(e.target.value)}
          style={{
            width: '500px',
            height: '250px'
          }}
        />
        <div><button onClick={() => this.sendMessage()}>Send</button></div>
      </div>
    );
  }

  onMessageChanged(message: any) {
    this.setState({
      pendingMessage: message,
    });
  }

  async sendMessage() {
    const { pendingMessage } = this.state;

    if (pendingMessage && pendingMessage !== '') {
      console.log('will send message', pendingMessage);

      await API.graphql(graphqlOperation(mutation, {
        input: {
          messageConversationId: '978b26ee-8243-44e6-8e00-204e1e9b30ab',
          type: 'TEXT',
          textContent: pendingMessage,
          participants: ['admin', 'provider'],
        }
      }));

      this.setState({
        pendingMessage: '',
      });
    }
  }
}

export default Messages;