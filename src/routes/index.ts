import  { Request, Response, Router } from "express";
import authRouter from "./auth";

const router = Router();


router.get("/", (req: Request, res:Response)=> {
    res.send("Welcome to LinkR")
})
router.use("/auth", authRouter)

export default router;