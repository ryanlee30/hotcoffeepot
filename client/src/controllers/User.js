
class User {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hasUploaded = false;
    }

    incPoints() {
        this.points++;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getPoints() {
        return this.points;
    }

    getHasUploaded() {
        return this.hasUploaded;
    }
}