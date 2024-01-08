import "reflect-metadata";
import Container, { Service } from "typedi";
import express, { Request, Response, Application } from "express";
import { Database } from "./common/db/db.config";
import { AdminRouter } from "./domains/admin/routes/admin.route";
import { UserRouter } from "./domains/user/routes/user.route";
import { LoginRouter } from "./domains/auth/routes/user.route";
import cors from "cors";
@Service()
export class Main {
  app: Application = express();
  port = process.env.PORT || 8000;
  db = Container.get(Database);

  constructor(
    private adminRouter: AdminRouter,
    private userRouter: UserRouter,
    private loginRouter: LoginRouter
  ) {
    this.bodyParserFunc();
    this.addAllRoutes();
  }

  bodyParserFunc() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  startServer() {
    this.db.getConnection();
    this.app.listen(this.port, () => {
      console.log(`Server started at PORT ${this.port}`);
    });
  }

  private addAllRoutes() {
    this.app.use("/admin", this.adminRouter.getRoutes());
    this.app.use("/user", this.userRouter.getRoutes());
    this.app.use("/auth", this.loginRouter.getRoutes());
  }
}

Container.get(Main).startServer();
