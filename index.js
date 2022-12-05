import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
