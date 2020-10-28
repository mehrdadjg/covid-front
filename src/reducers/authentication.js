import { setCookie, removeCookie } from "../cookies";

const initial_authentication = {
  type: null,
  value: null,
};

export default function authenticationReducer(
  state = initial_authentication,
  action
) {
  switch (action.type) {
    case "SET":
      setCookie("auth", { type: action.authType, value: action.authValue });
      return { type: action.authType, value: action.authValue };

    case "RESET":
      removeCookie("auth");
      return initial_authentication;

    default:
      return state;
  }
}
