class User {
    constructor(name, uuid) {
        this.uuid = uuid;
        this.name = name;
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
}

module.exports = User