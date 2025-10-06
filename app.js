import crewData from "./crewData.js";

class CrewMember {
    constructor({name, role, description, catchphrase}) {
        this.name = name;
        this.role = role;
        this.description = description;
        this.catchphrase = catchphrase; 
    }

    talk() {
        console.log(this.catchphrase);
    }
};

class Item {
    constructor(item, description, amount) {
        this.item = item;
        this.description = description;
        this.amount = amount;
    }
}

const starship = {
    name: "Clunkerfly",
    model: "Junkyard Cruiser",
    description: 'An ugly but lovable starship cobbled together from scrap, spare parts, and salvaged tech; unpredictable and unreliable, its systems fail randomly, and it blasts rap music at full volume during stealth missions. No one knows where the speakers are.',
    technical_stats: {
        speed_mph: 11400,
        shield_strength: 55,
        fuel_level: 50,
        hull_integrity: 35, 
        crew_morale: 46,
        engine_state: 'online', // offline // damaged
    },
    crew: [
        new CrewMember(crewData.umeko),
        new CrewMember(crewData.grease),
        new CrewMember(crewData.byte),
        new CrewMember(crewData.doc),
        new CrewMember(crewData.carrot),
    ],
    inventory: [
        new Item('torchlight', 'Useful when all the lights on the ship suddenly go out – it happens a lot', '-'),
        new Item('dry biscuits', 'They have been here forever, I wouldn\t recommend eating them', '-'),
        new Item('teddy bear', 'Missing an eye and half an ear, looking smart with its little bowtie', '-'),
        new Item('space rum', 'A questionable liquor of very low quality', 13),
        new Item('credits', 'Useful to buy stuff', 1200),
        new Item('artifact', 'Mysterious object stole-I mean, found, on some space mission', 1),
    ],

    greetCrew: function() {
        this.crew.forEach(member => console.log(member.catchphrase));
    },

    checkStats: function() {
        console.log(`fuel level: ${this.technical_stats.fuel_level}% – hull integrity: ${this.technical_stats.hull_integrity}% – shield strength: ${this.technical_stats.shield_strength}%`)
    },

    throwParty: function() {
        this.technical_stats.crew_morale += 20;
        console.log('Whoo! hey DJ, turn that music up!');
        return this.technical_stats.crew_morale;
    }
}
