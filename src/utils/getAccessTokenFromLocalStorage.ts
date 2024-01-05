export const getAccessTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("accessToken");
};
