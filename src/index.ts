import express, { Request, Response } from "express";
import cors from "cors";
import { Config } from "./config/config";
import { notionRouter } from "./notion/notion-router";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = Number.parseInt(Config.getProperty(Config.PORT));

app.get("/api/hello", (req: Request, res: Response) => {
  res.send("Hello lady <3!");
});

app.use("/notion", notionRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
