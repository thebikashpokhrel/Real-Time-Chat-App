// to make the file a module and avoid the TypeScript error
import { User } from "../../server/models/user.model";
export {};

declare module "express-serve-static-core" {
  namespace Express {
    export interface Request {
      loggedInUser: User;
    }
  }
}
