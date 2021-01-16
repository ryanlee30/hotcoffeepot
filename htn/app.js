const express = require("express");
const http = require("http");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
// establish socket connection

io.on("connection", socket => {
  socket.on("start", function() {
    let counter = 30;
    let timer = setInterval(() => {
      if (counter <= 0) {
        clearInterval(timer);
      }
      socket.emit("timer", counter--);
    }, 1000);
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`));