import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Service } from "typedi";
import { TokenModel } from "../../../common/models/TokenModel";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

@Service()
export class VerifyToken {
  secretKey: string = process.env.SECRET_KEY || "secret";

  verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    jwt.verify(token, this.secretKey, async (err) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token." });
      }

      const isActive = await TokenModel.findOne({ token, isActive: true });

      if (!isActive) {
        return res.status(401).json({ error: "Token is no longer active." });
      }

      next();
    });
  }
}
