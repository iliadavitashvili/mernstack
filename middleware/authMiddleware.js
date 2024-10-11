import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    throw new UnauthenticatedError("autentication invalid");
  }
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "67029cff29c24709c04e8e3c";
    req.user = { userId, role, testUser };
    // console.log(user);
    next();
  } catch (error) {
    // console.log("aba raa");
    throw new UnauthenticatedError("autentication invalid");
  }
};
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    console.log(req, "req user is here authmiddleware");
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("unauthorized to access roles");
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo user Read only.");
  next();
};
