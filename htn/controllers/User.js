
class User {
    constructor(name, uuid) {
        this.uuid = uuid;
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

    getUuid() {
        return this.uuid;
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

module.exports = User