const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 4001;
const index = require("./routes/index");
const PTS_TO_WIN = 10;

const app = express();
const server = http.createServer(app);
const GameManager = require("./controllers/GameManager");
const { json } = require("express");
app.use(index);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Game related

const gameManager = new GameManager(PTS_TO_WIN);
// gameManager.newUser("ryan");
// gameManager.newUser("marco");
// gameManager.newUser("simon");
// gameManager.newUser("sean");
// gameManager.chooseWinner(2);
// gameManager.removeUser(3);
// gameManager.nextJudge();
// gameManager.nextJudge();
// gameManager.nextJudge();
// gameManager.nextJudge();
// gameManager.nextJudge();
// console.log(gameManager.getClientPlayerSlots());

io.on("connection", socket => {
  // timer
  socket.on("start", function() {
    let counter = 30;
    let timer = setInterval(() => {
      if (counter <= 0) {
        clearInterval(timer);
      }
      io.sockets.emit("timer", counter--);
    }, 1000);
  });
  // when joined
  socket.on("join", name => {
    console.log(`${name} joined`);
    socket.emit("userData", gameManager.newUser(name));
    io.sockets.emit("userListData", gameManager.getClientPlayerSlots());
  });
  // when components mount
  socket.on("request userData", () => {
    socket.emit("userListData", gameManager.getClientPlayerSlots());
  });
});

// Reddit prompt creation
const request = require('request')
     ,url = 'https://www.reddit.com/r/funny/top/.json?count=20'

request(url, (error, response, body)=> {
  if (!error && response.statusCode === 200) {
    const redditResponse = JSON.parse(body)["data"]["children"];
    // redditResponse.forEach(obj => console.log(obj["data"]["title"]))
  } else {
    console.log("Got an error: ", error, ", status code: ", response.statusCode);
  }
});
