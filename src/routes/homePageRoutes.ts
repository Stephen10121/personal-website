import { Router } from "express";
import { userAuthorize } from "../userAuthorize";
export const homePageRoutes = Router();

homePageRoutes.get("/validate", async (req, res) => {
    const authorize = await userAuthorize(req);
    
    if (!authorize) {
        res.json({ error: true, msg: "Unauthorized" })
        return;
    }

    const user = authorize.user as any;
    delete user.id;
    res.json({error: false, msg: "Authorized", userData: user});
});

type Website = {
    id: string,
    active: boolean,
    name: string
}

const websites = [
    {
        id: "22io2klnf32n",
        active: true,
        name: "Auth Server"
    },
    {
        id: "32432fs432rn",
        active: false,
        name: "Files Server"
    },
    {
        id: "qkjned2jknk2",
        active: true,
        name: "Tester"
    },
    {
        id: "wkjnd2dkjnnk",
        active: false,
        name: "Old"
    }
] as Website[];

homePageRoutes.get("/websites", async (req, res) => {
    const authorize = await userAuthorize(req);
    
    if (!authorize) {
        res.json({ error: true, msg: "Unauthorized" })
        return;
    }

    res.json({ error: false, websites });
});

homePageRoutes.get("/website", async (req, res) => {
    console.log(req.query);
    let certainWebsite;
    for (let i=0; i<websites.length; i++) {
        if (websites[i].id===req.query.id) {
            certainWebsite = websites[i];
        }
    }
    res.json({ error: false, website: certainWebsite });
});