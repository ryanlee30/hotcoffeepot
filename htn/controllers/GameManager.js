class GameManager {
    constructor(ptsToWin) {
        this.ptsToWin = ptsToWin;
        this.whoIsJudge = null;
        this.isGameOver = false;
        this.clientPlayerSlots = new Array(10).fill(null);
        this.videoCards = [];
        this.presentationVideoCards = new Array(10).fill(null);
    }

    newUser(name) {
        for (let i = 0; i < this.clientPlayerSlots.length; i++) {
            if (!this.clientPlayerSlots[i]) {
                let userObject = {name: name, score: 0, slotNumber: i+1, isJudge: false}
                this.clientPlayerSlots[i] = userObject;
                return userObject;
            }
        }
    }

    checkNumberOfUsers() {
        let counter = 0;
        for (let player of this.clientPlayerSlots) {
            if (player) {
                counter++;
            }
        }
        return counter;
    }

    checkAtLeastThree() {
        return this.clientPlayerSlots.filter((player) => {
            return player !== null;
        }).length >= 3;
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

    getVideoCards() {
        return this.shuffleCards(this.videoCards);
    }

    popVideoCards() {
        return this.videoCards.pop();
    }

    getPresentationVideoCards() {
        return this.presentationVideoCards;
    }

    pushPresentationVideoCards(slotNumber, card) {
        // this.presentationVideoCards.push(card);
        this.presentationVideoCards[slotNumber] = card
    }

    clearPresentationVideoCards() {
        this.presentationVideoCards = new Array(10).fill(null);
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
