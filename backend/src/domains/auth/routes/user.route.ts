import { Router } from "express";
import { Service } from "typedi";
import { UserLoginController } from "../controllers/user.login.controller";
import { UserRegisterController } from "../controllers/user.register.controller";
@Service()
export class LoginRouter {
  private router: Router;

  constructor(
    private userLoginController: UserLoginController,
    private userRegisterController: UserRegisterController
  ) {
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

    this.router.post(
      "/register",
      this.userRegisterController.registerUser.bind(this.userRegisterController)
    );
  }
}
