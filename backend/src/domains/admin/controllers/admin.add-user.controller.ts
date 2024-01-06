import { Service } from "typedi";
import { AddUserFromAdmin } from "../services/admin.add-user";
import { Request, Response } from "express";

@Service()
export class AddUserFromAdminController {
  constructor(private addUserFromAdmin: AddUserFromAdmin) {}

  addUser(req: Request, res: Response) {
    this.addUserFromAdmin.addUser(req, res);
  }
}
