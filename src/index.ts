import express from "express";
import { routerUser } from "./routes/user";
import { routerAuth } from "./routes/auth";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(routerAuth);
app.use(routerUser);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
