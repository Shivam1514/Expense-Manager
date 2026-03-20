import jwt from "jsonwebtoken";
import path from "path";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt_token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000 , //milliesecond;
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return token;
};
