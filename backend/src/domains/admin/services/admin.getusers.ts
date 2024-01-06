import { Service } from "typedi";
import { UserModel } from "../../../common/models/UserModel";
import { Request, Response } from "express";
import { AdminModel } from "../../../common/models/AdminModel";

@Service()
export class GetUsers {
  constructor() {}
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find({ role: "user" });
      const admins = await AdminModel.find({ role: "admin" });

      const allUsers = [...admins, ...users];

      if (allUsers.length === 0) {
        res.status(404).json({ error: " Not Found" });
      }

      res.status(200).json({ allUsers });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
