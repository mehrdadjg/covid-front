const setBusiness = (business) => {
  return { type: "SET_BUSINESS", payload: business };
};

const resetBusiness = () => {
  return { type: "RESET_BUSINESS" };
};

/**
 * Updates the given field of the profile to its new value.
 * @param {string}          field
 * @param {string | number} value
 */
const setProfile = (field, value) => {
  return { type: "SET_PROFILE", field: field, value: value };
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
