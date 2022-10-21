import { Router } from "express";
import { userAuthorize } from "../userAuthorize";
export const homePageRoutes = Router();

homePageRoutes.get("/validate", async (req, res) => {
    const authorize = await userAuthorize(req);
    
    if (!authorize) {
        res.json({ error: true, msg: "Unauthorized" })
        return;
    }

    res.json({error: false, msg: "Authorized"});
});