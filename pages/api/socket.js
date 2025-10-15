// Minimal Socket.IO server for Next.js API route (hyphen-case events, roomed)

export const config = {
  api: { bodyParser: false },
};

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("socket already enabled");
    res.end();
    return;
  } else {
    console.log("socket enabled");
    const { Server } = require("socket.io");

    const io = new Server(res.socket.server, {
      path: "/api/socketio",
      addTrailingSlash: false,
    });

    // Shared state for demo (volatile per server instance)
    let clickCount = 0;

    function demoSetup({ socket, io }) {
      // init
      socket.on("mobile-init", () => {
        socket.join("demo");
        socket.join("demo-mobile");
      });

      socket.on("screen-init", () => {
        socket.join("demo");
        socket.join("demo-screen");
      });

      // actions
      socket.on("mobile-text", (data) => {
        // { text }
        console.log(data);
        socket.to("demo-screen").emit("new-screen-text", data);
      });

      socket.on("mobile-button", () => {
        
        clickCount += 1;
        console.log(clickCount);
        socket
          .to("demo-screen")
          .emit("new-screen-clicks", { count: clickCount });
      });
    }

    io.on("connection", (socket) => {
      console.log("socket connected", socket.id);
      demoSetup({ socket, io });
    });

    res.socket.server.io = io;
  }
  res.end();
}


