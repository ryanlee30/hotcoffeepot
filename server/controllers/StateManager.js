const gameStates = ["lobby", "upload", "review", "results"]

class StateManager {
    constructor(ptsToWin) {
        this.ptsToWin = ptsToWin;
        this.gameStateIndex = 0;
        this.clientPlayerStates = [];
    }

    nextGameState(clientPlayerSlots) {
        // if game is in lobby state
        if (this.getGameState() === "lobby") {
            this.gameStateIndex = 1;
            return;
        }
        // if game over
        for (let player of clientPlayerSlots) {
            if (player) {
                if (player.score === this.ptsToWin) {
                    this.gameStateIndex = 3;
                    return;
                }
            }
        }
        // if game not over (2+ rounds)
        if (this.getGameState() === "upload") {
            this.gameStateIndex = 2;
            return;
        } else if (this.getGameState() === "review") {
            this.gameStateIndex = 1;
            return;
        }
    }

    getGameState(){
        return gameStates[this.gameStateIndex]
    }
}

module.exports = StateManager
