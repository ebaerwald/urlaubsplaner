import { Request, Response } from "express";
import db from "../db/db";
import { plans } from "../db/schemas/plans";
import { eq } from "drizzle-orm";

export async function getPlan(req: Request, res: Response) {
  const { plan_id } = req.params;
  if (!plan_id) return res.status(400).send("Plan id is required");
  const plansObj = await db.select().from(plans).where(eq(plans.id, parseInt(plan_id))).execute();
  return res.status(200).send(plansObj[0]);
}

export async function getPlans(req: Request, res: Response) {
  const { user_id } = req.params;
  if (!user_id) return res.status(400).send("User id is required");
  const plansObj = await db.select().from(plans).where(eq(plans.user_id, parseInt(user_id))).execute();
  return res.status(200).send(plansObj);
}


export async function addPlan(req: Request, res: Response) {
  const { name, user_id, longitude, latitude } = req.body;
  if (!name || !user_id || !longitude || !latitude) return res.status(400).send("Name, user_id, longitude, latitude are required");
  const newPlan = await db.insert(plans).values({name: name, user_id: user_id, longitude: longitude, latitude: latitude}).returning().execute();
  return res.status(200).send(newPlan[0]);
}

export async function removePlan(req: Request, res: Response) {
  const { plan_id } = req.params;
  if (!plan_id) return res.status(400).send("Plan id is required");
  const result = await db.delete(plans).where(eq(plans.id, parseInt(plan_id))).execute();
  return res.status(200).send(result);
}