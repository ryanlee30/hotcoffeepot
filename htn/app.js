const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 4001;
const index = require("./routes/index");
const PTS_TO_WIN = 10;
const GameManager = require("./controllers/GameManager");
const utils = require("./Utils");

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

// Game related

const gameManager = new GameManager(PTS_TO_WIN);
let ryan = gameManager.newUser("ryan");
let marco = gameManager.newUser("marco");
let simon = gameManager.newUser("simon");
let sean = gameManager.newUser("sean");
let playerSlots = new Array(10).fill(null);
gameManager.chooseWinner(ryan);
gameManager.removeUser(simon);
console.log(gameManager.getUsers());