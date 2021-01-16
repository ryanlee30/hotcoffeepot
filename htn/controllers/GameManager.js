const User = require("./User");

class GameManager {
    constructor(ptsToWin) {
        this.users = [];
        this.ptsToWin = ptsToWin;
        this.whoIsJudge = null;
        this.isGameOver = false;
    }

    newUser(name) {
        let newUser = new User(name, this.users.length+1)
        let newUserObject = { user: newUser, points: 0, hasUploaded: false};
        this.users.push(newUserObject);
        return newUser;
    }

    removeUser(user) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].user.getUuid() === user.getUuid()) {
                this.users.splice(i,1);
            }
        }
    }

    chooseWinner(user) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].user.getUuid() === user.getUuid()) {
                this.users[i].points++;
            }
        }
    }

    nextJudge() {
        let nextJudge = this.users[this.users.indexOf(this.whoIsJudge)+1];
        if (!nextJudge) {
            this.whoIsJudge = this.users[0];
        } else {
            this.whoIsJudge = nextJudge;
        }
        console.log(this.whoIsJudge);
    }

    getUsers() {
        return this.users;
    }
}

module.exports = GameManager
