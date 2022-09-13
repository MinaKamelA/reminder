import express from 'express';
import UserStore from '../models/user';
import validator from 'validator';

const store = new UserStore();

const login = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (validator.isEmail(email)) {
      const result = await store.login(email, password);
      res.json(result);
    } else {
      throw Error('This email is not valid, please enter a valid email');
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export default login;
