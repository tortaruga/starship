export class ShipRoom {
    constructor({name, description, action}) {
        this.name = name;
        this.description = description;
        this.action = action;
    }

    goTo() { 
        return `You're in the ${this.name}. ${this.action}`;
    }
}

export class Location {
    constructor({name, description}) {
        this.name = name;
        this.description = description;
    }
}

export class CrewMember {
    constructor({name, role, description, catchphrase, drunken_message}) {
        this.name = name;
        this.role = role;
        this.description = description;
        this.catchphrase = catchphrase; 
        this.drunken_message = drunken_message;
    }

    talk() {
        return this.catchphrase;
    }
};

export class Item {
    constructor(item, description, amount, tag) {
        this.item = item;
        this.description = description;
        this.amount = amount;
        this.tag = tag;
    }
}
