import { Router } from "express";
export const authenticateRouter = Router();

authenticateRouter.get("/test", async (_req, res) => {
    res.json({error: false, msg: "hi"})
  });