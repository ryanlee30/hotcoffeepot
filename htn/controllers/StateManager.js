const gameStates = ["lobby", "upload", "review", "results"]

class StateManager {
    constructor(ptsToWin) {
        this.ptsToWin;
        this.gameStateIndex = 0;
        this.clientPlayerStates = [];
    }

    //Temporary hard coded shit
    nextGameState(clientPlayerSlots){
        for (let player of clientPlayerSlots) {
            if (player.score === 10) {

            }
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

    getClientPlayerStates(clientPlayerSlots) {
        switch(this.getGameState()) {
            case "lobby": {
                for (let player of clientPlayerSlots) {
                    this.clientPlayerStates.push({slotNumber: player.slotNumber, gameState: "waiting"});
                }
            }
            case "upload": {
                for (let player of clientPlayerSlots) {
                    if (!player.isJudge) {
                        this.clientPlayerStates.push({slotNumber: player.slotNumber, gameState: "choosing"});
                    } else {
                        this.clientPlayerStates.push({slotNumber: player.slotNumber, gameState: "waiting"});
                    }
                }
            }
            case "review": {
                for (let player of clientPlayerSlots) {
                    if (!player.isJudge) {
                        this.clientPlayerStates.push({slotNumber: player.slotNumber, gameState: "viewing"});
                    } else {
                        this.clientPlayerStates.push({slotNumber: player.slotNumber, gameState: "judging"});
                    }
                }
            }
            case "results": {
                for (let player of clientPlayerSlots) {
                    if (!player.isJudge) {
                        this.clientPlayerStates.push({slotNumber: player.slotNumber, gameState: "game_over"});
                    } else {
                        this.clientPlayerStates.push({slotNumber: player.slotNumber, gameState: "game_over"});
                    }
                }
            }
        }
        return this.clientPlayerStates;
    }


}

module.exports = StateManager
