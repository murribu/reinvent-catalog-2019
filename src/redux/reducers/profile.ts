import { FETCH_MY_PROFILE, RECEIVE_MY_PROFILE } from "../actions";

const initialState = {
  sub: "",
  email: "",
  firstName: "",
  lastName: "",
  organizationName: "",
  organizationId: null,
  fetching: true,
  admin: false
};

interface UserRow {
  PK?: String;
  SK?: String;
  admin?: Boolean;
  organizationName?: String;
  organizationId?: String;
  firstName?: String;
  lastName?: String;
}
function profile(state = initialState, action: any) {
  let user: UserRow = {};
  let organization: UserRow = {};
  const { profile } = action;

  if (profile) {
    user = profile.find((row: UserRow) => row.SK === "user");
    organization = profile.find((row: UserRow) => row.SK === "organization");
  }
  switch (action.type) {
    case FETCH_MY_PROFILE:
      return Object.assign({}, state, {
        fetching: true
      });
    case RECEIVE_MY_PROFILE:
      console.log(action);
      return Object.assign({}, state, {
        sub: user.PK ? user.PK.substring(4) : "",
        firstName: user.firstName,
        lastName: user.lastName,
        admin: organization.admin,
        organizationName: organization.organizationName,
        organizationId: organization.organizationId,
        fetching: false
      });
    default:
      return state;
  }
}

export default profile;
