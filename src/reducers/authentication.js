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
      return { type: action.authType, value: action.authValue };

    case "RESET":
      return initial_authentication;

    default:
      return state;
  }
}
