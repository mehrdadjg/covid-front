import { setCookie, removeCookie } from "../cookies";

const initial_business = {
  email: null,
  emailIsVerified: false,
  emailVerificationSentAt: null,
  profile: null,
};

export default function businessReducer(state = initial_business, action) {
  switch (action.type) {
    case "SET_BUSINESS":
      setCookie("business_logged_in", action.payload);
      return action.payload;

    case "SET_PROFILE":
      setCookie("business_logged_in", { ...state, profile: action.payload });
      return { ...state, profile: action.payload };

    case "VERIFY_EMAIL":
      setCookie("business_logged_in", { ...state, emailIsVerified: true });
      return { ...state, emailIsVerified: true };

    case "SETLASTVERIFICATIONEMAILSENT":
      setCookie("business_logged_in", {
        ...state,
        emailVerificationSentAt: action.payload,
      });
      return { ...state, emailVerificationSentAt: action.payload };

    case "RESET_BUSINESS":
      removeCookie("business_logged_in");
      return initial_business;

    default:
      return state;
  }
}
