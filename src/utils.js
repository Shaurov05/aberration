export const getAccessToken = () => localStorage.getItem("accessToken");

export const isUserAuthenticated = () => {
  const isAuthenticated = !!getAccessToken();

  return isAuthenticated;
};
