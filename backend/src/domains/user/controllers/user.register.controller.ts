import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { UserRegisterService } from "../services/user.register";

@Service()
export class UserRegisterController {
  constructor(@Inject() private userSerice: UserRegisterService) {}

  registerUser(req: Request, res: Response) {
    this.userSerice.registerUser(req, res);
  }
}
