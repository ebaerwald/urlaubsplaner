import express from "express";
import { getTokens, refreshToken } from "../controller/authController";

export const authRouter = express.Router();
authRouter.route("/tokens").post(getTokens);
authRouter.route("/refreshToken/:refresh_token").get(refreshToken);

