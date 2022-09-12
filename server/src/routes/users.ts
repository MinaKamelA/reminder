/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import * as controller from '../handlers/users';
import verifyToken from '../services/verifyToken';

const users = express.Router();

users.get('/', verifyToken, controller.index);
users.get('/:id', verifyToken, controller.show);
users.post('/', controller.create);
users.delete('/:id', verifyToken, controller.destroy);
users.put('/', verifyToken, controller.edit);

export default users;
