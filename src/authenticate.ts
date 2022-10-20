import { Router } from "express";
export const authenticateRouter = Router();

authenticateRouter.get("/test", async (req, res) => {
    res.json({error: false, msg: "hi"})
  });