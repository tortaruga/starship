import crewData from "./crewData.js";
import shipSpacesData from "./shipSpacesData.js";
import locationsData from "./locationsData.js";
import missions from "./missions.js";

class ShipRoom {
    constructor({name, description}) {
        this.name = name;
        this.description = description;
    }
}

class Location {
    constructor({name, description}) {
        this.name = name;
        this.description = description;
    }
}

class CrewMember {
    constructor({name, role, description, catchphrase, drunken_message}) {
        this.name = name;
        this.role = role;
        this.description = description;
        this.catchphrase = catchphrase; 
        this.drunken_message = drunken_message;
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

    ship_rooms: Object.entries(shipSpacesData).map(item => new ShipRoom(item[1])),
    locations: Object.entries(locationsData).map(item => new Location(item[1])),

    greetCrew: function() {
        this.crew.forEach(member => console.log(member.catchphrase));
    },

    checkStats: function() {
        console.log(`fuel level: ${this.technical_stats.fuel_level}% – hull integrity: ${this.technical_stats.hull_integrity}% – shield strength: ${this.technical_stats.shield_strength}%`)
    },

    throwParty: function() {
        const boozeUsed = Math.ceil(Math.random() * (4 - 1) + 1);

        if (this.technical_stats.hull_integrity < 15) {
            console.log('Ship too broken to party. The speakers short-circuited and started playing whale mating calls…');
            return;
        }
        
        if (this.technical_stats.crew_morale >= 85) {
            console.log("Morale is already sky-high. No need for another party!")
        } else {
            if (boozeUsed > this.inventory.find(item => item.item === 'space rum').amount) {
                console.log("Not enough booze to party... Morale drops even lower");
                this.technical_stats.crew_morale -= Math.ceil(Math.random() * (20 - 10) + 10);
                if (this.technical_stats.crew_morale < 0) {
                    this.technical_stats.crew_morale = 0;
                }
            } else {
                this.technical_stats.crew_morale += Math.ceil(Math.random() * (30 - 15) + 15);
                this.inventory.find(item => item.item === 'space rum').amount -= boozeUsed;
                console.log(this.inventory.find(item => item.item === 'space rum').amount);

                if (this.technical_stats.crew_morale > 100) {
                    this.technical_stats.crew_morale = 100;
                }
                console.log('Whoo! hey DJ, turn that music up!');
                console.log(this.crew[Math.floor(Math.random() * this.crew.length)].drunken_message)
                
                setTimeout(() => {
                    console.log('🎉 The crew throws a wild party! Morale is up!');
                }, 1000);
            }

        } 
        return this.technical_stats.crew_morale;
    },

    checkBooze: function() {
        if (this.inventory.find(item => item.item === 'space rum').amount === 0) {
            console.log("Hey, space rats! We're out of booze! We need to stop by Planet Base before Doc starts hallucinating.")
        }
    },

    missions: missions,

    checkFuel: function() {
        if (this.technical_stats.fuel_level <= 0) {
            console.log("Folks, we’re out of fuel again.")
        }
    },

    checkDamage: function() {
        if (this.technical_stats.hull_integrity <= 0 || this.technical_stats.shield_strength <= 0) {
            console.log("Too much damage, the ship is in critical condition")
        }
    },

    checkMorale: function() {
        if (this.technical_stats.crew_morale <= 0) {
            console.log("Morale is so low the crew is basically depressed. Let's liven up the place")
        }
    }
}
