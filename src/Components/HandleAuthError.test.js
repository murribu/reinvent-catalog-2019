import React from "react";
import HandleAuthError from "./HandleAuthError";

describe("HandleAuthError", () => {
  it("should handle UserNotFoundException", () => {
    expect(HandleAuthError({ code: "UserNotFoundException" })).toEqual(
      "That user does not exist"
    );
  });
  it("should handle UsernameExistsException", () => {
    expect(HandleAuthError({ code: "UsernameExistsException" })).toEqual(
      "An account with the given email already exists"
    );
  });
  it("should handle PasswordTooShortException", () => {
    expect(
      HandleAuthError({
        code: "PasswordTooShortException",
        message:
          "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 8"
      })
    ).toEqual("Your password must have at least 8 characters");
  });
  it("should handle UserNotConfirmedException", () => {
    expect(
      HandleAuthError({
        code: "UserNotConfirmedException",
        message: "User is not confirmed"
      })
    ).toEqual("User is not confirmed. Please look for your confirmation email");
  });
  it("should handle NotAuthorizedException", () => {
    expect(
      HandleAuthError({
        code: "NotAuthorizedException",
        message: "Incorrect username or password."
      })
    ).toEqual("Incorrect username or password.");
  });
  it("should handle OtherException", () => {
    const message = "POTUS bicycle accident";
    expect(
      HandleAuthError({
        code: "OtherException",
        message
      })
    ).toEqual(message);
  });
});
