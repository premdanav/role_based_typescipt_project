import { Router } from "express";
import { Service } from "typedi";
import { UserLoginController } from "../controllers/user.login.controller";

@Service()
export class LoginRouter {
  private router: Router;

  constructor(private userLoginController: UserLoginController) {
    this.router = Router();
    this.addRoutes();
  }

  getRoutes() {
    return this.router;
  }

  private addRoutes() {
    this.router.post(
      "/login",
      this.userLoginController.loginUser.bind(this.userLoginController)
    );
  }
}
