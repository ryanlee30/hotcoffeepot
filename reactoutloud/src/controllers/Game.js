
class Game {
    constructor(ptsToWin) {
        this.users = [];
        this.ptsToWin = ptsToWin;
        this.whoIsJudge = '';
        this.isGameOver = false;
    }

    chooseJudge() {
        let nextJudge = this.users[this.users.indexOf(this.whoIsJudge)+1];
        if (!nextJudge) {
            this.whoIsJudge = this.users[0];
        } else {
            this.whoIsJudge = nextJudge;
        }
    }
}