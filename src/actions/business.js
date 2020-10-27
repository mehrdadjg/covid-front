const setBusiness = (business) => {
  return { type: "SET_BUSINESS", payload: business };
};

const resetBusiness = () => {
  return { type: "RESET_BUSINESS" };
};

const setProfile = (profile) => {
  return { type: "SET_PROFILE", payload: profile };
};

const verifyEmail = () => {
  return { type: "VERIFY_EMAIL" };
};

const setLastVerificationEmailTime = (time) => {
  return { type: "SETLASTVERIFICATIONEMAILSENT", payload: time };
};

export {
  setBusiness,
  resetBusiness,
  setProfile,
  verifyEmail,
  setLastVerificationEmailTime,
};
