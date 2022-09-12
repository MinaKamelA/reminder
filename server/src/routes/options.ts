import { Router } from 'express';
import * as controller from '../handlers/options';
import verifyToken from '../services/verifyToken';

const options = Router();

options.get('/', verifyToken, controller.index);
options.get('/:id', verifyToken, controller.show);
options.post('/', verifyToken, controller.create);
options.delete('/:id', verifyToken, controller.destroy);
options.put('/', verifyToken, controller.edit);

export default options;
