import { Router } from 'express';
import * as controller from '../handlers/events';
import { eventOptions } from '../handlers/options';
import verifyToken from '../services/verifyToken';

const events = Router();

events.get('/', verifyToken, controller.index);
events.get('/:id', verifyToken, controller.show);
events.post('/', verifyToken, controller.create);
events.delete('/:id', verifyToken, controller.destroy);
events.put('/', verifyToken, controller.edit);
// get event options
events.get('/:id/options', verifyToken, eventOptions);

export default events;
