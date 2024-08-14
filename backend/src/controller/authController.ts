import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import db from '../db/db';
import { users } from '../db/schemas/users';
import { eq } from 'drizzle-orm';

export async function getTokens(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Username and password are required");
  const user = await db.select().from(users).where(eq(users.name, username)).execute();
  if (user.length === 1) {
    const accessToken = jwt.sign({ user_id: user[0].id }, config.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });
    const refreshToken = jwt.sign({ user_id: user[0].id }, config.REFRESH_TOKEN_SECRET);
    return res.status(200).send({ accessToken, refreshToken, user_id: user[0].id});
  }
  const newUser = await db.insert(users).values({name: username, password: password}).returning().execute();
  const accessToken = jwt.sign({ user_id: newUser[0].id }, config.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });
  const refreshToken = jwt.sign({ user_id: newUser[0].id }, config.REFRESH_TOKEN_SECRET);
  return res.status(200).send({ accessToken, refreshToken, user_id: newUser[0].id});
}

export function refreshToken(req: Request, res: Response) {
  const { refresh_token } = req.params;
  if (!refresh_token) res.status(400).send("Refresh token is required");
  jwt.verify(refresh_token, config.REFRESH_TOKEN_SECRET, (err, user_id: any) => {
    if (err) {
      return res.status(403).send("Invalid refresh token");
    }
    const accessToken = jwt.sign({ user_id: user_id }, config.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });
    return res.status(200).send({ accessToken });
  });
}

