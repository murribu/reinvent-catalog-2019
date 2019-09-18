// https://markpollmann.com/testing-react-applications/#mocking-modules-with-jestmock
export const Auth = {
  currentSession: jest.fn(() => Promise.resolve()),
  signUp: jest.fn(({ username, password }) => {
    if (username === "alreadysignedup@example.com") {
      return Promise.reject({
        message: "An account with the given email already exists"
      });
    } else {
      return Promise.resolve({ data: "new user" });
    }
  }),
  signIn: jest.fn((email, password) => {
    if (email === "username@example.com" && password === "password") {
      global.signedIn = true;
      return Promise.resolve();
    } else if (password === "badpassword") {
      throw new Error("rejected");
      return Promise.reject();
    } else if (email === "notconfirmed@example.com") {
      return Promise.reject({
        __type: "UserNotConfirmedException",
        message: "User is not confirmed."
      });
    }
  }),
  signOut: jest.fn(() => {
    if (global.signedIn) {
      return Promise.resolve({ data: "signed out" });
    } else {
      return Promise.reject({ error: "you were already signed out" });
    }
  }),
  currentAuthenticatedUser: jest.fn(() => {
    if (global.signedIn) {
      return Promise.resolve({
        attributes: { sub: "ABCD-1234", email: "tziegler@whitehouse.gov" }
      });
    } else {
      return Promise.reject("not authenticated");
    }
  }),
  confirmSignUp: jest.fn((email, confirmationCode) => {
    if (email === "bad@email.com") {
      return Promise.reject({ code: "UsernameExistsException" });
    } else {
      return Promise.resolve();
    }
  }),
  forgotPassword: jest.fn(email => {
    if (email === "username@example.com") {
      return Promise.resolve();
    } else if (email === "ddos@example.com") {
      return Promise.reject({
        code: "LimitExceededException",
        message: "Attempt limit exceeded, please try after some time."
      });
    } else {
      return Promise.reject({
        code: "UserNotFoundException",
        message: "Username/client id combination not found."
      });
    }
  }),
  forgotPasswordSubmit: jest.fn((email, code, new_password) => {
    if (email === "username@example.com" && code === "123456") {
      return Promise.resolve();
    } else {
      return Promise.reject({
        code: "CodeMismatchException",
        message: "Invalid verification code provided, please try again."
      });
    }
  })
};

const Amplify = {
  Auth,
  configure: jest.fn()
};

export const graphqlOperation = jest.fn((query, params) => {
  return { query, params };
});

export default Amplify;
