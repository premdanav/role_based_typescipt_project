import { Router } from "express";
import { Service } from "typedi";
import { UserListControllerForAdmin } from "../controllers/admin.get-users.controller";
import { VerifyToken } from "../../common/middleware/verify-token";
import { AddUserFromAdminController } from "../controllers/admin.add-user.controller";
import { LogoutController } from "../controllers/admin.logout.controller";
import { DeleteUserFromAdminController } from "../controllers/admin.delete-user.controller";
@Service()
export class AdminRouter {
  private router: Router;

  constructor(
    private userListControllerForAdmin: UserListControllerForAdmin,
    private addUserFromAdminController: AddUserFromAdminController,
    private logoutController: LogoutController,
    private deleteUserFromAdminController: DeleteUserFromAdminController,
    private verifyToken: VerifyToken
  ) {
    this.router = Router();
    this.addRoutes();
  }

  getRoutes() {
    return this.router;
  }

  private addRoutes() {
    this.router.get(
      "/getusers",
      this.verifyToken.verifyToken.bind(this.verifyToken),
      this.userListControllerForAdmin.getUsers.bind(
        this.userListControllerForAdmin
      )
    );

    this.router.post(
      "/adduser",
      this.verifyToken.verifyToken.bind(this.verifyToken),
      this.addUserFromAdminController.addUser.bind(
        this.addUserFromAdminController
      )
    );

    this.router.get(
      "/logout",
      this.verifyToken.verifyToken.bind(this.verifyToken),
      this.logoutController.logoutUser.bind(this.logoutController)
    );

    this.router.delete(
      "/deleteuser/:id",
      this.verifyToken.verifyToken.bind(this.verifyToken),
      this.deleteUserFromAdminController.deleteUsers.bind(
        this.deleteUserFromAdminController
      )
    );
  }
}
