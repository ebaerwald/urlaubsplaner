import express from "express";
import { getPlan, getPlans, addPlan, removePlan } from "../controller/plansController";

export const plansRouter = express.Router();
plansRouter.route("/plan/:plan_id").post(getPlan);
plansRouter.route("/plans/:user_id").post(getPlans);
plansRouter.route("/plan").post(addPlan);
plansRouter.route("/plan/:plan_id").delete(removePlan);
