import express from "express";
import cors from "cors";
import { config } from "./config";
import { Logger, ValidateAccessToken } from "./middleware";
import { authRouter } from "./routes/authRoutes";
import { plansRouter } from "./routes/plansRoutes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(Logger);
app.use(ValidateAccessToken);
app.set("view engine", "ejs");

app.use("/api", authRouter);
app.use("/api", plansRouter);

app.listen(config.PORT, () => {
    console.log(`Running at port ${config.PORT}`);
});