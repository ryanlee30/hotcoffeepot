class GameManager {
    constructor(ptsToWin) {
        this.ptsToWin = ptsToWin;
        this.whoIsJudge = null;
        this.isGameOver = false;
        this.clientPlayerSlots = new Array(10).fill(null);
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

    removeUser(slotNumber) {
        this.clientPlayerSlots[slotNumber-1] = null;
    }

    chooseWinner(slotNumber) {
        this.clientPlayerSlots[slotNumber-1].score++;
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
                    player.isJudge = player.slotNumber === nonNullClientPlayerSlots[0].slotNumber;
                } else {
                    player.isJudge = player.slotNumber === nonNullClientPlayerSlots[currentJudgeIndex+1].slotNumber;
                }
            }
        }
    }

    getClientPlayerSlots() {
        return this.clientPlayerSlots;
    }
}

module.exports = GameManager
