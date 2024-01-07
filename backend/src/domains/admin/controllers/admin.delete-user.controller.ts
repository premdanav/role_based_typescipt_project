import { Service } from "typedi";
import { DeleteUser } from "../services/admin.delete-user";
import { Request, Response } from "express";

@Service()
export class DeleteUserFromAdminController {
  constructor(private deleteUser: DeleteUser) {}

  deleteUsers(req: Request, res: Response) {
    const userId = req.params.id;
    console.log(`user id in contr ${userId}`);
    this.deleteUser.deleteUser(req, res);
  }
}
