import  { Request, Response, Router } from "express";
import authRouter from "./auth";
import userRouter from "./user"

const router = Router();


router.get("/", (req: Request, res:Response)=> {
    res.send("Welcome to LinkR")
})
router.get("/dashboard", (req: Request, res:Response)=> {
    res.send("Welcome to your LinkR dashboard")
})
router.use("/auth", authRouter)
router.use('/user', userRouter);

export default router;