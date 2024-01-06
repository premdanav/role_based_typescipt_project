import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { AdminRegisterService } from "../services/admin.register";

@Service()
export class AdminRegisterController {
  constructor(@Inject() private adminSerice: AdminRegisterService) {}

  registerAdmin(req: Request, res: Response) {
    this.adminSerice.registerAdmin(req, res);
  }
}
