import { Request, Response } from "express";
import { Service } from "typedi";
import bcrypt from "bcrypt";
import { UserModel } from "../../../common/models/UserModel";
import { GetToken } from "../../common/middleware/create-token";
import { TokenModel } from "../../../common/models/TokenModel";

@Service()
export class UserRegisterService {
  constructor(private createToken: GetToken) {}

  async registerUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

      const userObj = {
        username,
        email,
        password: hashPassword,
        role: "user",
      };

      const registerUser = await UserModel.findOne({ email });

      if (registerUser) {
        return res.status(409).json({ error: "User is already registered" });
      }
      const token = this.createToken.createToken(userObj.email);
      console.log(`token is ${token}`);

      await TokenModel.create({ token, isActive: true, role: userObj.role });
      await UserModel.create(userObj);

      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
