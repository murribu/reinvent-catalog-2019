import React from "react";
import { BrowserRouter } from "react-router-dom";

export class App extends React.Component {
  render() {
    return <div className="App">App!</div>;
  }
}

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default () => <AppWithRouter />;
