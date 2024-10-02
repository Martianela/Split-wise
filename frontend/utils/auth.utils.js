import Cookies from 'js-cookie';

export const isLoggedIn = () => {
  const token = Cookies.get('splitWise-login-token');
  return token !== undefined;
};
