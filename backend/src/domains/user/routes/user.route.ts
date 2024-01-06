import { Router } from "express";
import { Service } from "typedi";
import { UserRegisterController } from "../controllers/user.register.controller";
import { UserLoginController } from "../controllers/user.login.controller";
import { UserListController } from "../controllers/user.get-users.controller";
import { VerifyToken } from "../../common/middleware/verify-token";
import { LogoutController } from "../controllers/user.logout.controller";

@Service()
export class UserRouter {
  private router: Router;

  constructor(
    private userRegisterController: UserRegisterController,
    private userLoginController: UserLoginController,
    private userListController: UserListController,
    private logoutController: LogoutController,
    private verifyToken: VerifyToken
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
      this.userRegisterController.registerUser.bind(this.userRegisterController)
    );

    this.router.post(
      "/login",
      this.userLoginController.loginUser.bind(this.userLoginController)
    );

    this.router.get(
      "/getusers",
      this.verifyToken.verifyToken.bind(this.verifyToken),
      this.userListController.getUsers.bind(this.userListController)
    );

    this.router.get(
      "/logout",
      this.verifyToken.verifyToken.bind(this.verifyToken),
      this.logoutController.logoutUser.bind(this.logoutController)
    );
  }
}
