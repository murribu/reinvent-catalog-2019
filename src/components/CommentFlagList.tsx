import React from 'react';
import FlagList from './FlagList';

interface Props {
  data: any[];
  loading: boolean;
}
interface State {}

export default class CommentFlagList extends React.Component<Props, State> {
  render() {
    return (
      <FlagList
        name="Comment"
        data={this.props.data}
        loading={this.props.loading}
      />
    );
  }
}