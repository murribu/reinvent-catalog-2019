import React from 'react';
import { Link } from 'react-router-dom';
import * as constants from '../constants';

interface Props {
  to: string;
  text: string;
}

interface State { }

class RelatedTableLink extends React.Component<Props, State> {
  state: State = {};

  render() {
    const { to, text } = this.props;

    return (
      <Link to={to} style={{ color: constants.PRIMARY_COLOR }}>{text}</Link>
    );
  }
}

export default RelatedTableLink;

export const makeRelatedTableLink = (resource: string, id: string, text: string) => {
  return (
    <RelatedTableLink
      to={`/${resource}${id ? `/${id}` : ''}`}
      text={text}
    />
  );
}