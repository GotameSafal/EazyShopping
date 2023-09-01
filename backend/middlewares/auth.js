import { ErrorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.Ecommerce;
  if (!token)
    return next(new ErrorHandler("please login to access this resources", 401));

  const decryptdata = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(decryptdata.id);
  next();
};

export const authenticateRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new ErrorHandler("You are not authorized to access this resource", 401)
      );
    next();
  };
