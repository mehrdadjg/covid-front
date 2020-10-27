const signIn = () => {
  return { type: "SIGNIN" };
};

const signOut = () => {
  return { type: "SIGNOUT" };
};

export { signIn, signOut };
