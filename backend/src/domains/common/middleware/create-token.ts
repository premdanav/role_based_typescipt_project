import { Service } from "typedi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
@Service()
export class GetToken {
  secretKey: string = process.env.SECRET_KEY || "secret";

  constructor() {}

  createToken(email: any) {
    const token = jwt.sign({ email: email }, this.secretKey, {
      expiresIn: "1h",
    });
    return token;
  }
}
