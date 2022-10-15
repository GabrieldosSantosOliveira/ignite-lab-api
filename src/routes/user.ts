import { Router } from 'express';

import { Auth } from './../controllers/Auth';
import { User } from './../controllers/User';
import { ValidateBody } from './../middleware/ValidateBody';
const routerUser = Router();
routerUser.use(Auth.middlewareAuth);
routerUser.get('/user/:id', User.findOne);
routerUser.get('/user', User.findAll);
routerUser.put(
  '/user/:id',
  ValidateBody.UpdateUser,
  User.update
);
routerUser.delete('/user/:id', User.delete);
export { routerUser };
