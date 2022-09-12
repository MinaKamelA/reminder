import { Router } from 'express';
import * as controller from '../handlers/events';
import verifyToken from '../services/verifyToken';

const events = Router();

events.get('/', verifyToken, controller.index);
events.get('/:id', verifyToken, controller.show);
events.post('/', verifyToken, controller.create);
events.delete('/:id', verifyToken, controller.destroy);
events.put('/', verifyToken, controller.edit);

export default events;
