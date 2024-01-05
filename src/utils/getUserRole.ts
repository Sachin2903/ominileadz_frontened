import jwt_decode from "jwt-decode";

import { getAccessTokenFromLocalStorage } from "./getAccessTokenFromLocalStorage";
import { IUserObject } from "../@types";

export const getUserRole = (): string | null => {
  const accessToken = getAccessTokenFromLocalStorage();

  if (accessToken) {
    try {
      const decodedToken: { role: string } = jwt_decode(accessToken);

      return decodedToken.role;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }

  return null;
};
export const getUser = () => {
  const accessToken = getAccessTokenFromLocalStorage();

  if (accessToken) {
    try {
      const decodedToken: IUserObject = jwt_decode(accessToken);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }

  return null;
};
