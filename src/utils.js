export const isUserAuthenticated = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return isAuthenticated;
};
