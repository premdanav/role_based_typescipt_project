import { Request, Response } from "express";
import { Service } from "typedi";
import { AdminModel } from "../../../common/models/AdminModel";
import bcrypt from "bcrypt";

@Service()
export class AdminRegisterService {
  constructor() {}

  async registerAdmin(req: Request, res: Response) {
    try {
      const { username, email, password, signupCode } = req.body;

      if (signupCode === "admin") {
        const hashPassword = await bcrypt.hash(password, 10);

        const adminObj = {
          username,
          email,
          password: hashPassword,
          role: "admin",
        };

        const registerAdmin = await AdminModel.findOne({ email });

        if (registerAdmin) {
          return res.status(409).json({ error: "Admin is already registered" });
        }

        await AdminModel.create(adminObj);

        res.status(200).json({ message: "Admin registered successfully" });
      } else {
        res.status(400).json({ error: "Invalid signup code" });
      }
    } catch (error) {
      console.error("Error registering admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
