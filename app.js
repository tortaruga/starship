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


class ShipRoom {
    constructor({name, description, action}) {
        this.name = name;
        this.description = description;
        this.action = action;
    }

    goTo() { 
        console.log(`You're in the ${this.name}. ${this.action}`);
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

const currentStatusOptions = [
  "Drifting near asteroid belt",
  "Peacefully floating into darkness",
  "Just barely avoiding collision with supernovas",
  "Losing speed, Grease do something about it, thx",
  "Passing through Enchanted Nebula",
  "Fleeing from angry thugs we sold fake artifacts to",
  "Hiding from Space Financial Police",
  "Right engine about to fail",
  "Hit a random rock, sorry about that",
  "Floating next to Laika the space dog, guys, say hi!",
  "Taking scenic route even though we're being chased by rival pirates",
  "High speed chase with some criminals who tried to steal our cargo",
  "Narrowingly escaping from Interstellar Police",
  "Stealthily avoiding encounter with the Cosmic Cops",
  "All good, for once",
  "Caught in a Space Storm",
];


const currentStatusSpan = document.querySelector('.current-status span');

function setCurrentStatus() {
    const randomIndex = Math.floor(Math.random() * currentStatusOptions.length);
    currentStatusSpan.textContent = `current status: ${currentStatusOptions[randomIndex]}`;
    handleStatusAnimationStep(currentStatusSpan.textContent);

}

setCurrentStatus();
const statusIntervalTime = 1000 * 60 * 3;
setInterval(setCurrentStatus, statusIntervalTime);  

function handleStatusAnimationStep(string) {
    const messageLength = string.length;
    const stepValue = messageLength / 1.2;   
    currentStatusSpan.style.animationTimingFunction = `steps(${stepValue})`;
} 

// add functionality to nav buttons
const navBtns = document.querySelectorAll('.nav-btn');

navBtns.forEach(btn => btn.addEventListener('click', (e) => showSelectedContent(e.target.dataset.label)));

function showSelectedContent(selected) {
    // grab all center-panel-content elements
    // give all of them the class hide
    // remove the class hide from the content matching selected id
    document.querySelectorAll('.center-panel-content').forEach(div => div.classList.add('hide'));
    document.getElementById(`${selected}-info`).classList.remove('hide');
}

showSelectedContent('generic'); // show generic by default

// populate center panel
  // generic
function populateGenericInfoPanel() {
    document.getElementById('starship-name').textContent = `name: ${starship.name}`;
    document.getElementById('starship-model').textContent = `model: ${starship.model}`;
    document.getElementById('starship-description').textContent = `${starship.description}`;
}

populateGenericInfoPanel();

  // crew

function createMemberButton(id) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = id + ' >';
    button.setAttribute('id', id.toLowerCase().replaceAll(' ', ''));
    button.addEventListener('click', () => showMemberCard(id));
    li.appendChild(button);
    document.querySelector('#crew-list').appendChild(li);
}

function populateCrewList() {
    starship.crew.forEach(member => createMemberButton(member.name)); 
}

populateCrewList();

function showMemberCard(id) {
    document.getElementById('crew-list').classList.add('hide');
    document.getElementById('member-card').classList.remove('hide');
    populateMemberCard(id);
}  

function populateMemberCard(id) {
    document.querySelector('.member-name').textContent = `name: ${starship.crew.find(member => member.name === id).name}`;
    document.querySelector('.member-role').textContent = `role: ${starship.crew.find(member => member.name === id).role}`;
    document.querySelector('.member-description').textContent = `${starship.crew.find(member => member.name === id).description}`;

    document.getElementById('talk-button').addEventListener('click', () => {
        document.getElementById('member-message').textContent = starship.crew.find(member => member.name === id).talk();
    }) 
}
 
document.getElementById('back-to-crew-list').addEventListener('click', () => {
    document.getElementById('crew-list').classList.remove('hide');
    document.getElementById('member-card').classList.add('hide');
    document.getElementById('member-message').textContent = ''; 
})

// engine state

function setEngineState() {
    const randomIndex = Math.floor(Math.random() * engineStates.length);
    return engineStates[randomIndex].state;
}

document.querySelector('[data-label="ship-systems"]').addEventListener('click', () => {
    starship.technical_stats.engine_state = setEngineState();
});

// ship systems

starship.calculateSpeed();

function populateStats() {
    document.querySelector('.stats-speed').textContent = 'speed: ' + starship.technical_stats.speed_mph + ' mph';
    document.querySelector('.stats-engine').textContent = 'engine state: ' + starship.technical_stats.engine_state;
}

populateStats();

// visulizers
function createBarVisualizer(value, element) {
    const completeBars = Math.trunc(value / 10);
    const incompleteBars = value % 10;

    for (let i = 0; i < 10; i++) {
        const span = document.createElement('span');
        span.classList.add('bar');

        if (i < completeBars) {
            span.classList.add('complete');
        }

        if ( i === completeBars) {
            span.style.background = `linear-gradient(to right, blueviolet ${incompleteBars * 10}%, black ${incompleteBars * 10}%)`;
        }
         
        element.appendChild(span);
    }
}

 
function createLevelVisualizer(value, element) {
    document.querySelector(`.${element} .inner-level`).style.width = `${value}%`;
}

createBarVisualizer(starship.technical_stats.fuel_level, document.querySelector('.fuel-visualizer'));
createBarVisualizer(starship.technical_stats.shield_strength, document.querySelector('.shields-visualizer'));
createBarVisualizer(starship.technical_stats.hull_integrity, document.querySelector('.hull-visualizer'));

createLevelVisualizer(starship.technical_stats.crew_morale, 'morale-visualizer');
createLevelVisualizer(starship.technical_stats.ammo_levels, 'ammo-visualizer'); 