import {Request, Response} from "express";
import { errorHandler } from "../../utils/errorHandler";
import { sendEmailWithTemplate } from "../../services/email";

class emailControllers {

    private request: Request;
    private response: Response;

    constructor(req: Request, res: Response){
        this.request = req;
        this.response = res;
    }
    async sendEmail(){
        try {
            const result = await sendEmailWithTemplate('ugwujameskelechi@gmail.com', {name: 'James', otp: '233900'}, 1);
            this.response.status(200).json({success: true,message: result});
        } catch (error) {
            errorHandler(error)
        }
    }
}

export default emailControllers;