import express, { Request, Response, Router } from "express";

const router = Router();


router.get("/", (req: Request, res:Response)=> {
    res.send("Welcome to LinkR")
})

export default router;