import { Service } from "typedi";
import { UserModel } from "../../../common/models/UserModel";
import { Request, Response } from "express";

@Service()
export class GetUsers {
  constructor() {}
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find({ role: "user" });
      if (users.length === 0) {
        res.status(404).json({ error: "Users Not Found" });
      }
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
