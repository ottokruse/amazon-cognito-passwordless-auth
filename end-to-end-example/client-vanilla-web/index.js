import { Passwordless } from "https://www.unpkg.com/amazon-cognito-passwordless-auth/dist/client/index.js";
import {
  requestSignInLink,
  signInWithLink,
} from "https://www.unpkg.com/amazon-cognito-passwordless-auth/dist/client/magic-link.js";
import { retrieveTokens } from "https://www.unpkg.com/amazon-cognito-passwordless-auth/dist/client/storage.js";
import { defaultTokensCb } from "https://www.unpkg.com/amazon-cognito-passwordless-auth/dist/client/common.js";

window.requestSignInLink = requestSignInLink;
window.signInState = "IDLE";

Passwordless.configure({
  cognitoIdpEndpoint: "eu-west-1",
  clientId: "23pm9n9ffsb6faj8b0h8t4d03o",
  fido2: {
    baseUrl: "https://07zmwk8sj2.execute-api.eu-west-1.amazonaws.com/",
  },
  debug: console.debug,
});

signInWithLink({
  statusCb: (state) => (window.signInState = state),
  tokensCb: tokens => defaultTokensCb(tokens)
});

const tokens = await retrieveTokens();
window.tokens = tokens.expireAt > new Date() ? tokens : undefined;
