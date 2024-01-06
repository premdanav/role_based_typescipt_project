import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { GetUsers } from "../services/user.get-users";

@Service()
export class UserListController {
  constructor(@Inject() private users: GetUsers) {}

  getUsers(req: Request, res: Response) {
    this.users.getUsers(req, res);
  }
}
