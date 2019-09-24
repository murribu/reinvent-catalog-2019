import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app';
import flags from './flags';

export default (history: any) => combineReducers({
  router: connectRouter(history),
  app,
  flags,
});