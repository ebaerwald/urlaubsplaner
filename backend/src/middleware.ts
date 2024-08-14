import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from './config';
import util from 'util';

export function Logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Method: ${req.method} URL: ${req.url} Body: ${util.inspect(req.body, { depth: null })} Params: ${util.inspect(req.params, { depth: null })}`);
  next();
}

export function ValidateAccessToken(req: Request, res: Response, next: NextFunction) {
  if(req.url.includes("refreshToken") || req.url.includes("tokens"))
  {
    next();
    return;
  } 
    
  const { accessToken } = req.body;
  if (!accessToken) return res.status(400).send("Acess Token is required for every request");
  jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET, (err: any) => {
    if (err) {
      return res.status(403).send("Invalid access token");
    }
  });

  const decodedToken = jwt.decode(accessToken);
  if (decodedToken && typeof decodedToken !== "string") 
  {
    const expiresIn = decodedToken.exp && decodedToken.iat ? decodedToken.exp - decodedToken.iat : 0;
    if (expiresIn <= 0) {
      return res.status(403).send("Expired access token");
    }
  }
  next();
}
