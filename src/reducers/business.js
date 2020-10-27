const initial_business = {
  email: null,
  emailIsVerified: false,
  emailVerificationSentAt: null,
  profile: null,
};

export default function businessReducer(state = initial_business, action) {
  switch (action.type) {
    case "SET_BUSINESS":
      return action.payload;

    case "SET_PROFILE":
      return { ...state, profile: action.payload };

    case "VERIFY_EMAIL":
      return { ...state, emailIsVerified: true };

    case "SETLASTVERIFICATIONEMAILSENT":
      return { ...state, emailVerificationSentAt: action.payload };

    case "RESET_BUSINESS":
      return initial_business;

    default:
      return state;
  }
}
