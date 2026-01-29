import { jwtDecode } from "jwt-decode";

export const decodeUserFromToken = (token) => {
  if (!token) return null;

  const decoded = jwtDecode(token);

  return {
    id: decoded.sub,
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    roles: decoded.roles || [decoded.role], // handle both cases
  };
};

