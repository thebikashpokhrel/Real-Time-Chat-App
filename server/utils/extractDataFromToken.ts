import jwt, { JwtPayload } from "jsonwebtoken";

type jwtData = {
  userId: string;
};

export function extracDataFromToken(token: string) {
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwtData;
    return verified;
  } catch (error) {
    console.log(error);
  }
}
