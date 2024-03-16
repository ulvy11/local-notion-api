import express from "express";
import { NotionBackend } from "./notion-backend";

export const notionRouter = express.Router();
notionRouter.post("/addApartment", NotionBackend.addApartment);
