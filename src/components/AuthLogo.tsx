import React from 'react';

interface Props {}
interface State {}

export default class AuthLogo extends React.Component<Props, State> {
  render() {
    return (
      <div style={{textAlign: 'center' as 'center', marginTop: '50px'}}>
        <img src="/images/logo.png" alt="Cooperative Health" />
      </div>
    );
  }
}