import { Request, Response } from "express";
import { Service } from "typedi";
import { UserModel } from "../../../common/models/UserModel";

@Service()
export class DeleteUser {
  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      console.log(`id is ${id}`);
      if (!id) {
        res.status(400).json({ error: "Id not found" });
      }
      const deletedUser = await UserModel.findByIdAndDelete(id);
      console.log(`deleted user is ${deletedUser}`);

      if (!deletedUser) {
        res.status(400).json({ error: "User Not Found" });
      }
      res
        .status(200)
        .json({ message: "user deleted successfullt", deletedUser });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
