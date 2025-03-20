import { Request, Router, Response } from 'express';

import { getProfile } from '../controller/auth/profile';
import { isAuthenticated } from '../middleware/auth/auth';
import emailCOntrollers from '../controller/test/email';
import userController from '../controller/user';

const userRouter = Router();

userRouter.get('/', isAuthenticated as any, getProfile as any);
userRouter.post('/', (req: Request, res: any) => {
    const EmailController = new emailCOntrollers(req, res);
    EmailController.sendEmail();
});

userRouter.route('/profile').put(isAuthenticated as any, (req: Request, res: Response) => {
    const UserController = new userController(req, res);
    UserController.updateUser();
}).get(isAuthenticated as any, (req: Request, res: Response) => {
    const UserController = new userController(req, res);
    UserController.getSingleUser();
})

export default userRouter;