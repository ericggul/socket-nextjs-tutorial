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

      //////////////////////////////////////////////////////////////
      //// Sample Use Cases for IDC2
      /////1. Device Init Logic

      socket.on('mobile-init', (data) => {
        console.log('mobile new user handling', data);
        socket.join('mobile');
        socket.to('entrance').emit('entrance-new-user', data);
      })

      socket.on('device-init', (data) => {
        console.log('device init handling', data);
        socket.join('device');
      })

      socket.on('controller-init', (data) => {
        console.log('controller init handling', data);
        socket.join('controller');
      })

      socket.on('entrance-init', (data) => {
        console.log('entrance init handling', data);
        socket.join('entrance');
      })


      /////2. Cross-Device Communication Logic


      //2-1. Mobile --> 
      //comment out: mobile-init should do this job
      // socket.on('mobile-new-user', (data) => {
      //   console.log('mobile new user handling', data);
      //   socket.to('entrance').emit('entrance-new-user', data);
      // })


      socket.on('mobile-new-name', (data) => {
        console.log('mobile new name handling', data);
        socket.to('entrance').emit('entrance-new-name', data);
        socket.to('controller').emit('controller-new-name', data);
      })

      socket.on('mobile-new-voice', (data) => {
        console.log('mobile-new voice handling', data);
        socket.to('devcie').emit('device-new-voice', data);
        socket.to('controller').emit('controller-new-voice', data);
      })

      //2-2. Controller --> 
      socket.on('controller-new-decision', (data) => {
        console.log('controller new decision handling', data);
        socket.to('device').emit('device-new-decision', data);
        socket.to('mobile').emit('mobile-new-decision', data);
      })


      //////////////////////////////////////////////////////////////
      //// End of Sample Use Cases for IDC2
      //////////////////////////////////////////////////////////////


      //////////DEMO VERSIONS BELOW
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


