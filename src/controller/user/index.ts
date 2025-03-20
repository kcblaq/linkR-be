import { Request, Response } from "express";
import { errorHandler } from "../../utils/errorHandler";
import {User} from "../../schema/user";


class userController {

    private request: Request;
    private response: Response;

    constructor(req: Request, res: Response){
        this.request = req;
        this.response = res;
    }

    async getSingleUser(){
        try{
            if (!this.request.user) {
                return this.response.status(400).json({ message: "User information is missing" });
              }
            const user = await User.findById(this.request.user).select("-password -otp -otpExpires");
            if (!user) {
                return this.response.status(404).json({ message: "User not found" });
              }
            this.response.status(200).json({success: true, message: user});
        } catch (error) {
            errorHandler(error)
        }
    }

    async updateUser(){

        if (!this.request.user) {
            return this.response.status(400).json({ message: "User information is missing" });
          }
        try {
            const user = await User.findByIdAndUpdate(this.request.user, this.request.body, {
                new: true,

            }).select("-password -otp -otpExpires");
            if(!user){
                return this.response.status(404).json({message: "User not found"});
            }
            this.response.status(200).json({success: true, message: user});
        } catch (error) {
            errorHandler(error)
        }
    }
}


export default userController;