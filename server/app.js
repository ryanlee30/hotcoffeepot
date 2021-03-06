const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 4001;
const index = require("./routes/index");
const PTS_TO_WIN = 10;
const firebase = require('./firestore')

const app = express();
const server = http.createServer(app);
const GameManager = require("./controllers/GameManager");
const StateManager = require("./controllers/StateManager");
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
getAllVideoCards().then(data => {
  gameManager.initializeVideoCards(data)});

getRedditPrompts()
// put in video cards from firestore in below function
// gameManager.initializeVideoCards();
// gameManager.getVideoCards();
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
let timerPtr = null;

io.on("connection", socket => {
  // when joined
  socket.on("join", name => {
    console.log(`${name} joined`);
    socket.emit("userData", gameManager.newUser(name));
    if (gameManager.checkNumberOfUsers() >= 3) {
      io.sockets.emit("check ready");
    }
    updateUserList();
  });
  // when left
  socket.on("left", userData => {
    gameManager.removeUser(userData.slotNumber);
    updateUserList();
  })
  // when components mount
  socket.on("request userListData", () => {
    socket.emit("userListData", gameManager.getClientPlayerSlots());
  });
  // when the game has officially started by someone pressing start game button
  socket.on("start game", () => {
    stateManager.nextGameState(gameManager.getClientPlayerSlots());
    updateGameState();
    timerPtr = startTimer();
    gameManager.nextJudge();
    io.sockets.emit("here is prompt", getOneRedditPrompt());
    updateUserList();
  })
  socket.on("request cards", (slotNumber) => {
      //give the 7 cards belonging to user with specified slotNumber      
      socket.emit("7 userCards", gameManager.getClientVideoCards(slotNumber));
  });
  // after winner has been chosen and next round starts
  socket.on("next round", () => {
    io.sockets.emit("next round started", "");
  })

  // when a judge has chosen the winner
  socket.on("choose winner", winnerSlotNumber => {
    // increment a user's score, this one is only for the judge
    console.log("choosing winner with slot number " + winnerSlotNumber)
    gameManager.chooseWinner(winnerSlotNumber);
    gameManager.nextJudge();
    gameManager.clearPresentationVideoCards();
    stateManager.nextGameState(gameManager.getClientPlayerSlots());
    updateGameState();
    timerPtr = startTimer();
    io.sockets.emit("here is prompt", getOneRedditPrompt());
    updateUserList();
  });
  // when a client has finished choosing their card
  socket.on("choose card", (slotNumber, cardData) => {
    gameManager.pushPresentationVideoCards(slotNumber, cardData);
    gameManager.removeSingleClientVideoCard(slotNumber, cardData);
    if (gameManager.getPresentationVideoCards().filter((el)=>{return el != null}).length === gameManager.checkNumberOfUsers() - 1) {
      // this is for the judge, and is invoked when everyone has submitted
      // console.log(gameManager.getPresentationVideoCards());
      io.sockets.emit("everyone submitted", gameManager.getPresentationVideoCards());
      if (timerPtr) {
        clearInterval(timerPtr);
      }

      stateManager.nextGameState(gameManager.getClientPlayerSlots());
      updateGameState();
    }
    // shuffles cards
    // gameManager.getVideoCards();
    // give each person in clientplayerslots 1 card;
    // socket.emit("1 userCard", gameManager.popVideoCards());
  });
  
  socket.on("request isJudge", (slotNumber) => {
    socket.emit("isJudge", gameManager.isJudge(slotNumber))
  })

  socket.on("request presentation cards", () => {
    socket.emit("everyone submitted", gameManager.getPresentationVideoCards());
  })

  //for debugging
  socket.on("next judge", () => {
    gameManager.nextJudge();
    updateUserList();
    console.log(gameManager.getWhoIsJudge());
  })

  socket.on("next gamestate", () => {
    stateManager.nextGameState(gameManager.getClientPlayerSlots());
    updateGameState();
  })

  socket.on("request gamestate", () => {
    socket.emit("gameState", stateManager.getGameState());
  })

  socket.on("request video", (videoCard) => {
    io.sockets.emit("play video", videoCard)
  })
});

function updateUserList(){
  io.sockets.emit("userListData", gameManager.getClientPlayerSlots());
}

function updateGameState(){
  io.sockets.emit("gameState", stateManager.getGameState());
}

function startTimer() {
  let counter = 30;
    let timer = setInterval(() => {
      if (counter <= 0) {
        clearInterval(timer);
        stateManager.nextGameState(gameManager.getClientPlayerSlots());
        updateGameState();
      }
      io.sockets.emit("timer", counter--);
    }, 1000);
    return timer;
}

let redditPrompts = [];

function getOneRedditPrompt(){
  newPrompt = redditPrompts.pop()
  if (redditPrompts.length <= 2){
    getRedditPrompts()
  }
  return newPrompt
}
// Reddit prompt creation
function getRedditPrompts() {
  const request = require('request')
     ,url = 'https://www.reddit.com/r/funny/top/.json?count=20'

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const redditResponse = JSON.parse(body)["data"]["children"];
      redditResponse.forEach(obj => redditPrompts.push(obj["data"]["title"]));
      redditPrompts = shuffle(redditPrompts)
    } else {
      console.log("Got an error: ", error, ", status code: ", response.statusCode);
      return error
    }
  });
}

https://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Firestore
async function getAllVideoCards() {
  const db = firebase.firestore();
  const colRef = db.collection('youtube-data')
  const col = await colRef.get();
  var videoCards = []
  col.forEach(doc => {
    videoCards.push(doc.data())
  })
  return videoCards
}
