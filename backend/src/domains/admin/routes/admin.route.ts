import { Router } from "express";
import { Service } from "typedi";
import { AdminRegisterController } from "../controllers/admin.register.controller";
import { AdminLoginController } from "../controllers/admin.login.controller";

@Service()
export class AdminRouter {
  private router: Router;

  constructor(
    private adminRegisterController: AdminRegisterController,
    private adminLoginController: AdminLoginController
  ) {
    this.router = Router();
    this.addRoutes();
  }

  getRoutes() {
    return this.router;
  }

  private addRoutes() {
    this.router.post(
      "/register",
      this.adminRegisterController.registerAdmin.bind(
        this.adminRegisterController
      )
    );

    this.router.post(
      "/login",
      this.adminLoginController.loginAdmin.bind(this.adminLoginController)
    );
  }
}
