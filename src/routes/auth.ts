import { Router } from 'express';

import { Auth } from './../controllers/Auth';
import { User } from './../controllers/User';
import { ValidateBody } from './../middleware/ValidateBody';
const routerAuth = Router();

routerAuth.post('/auth', Auth.login);
routerAuth.post('/user', ValidateBody.CreateUser, User.create);

export { routerAuth };
