import express from "express";
import * as http from 'http';
import { authenticateRouter } from "./authenticate";
// import { startWebsocketServer } from "./websocket";
import cookieParser from "cookie-parser";
import { socketConnection } from "./socket";
import { createConnection } from "typeorm";
import { userLogin } from "./userData";
import { createAccessToken } from "./tokenGen";

const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowEIO3: true
    }
});

app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use(cookieParser(), express.json(), express.static('frontend/dist'), express.urlencoded({ extended: true }));

app.use(authenticateRouter);

app.post("/auth", async (req, res) => {
    res.json({ error: false });
    
    const newData = req.body;
    const result = await userLogin({
      hash: newData.data,
      name: newData.name,
      email: newData.email,
      username: newData.username,
    });

    if (!result) {
        io.to(req.body.key).emit("auth-failed", "");
        return;
    }
    const result2 = result;
    result2.id = 0;

    io.to(req.body.key).emit("auth", {
        userData: result2,
        token: createAccessToken(result),
    });
  });

  // startWebsocketServer(server);
  createConnection().then(async (_data) => {
      console.log("[server] Connection created to database.");
  });

socketConnection(io);


server.listen(PORT, () => {
    console.log(`[server] Server running on port ${PORT}`);
});