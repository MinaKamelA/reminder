/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import jwt from 'jsonwebtoken';
import UserStore from '../models/user';
import verifyToken from '../services/verifyToken';

const store = new UserStore();
const users = express.Router();

const index = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const result = await store.show(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    };
    const result = await store.create(user);
    const token = jwt.sign({ user: result }, process.env.TOKEN_SECRET as string);
    res.cookie('RCA', token, {
      maxAge: 5000,
      secure: true,
      sameSite: 'lax',
      httpOnly: true
    });
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const result = await store.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const edit = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const user: User = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    };
    const result = await store.edit(user);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

users.get('/', verifyToken, index);
users.get('/:id', verifyToken, show);
users.post('/', create);
users.delete('/:id', verifyToken, destroy);
users.put('/', verifyToken, edit);

export default users;
