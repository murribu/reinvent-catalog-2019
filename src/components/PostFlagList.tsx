import React from 'react';
import FlagList from './FlagList';

interface Props {
  data: any[];
  loading: boolean;
}
interface State {}

export default class PostFlagList extends React.Component<Props, State> {
  render() {
    return (
      <FlagList
        name="Post"
        data={this.props.data}
        loading={this.props.loading}
      />
    );
  }
}