import { Request, Response } from "express";
import { User} from "../../schema/user";
import { sendEmail } from "../../services/email";
import { UserInterface } from "../../types/schema_types/schemaTypes";



export async function resetPasswordRequestController(req: Request, res: Response){
    const {email} = req.body;
    try{
        const user = (await User.findOne({email}) as UserInterface | null);
    if(!user){
        return res.status(404).json({success: false, message: "User not found"})
    }

    const resetLink = await user.generatePasswordResetLink();
    await sendEmail(user.email, 5, { link: resetLink, title: "Reset Password", firstname: user.firstname });
    return res.status(200).json({success: true, message: "Reset password link sent successfully"})
    }
    catch(error){
        if (error instanceof Error) {
            throw new Error(`Error: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred");
        }
    }

}