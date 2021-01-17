const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 4001;
const index = require("./routes/index");
const PTS_TO_WIN = 10;

const app = express();
const server = http.createServer(app);
const GameManager = require("./controllers/GameManager");
const StateManager = require("./controllers/StateManager");

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
const stateManager = new StateManager(PTS_TO_WIN);
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
    updateUserList()
  });
  // when components mount
  socket.on("request userData", () => {
    socket.emit("userListData", gameManager.getClientPlayerSlots());
  });

  socket.on("request isJudge", (slotNumber) => {
    socket.emit("isJudge", gameManager.isJudge(slotNumber))
  })


  //for debugging
  socket.on("next judge", () => {
    gameManager.nextJudge()
    updateUserList()
  })

  socket.on("next gamestate", () => {
    stateManager.nextGameState()
    updateGameState()
  })
});

function updateUserList(){
  io.sockets.emit("userListData", gameManager.getClientPlayerSlots());
}

function updateGameState(){
  io.sockets.emit("gameState", stateManager.getGameState());
}

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

const firebase = require('./firestore')
// Firestore
async function getAllVideoCards() {
  const db = firebase.firestore();
  const colRef = db.collection('youtube-data')
  const col = await colRef.get();
  var videoCards = []
  col.forEach(doc => {
    videoCards.push(doc.data())
  })
  console.log(videoCards)
  return videoCards
}

// getAllVideoCards()