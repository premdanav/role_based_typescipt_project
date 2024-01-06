import { Service } from "typedi";
import { LogoutService } from "../services/user.logout";
import { Request, Response } from "express";

@Service()
export class LogoutController {
  constructor(private logoutService: LogoutService) {}

  logoutUser(req: Request, res: Response) {
    this.logoutService.logout(req, res);
  }
}
