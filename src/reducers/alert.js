const initial_alert = {
  visible: false,
  message: null,
  mode: null,
};

export default function alertReducer(state = initial_alert, action) {
  switch (action.type) {
    case "SHOW":
      return { visible: true, message: action.message, mode: action.mode };

    case "HIDE":
      return initial_alert;

    default:
      return state;
  }
}
