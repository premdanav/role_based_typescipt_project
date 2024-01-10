import { Request, Response } from "express";
import { Service } from "typedi";
import { UserModel } from "../../../common/models/UserModel";
import { GetToken } from "../../common/middleware/create-token";
import { TokenModel } from "../../../common/models/TokenModel";
import bcrypt from "bcrypt";
@Service()
export class UserRegisterService {
  constructor(private createToken: GetToken) {}

  async registerUser(req: Request, res: Response) {
    try {
      const { username, email, password, signupCode } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);

      const registerUser = await UserModel.findOne({ email });

      if (registerUser) {
        return res.status(409).json({ error: "User is already registered" });
      }

      let userObj = {
        username,
        email,
        password: hashPassword,
        role: "user", // Default role is "user" if no signup code is provided
      };

      if (signupCode !== undefined) {
        if (signupCode === "admin") {
          userObj.role = "admin";
        } else {
          return res.status(400).json({ error: "Invalid signup code" });
        }

        await TokenModel.create({
          token: this.createToken.createToken(userObj.email),
          isActive: true,
          role: userObj.role,
        });
        await UserModel.create(userObj);

        const responseData = {
          token: this.createToken.createToken(userObj.email),
          userObj,
        };
        return res
          .status(201)
          .json({ message: "User registered successfully", responseData });
      } else {
        // Handle case when no signup code is provided
        await TokenModel.create({
          token: this.createToken.createToken(userObj.email),
          isActive: true,
          role: userObj.role,
        });
        await UserModel.create(userObj);

        const responseData = {
          token: this.createToken.createToken(userObj.email),
          userObj,
        };
        return res
          .status(201)
          .json({ message: "User registered successfully", responseData });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
