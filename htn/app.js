const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 4001;
const index = require("./routes/index");
const PTS_TO_WIN = 10;
const GameManager = require("./controllers/GameManager");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

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

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const gameManager = new GameManager(PTS_TO_WIN);
let one = gameManager.newUser("Marco");
let two = gameManager.newUser("Ryan");
gameManager.chooseWinner(one);
gameManager.chooseWinner(two);
console.log(gameManager);