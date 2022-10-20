import express from "express";
import * as http from 'http';
import { authenticateRouter } from "./authenticate";
// import { startWebsocketServer } from "./websocket";
import cookieParser from "cookie-parser";
import { socketConnection } from "./socket";
import { userLogin } from "./userData";

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
    console.log(req.body);
    const newData = req.body;
    const result = await userLogin({
      hash: newData.data,
      name: newData.name,
      email: newData.email,
      username: newData.username,
    });
    io.to(req.body.key).emit("auth", {
        userData: result,
        token: "accessToken",
    });
    // if (result.error !== 200) {
    //   console.log(result.errorMessage);
    //   return res.json({ msg: "Something went wrong." });
    // }
    // delete result.data.userInfo.id;
    // const accessToken = jwt.sign(
    //   result.data.userInfo,
    //   process.env.ACCESS_TOKEN_SECRET
    // );
    // io.to(req.body.key).emit("auth", {
    //   userData: result.data.userInfo,
    //   token: accessToken,
    // });
  });

// startWebsocketServer(server);
socketConnection(io);

server.listen(PORT, () => {
    console.log(`[server] Server running on port ${PORT}`);
});