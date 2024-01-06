import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { UserLoginService } from "../services/user.login";

@Service()
export class UserLoginController {
  constructor(@Inject() private userLoginSerice: UserLoginService) {}

  loginUser(req: Request, res: Response) {
    this.userLoginSerice.loginUser(req, res);
  }
}
