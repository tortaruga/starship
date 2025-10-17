import crewData from "./crewData.js";
import shipSpacesData from "./shipSpacesData.js";
import locationsData from "./locationsData.js";
import missions from "./missions.js";

const engineStates = [
    {
        state: "surprisingly good",
        severity: 'good',
    },

    {
        state: "smoother than expected",
        severity: 'good',
    },

    {
        state: "stable",
        severity: 'good',
    },

    {
        state: "unreasonably efficient",
        severity: 'good',
    },

    {
        state: "not bad all things considered",
        severity: 'caution',
    },
    
    {
        state: "holding together with duct tape and hope",
        severity: 'caution',
    },

    {
        state: "grumpy but functional",
        severity: 'caution',
    },

    {
        state: "could be worse, probably will be",
        severity: 'caution',
    },

    {
        state: "just about to explode",
        severity: 'critical',
    },

    {
        state: "screaming in binary",
        severity: 'critical',
    },

    {
        state: "just about to explode",
        severity: 'critical',
    },

    {
        state: "brace for impact...",
        severity: 'critical',
    },

    {
        state: "overheated, currently frying bacon on it",
        severity: 'critical',
    },

    {
        state: "stuck in existential crisis",
        severity: 'glitch',
    },

     {
        state: "unknown protocol: 42-ERROR-OMEGA",
        severity: 'glitch',
    },

     {
        state: "Schrödinger’s thrust",
        severity: 'glitch',
    },

     {
        state: "[REDACTED]",
        severity: 'glitch',
    },
];


// classes
class ShipRoom {
    constructor({name, description, action}) {
        this.name = name;
        this.description = description;
        this.action = action;
    }

    goTo() { 
        return `You're in the ${this.name}. ${this.action}`;
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
        return this.catchphrase;
    }
};

class Item {
    constructor(item, description, amount) {
        this.item = item;
        this.description = description;
        this.amount = amount;
    }
}

// starship object
export const starship = {
    name: "Clunkerfly",
    model: "Junkyard Cruiser",
    description: 'An ugly but lovable starship cobbled together from scrap, spare parts, and salvaged tech; unpredictable and unreliable, its systems fail randomly, and it blasts rap music at full volume during stealth missions. No one knows where the speakers are.',
    technical_stats: {
        speed_mph: 11400, 
        shield_strength: 55,
        fuel_level: 50,
        hull_integrity: 35, 
        crew_morale: 46,
        engine_state: 'online',
        ammo_levels: 23,
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
        let result = '';
        this.crew.forEach(member => result += `<p>${member.catchphrase}</p>`);
        return result;
    },

    checkStats: function() {
        let result = `fuel level: ${this.technical_stats.fuel_level}% – hull integrity: ${this.technical_stats.hull_integrity}% – shield strength: ${this.technical_stats.shield_strength}%`;
        return result;
    },

    throwParty: function() {
        const boozeUsed = Math.ceil(Math.random() * (4 - 1) + 1);

        if (this.technical_stats.hull_integrity < 15) {
            return {result: '<p>Ship too broken to party. The speakers short-circuited and started playing whale mating calls…</p>', wasSuccessful: false};
        }
        
        if (this.technical_stats.crew_morale >= 85) {
            return {result: '<p>Morale is already sky-high. No need for another party!</p>', wasSuccessful: false};
        } else {
            if (boozeUsed > this.inventory.find(item => item.item === 'space rum').amount) {
                this.technical_stats.crew_morale -= Math.ceil(Math.random() * (20 - 10) + 10);
                if (this.technical_stats.crew_morale < 0) {
                    this.technical_stats.crew_morale = 0;
                }
                return  {result: '<p>Not enough booze to party... Morale drops even lower</p>', wasSuccessful: false};
            } else {
                this.technical_stats.crew_morale += Math.ceil(Math.random() * (30 - 15) + 15);
                this.inventory.find(item => item.item === 'space rum').amount -= boozeUsed;
                
                if (this.technical_stats.crew_morale > 100) {
                    this.technical_stats.crew_morale = 100;
                }
                let result = '';
                result += '<p>Whoo! hey DJ, turn that music up!</p>';
                result += this.crew[Math.floor(Math.random() * this.crew.length)].drunken_message;
                
                return {result: result, wasSuccessful: true};
            }
        } 
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
    },
    
    calculateSpeed: function() {
       const maxSpeed = 120000;
       this.technical_stats.speed_mph = maxSpeed * (this.technical_stats.hull_integrity / 100) * (this.technical_stats.fuel_level / 100); 
    },

    setEngineState: function() {
        const randomIndex = Math.floor(Math.random() * engineStates.length);
        this.technical_stats.engine_state = engineStates[randomIndex].state;
    },

    init: function() {
        this.calculateSpeed();
        this.setEngineState();
    }
}

starship.init();
