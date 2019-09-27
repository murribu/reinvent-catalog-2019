import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import app from "./app";
import flags from "./flags";
import profile from "./profile";

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    app,
    flags,
    profile
  });
