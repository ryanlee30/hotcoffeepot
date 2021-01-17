const gameStates = ["lobby", "upload", "review", "results"]

class StateManager {
    constructor(ptsToWin) {
        this.ptsToWin;
        this.gameStateIndex = 0;
        this.clientPlayerStates = [];
    }

    //Temporary hard coded shit
    nextGameState(clientPlayerSlots){
        // if game over
        for (let player of clientPlayerSlots) {
            if (player.score === this.ptsToWin) {
                this.gameStateIndex = 3;
                return this.getGameState();
            }
        }
        // if game not over (2+ rounds)
        for (let player of clientPlayerSlots) {
            if (this.getGameState() === "upload")
        }


        if (this.gameStateIndex == 3) {
            this.gameStateIndex = 0;
        }
        else {
            this.gameStateIndex ++;
        }
    }

    getGameState(){
        return gameStates[this.gameStateIndex]
    }
}

module.exports = StateManager
