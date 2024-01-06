import { Service } from "typedi";
import { TokenModel } from "../../../common/models/TokenModel";
import { Request, Response } from "express";

@Service()
export class LogoutService {
  async logout(req: Request, res: Response) {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        res.status(400).json({ error: "No token found" });
      }

      const logoutResult = await TokenModel.findOneAndUpdate(
        { token },
        { $set: { isActive: false } },
        { new: true }
      );

      if (logoutResult) {
        res.status(200).json({ message: "Logout successful." });
      } else {
        res.status(404).json({ error: "Token not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
