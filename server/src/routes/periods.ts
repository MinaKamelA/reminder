import { Router } from 'express';
import * as controller from '../handlers/periods';
import verifyToken from '../services/verifyToken';

const periods = Router();

periods.get('/', verifyToken, controller.index);
periods.get('/:id', verifyToken, controller.show);
periods.post('/', verifyToken, controller.create);
periods.delete('/:id', verifyToken, controller.destroy);
periods.put('/', verifyToken, controller.edit);

export default periods;
