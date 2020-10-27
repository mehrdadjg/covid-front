const showAlert = (message, mode) => {
  return { type: "SHOW", message: message, mode: mode };
};

const hideAlert = () => {
  return { type: "HIDE" };
};

export { showAlert, hideAlert };
