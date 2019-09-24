import React from 'react';
import { Route, Switch } from 'react-router';
import User from '../resources/User';
import Partner from '../resources/Partner';
import Category from '../resources/Category';
import Diagnosis from '../resources/Diagnosis';
import Post from '../resources/Post';
import Comment from '../resources/Comment';
import ResourceList from '../components/ResourceList';
import Flags from '../components/Flags';

const Home = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '35vh' }}>
    <img src="/images/icon.png" width="100" />
  </div>
);
const NoMatch = () => <h1>404 Yo</h1>;

// Resources
const Users = () => <ResourceList resource={new User()} />;
const Partners = () => <ResourceList resource={new Partner()} />;
const Categories = () => <ResourceList resource={new Category()} />;
const Posts = () => <ResourceList resource={new Post()} />;
const Comments = () => <ResourceList resource={new Comment()} />;
const Diagnoses = () => <ResourceList resource={new Diagnosis()} />;

const makeRoutes = () => {
  return (props: any) => {
    return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/partners" component={Partners} />
          <Route path="/categories" component={Categories} />
          <Route path="/posts" component={Posts} />
          <Route path="/comments" component={Comments} />
          <Route path="/diagnoses" component={Diagnoses} />
          <Route path="/flags" component={Flags} />
          <Route component={NoMatch} />
        </Switch>
    );
  }
};

export default makeRoutes;