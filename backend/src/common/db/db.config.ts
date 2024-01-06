import mongoose from "mongoose";
import dotenv from "dotenv";
import { Service } from "typedi";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "";

@Service()
export class Database {
  constructor() {}

  private async connectDb() {
    try {
      await mongoose.connect(MONGO_URI).then(() => {
        console.log("database connected sucessfully");
      });
    } catch (err) {
      console.log(`Error while connecting to database ${err}`);
      process.exit(1);
    }
  }

  getConnection() {
    this.connectDb();
  }
}
