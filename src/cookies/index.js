import Cookies from "universal-cookie";

const cookies = new Cookies();

const getCookie = (name) => {
  let result = cookies.get(name);
  return result ? result : null;
};

const setCookie = (name, value, options = {}) => {
  cookies.set(name, value, { path: "/", ...options });
};

const removeCookie = (name) => {
  cookies.remove(name);
};

export { getCookie, setCookie, removeCookie };
