/**
 * Use this module file to create instances of all authentication and simplify imports in to your routers
 */

import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
import VerifyUserEmail from './VerifyUserEmail';
import UserService from '../services/User.service';

const createUser = new CreateUser(new UserService());
const loginUser = new LoginUser(new UserService());
const verifyUserEmail = new VerifyUserEmail();

export { createUser, loginUser, verifyUserEmail };
