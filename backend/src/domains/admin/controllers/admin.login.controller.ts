import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { AdminLoginService } from "../services/admin.login";

@Service()
export class AdminLoginController {
  constructor(@Inject() private adminLoginSerice: AdminLoginService) {}

  loginAdmin(req: Request, res: Response) {
    this.adminLoginSerice.loginAdmin(req, res);
  }
}
