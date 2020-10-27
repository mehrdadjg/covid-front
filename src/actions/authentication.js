const setAuthentication = (type, value) => {
  return { type: "SET", authType: type, authValue: value };
};

const resetAuthentication = () => {
  return { type: "RESET" };
};

export { setAuthentication, resetAuthentication };
