const NUM_OF_CARDS = 7;

class GameManager {
    constructor(ptsToWin) {
        this.ptsToWin = ptsToWin;
        this.whoIsJudge = null;
        this.isGameOver = false;
        this.clientPlayerSlots = new Array(10).fill(null);
        this.videoCards = [];
        this.clientVideoCards = new Array(10).fill([]);
        this.presentationVideoCards = new Array(10).fill(null);
    }

    newUser(name) {
        for (let i = 0; i < this.clientPlayerSlots.length; i++) {
            if (!this.clientPlayerSlots[i]) {
                let userObject = {name: name, score: 0, slotNumber: i+1, isJudge: false}
                this.clientPlayerSlots[i] = userObject;
                this.clearClientVideoCards(i + 1) // ensure the cards in that slot are empty
                //poplate the video cards for the new user
                for (let j = 0; j < NUM_OF_CARDS; j++) {
                    this.clientVideoCards[i].push(this.popVideoCard());
                }
                return userObject;
            }
        }
    }

    getClientVideoCards(slotNumber){
        // console.log("getting client video cards for slot number " + slotNumber)
        // console.log(this.clientVideoCards[slotNumber - 1])
        //returns cards belonging to a user
        return this.clientVideoCards[slotNumber - 1]
    }

    clearClientVideoCards(slotNumber){
        //clears the video cards belonging to a user
        if (this.clientVideoCards[slotNumber - 1].length > 0){
            this.videoCards.push(this.clientVideoCards[slotNumber - 1])
        }
        this.clientVideoCards[slotNumber - 1] = []
    }

    removeSingleClientVideoCard(slotNumber, cardData){
        //this function removes the a specific card from a user, 
        //puts it back in the full card stack, and give the user a new card
        //Args: [slotNumber]: slotNumber of user, [cardData]: cardData of the card to remove
        let newVideoCards = this.clientVideoCards[slotNumber - 1].filter((el) => {
            return el.videoID !== cardData.videoID
        })
        // console.log("New video cards for " + this.clientPlayerSlots[slotNumber - 1].name + ":");
        // console.log(newVideoCards)
        newVideoCards.push(this.popVideoCard()) // put a new card in the client's video stack
        this.videoCards.push(cardData) // put the new card back in full video card stack
        this.clientVideoCards[slotNumber - 1] = newVideoCards
    }

    checkNumberOfUsers() {
        return this.clientPlayerSlots.filter((player) => {
            return player !== null;
        }).length;
    }

    removeUser(slotNumber) {
        this.clientPlayerSlots[slotNumber-1] = null;
    }

    initializeVideoCards(videoCards) {
        this.videoCards = videoCards;
    }

    chooseWinner(slotNumber) {
        this.clientPlayerSlots[slotNumber-1].score++;
    }

    isJudge(slotNumber){
        return this.clientPlayerSlots[slotNumber-1].isJudge
    }

    nextJudge() {
        let nonNullClientPlayerSlots = [];
        let currentJudgeIndex = null;
        for (let player of this.clientPlayerSlots) {
            if (player) {
                nonNullClientPlayerSlots.push(player);
            }
        }
        for (let i = 0; i < nonNullClientPlayerSlots.length; i++) {
            if (nonNullClientPlayerSlots[i].isJudge) {
                currentJudgeIndex = i;
            }
        }
        if (currentJudgeIndex === null) {
            currentJudgeIndex = -1;
        }
        for (let player of this.clientPlayerSlots) {
            if (player) {
                if (nonNullClientPlayerSlots[currentJudgeIndex+1] === undefined) {
                    if (player.slotNumber === nonNullClientPlayerSlots[0].slotNumber) {
                        player.isJudge = true;
                        this.whoIsJudge = player;
                    } else {
                        player.isJudge = false;
                    }
                } else {
                    if (player.slotNumber === nonNullClientPlayerSlots[currentJudgeIndex+1].slotNumber) {
                        player.isJudge = true;
                        this.whoIsJudge = player;
                    } else {
                        player.isJudge = false;
                    };
                }
            }
        }
    }

    getClientPlayerSlots() {
        return this.clientPlayerSlots;
    }

    getAllVideoCards() {
        return this.shuffleCards(this.videoCards);
    }

    popVideoCard() {
        return this.videoCards.pop();
    }

    getPresentationVideoCards() {
        return this.presentationVideoCards;
    }

    pushPresentationVideoCards(slotNumber, card) {
        // this.presentationVideoCards.push(card);
        this.presentationVideoCards[slotNumber-1] = card
    }

    clearPresentationVideoCards() {
        this.presentationVideoCards = new Array(10).fill(null);
    }

    chooseRemoveCard(){

    }

    shuffleCards(array) {
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

    getWhoIsJudge() {
        return this.whoIsJudge;
    }
}

module.exports = GameManager
