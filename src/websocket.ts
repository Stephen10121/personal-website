import * as WebSocket from 'ws';
import dotenv from 'dotenv';

dotenv.config()

export function startWebsocketServer(server: any) {
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws: WebSocket, req) => {
        if (!req.url) {
            ws.close();
            return;
        }

        const url = new URL(req.url, `http://${req.headers.host}`);

        if (!url.searchParams.get("id")) {
            ws.close();
            return;
        }
        const id = url.searchParams.get("id");
        console.log(process.env.PASSWORD);
        if (id !== process.env.PASSWORD) {
            ws.close();
            return;
        }

        ws.on('message', (message: string) => {

            //log the received message and send it back to the client
            console.log('received: %s', message);
            ws.send(`Hello, you sent -> ${message}`);
        });

        //send immediatly a feedback to the incoming connection    
        ws.send('Hi there, Authorized user.');
    });
}

//frontend
// on:submit|preventDefault={(e) => {
//     console.log(e.target[0].value);
//     let exampleSocket = new WebSocket(
//       `ws://192.168.0.24:3000/?id=${e.target[0].value}`
//     );

//     exampleSocket.onmessage = (event) => {
//       console.log(event.data);
//     };
//   }}


// const exampleSocket = new WebSocket(
    //   window.location.origin.replace("http", "ws") + "?id=test",
    //   ["protocol1", "protocol2"]
    // );
  
    // exampleSocket.onopen = (event) => {
    //   exampleSocket.send(
    //     "Here's some text that the server is urgently awaiting!"
    //   );
    // };