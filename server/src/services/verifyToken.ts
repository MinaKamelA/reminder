import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// get env variables
dotenv.config();

const {
  TOKEN_SECRET
} = process.env;

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  try {
    const token = req.cookies.RCA;
    const decode = jwt.verify(token, TOKEN_SECRET as string) as jwt.JwtPayload;
    req.userId = decode.user[0].id.toString();
    next();
  } catch (error) {
    res.status(401);
    res.json('401: Unauthorized (Access denied)');
  }
};

export default verifyToken;
