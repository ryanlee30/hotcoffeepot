gameStates = ["waiting", "judging", "viewing", "choosing"]

class GameManager {
    constructor() {
        this.gameStateIndex = 0
    }
    
    //Temporary hard coded shit
    nextGameState(){
        if (this.gameStateIndex == 3) {
            this.gameStateIndex = 0
        }
        else {
            this.gameStateIndex ++ 
        }
    }

    getGameState(){
        return gameStates[this.gameStateIndex]
    }
}

module.exports = GameManager