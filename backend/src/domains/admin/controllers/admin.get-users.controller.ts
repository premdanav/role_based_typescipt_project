import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { GetUsers } from "../services/admin.getusers";

@Service()
export class UserListControllerForAdmin {
  constructor(@Inject() private users: GetUsers) {}

  getUsers(req: Request, res: Response) {
    this.users.getUsers(req, res);
  }
}
