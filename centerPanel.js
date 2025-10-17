import missions from "./missions.js";
import { starship } from "./starship.js"; 
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

// cargo
// li > div.cargo-item-container > p.cargo-item, p.cargo-item-desc

function populateCargoList() {
    starship.inventory.forEach(item => createCargoItem(item));
}

function createCargoItem(item) {
    const li = document.createElement('li');
    document.getElementById('cargo-list').appendChild(li);
    const div = document.createElement('div');
    div.classList.add('cargo-item-container');
    li.appendChild(div); 
    const itemP = document.createElement('p');

    let text;
    if (item.amount === '-') {
        text = `${item.item}`;
    } else {
        text = `${item.item} - <span>${item.amount}</span>`
    }

    itemP.innerHTML = text; 
    div.appendChild(itemP);
    const descP = document.createElement('p');
    descP.textContent = item.description;
    div.appendChild(descP);
}

populateCargoList();

// rooms

function createRoomButton(id) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = id + ' >';
    button.setAttribute('id', id.toLowerCase().replaceAll(' ', ''));
    button.addEventListener('click', () => showRoomCard(id));
    li.appendChild(button);
    document.querySelector('#room-list').appendChild(li);
}

function populateRoomList() {
    starship.ship_rooms.forEach(room => createRoomButton(room.name)); 
}

populateRoomList();

function showRoomCard(id) {
    document.getElementById('room-list').classList.add('hide');
    document.getElementById('room-card').classList.remove('hide');
    populateRoomCard(id);
}  

function populateRoomCard(id) {
    document.querySelector('.room-name').textContent = `name: ${starship.ship_rooms.find(room => room.name === id).name}`;
    document.querySelector('.room-description').textContent = `${starship.ship_rooms.find(room => room.name === id).description}`;

    document.getElementById('go-to-button').addEventListener('click', () => {
        document.getElementById('room-message').textContent = starship.ship_rooms.find(room => room.name === id).goTo();
    }) 
}
 
document.getElementById('back-to-room-list').addEventListener('click', () => {
    document.getElementById('room-list').classList.remove('hide');
    document.getElementById('room-card').classList.add('hide');
    document.getElementById('room-message').textContent = ''; 
})
 
// locations 
function populateLocationList() {
    starship.locations.forEach(location => createLocationElement(location))
}
function createLocationElement(location) {
    const li = document.createElement('li');
    document.getElementById('location-list').appendChild(li);
    const div = document.createElement('div');
    li.appendChild(div);
    const name = document.createElement('p');
    name.textContent = location.name;
    div.appendChild(name);
    const desc = document.createElement('p');
    desc.textContent = location.description;
    div.appendChild(desc);
}

populateLocationList();

// missions


function createMissionButton(id) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = id + ' >';
    button.setAttribute('id', id.toLowerCase().replaceAll(' ', ''));
    button.addEventListener('click', () => showMissionCard(id));
    li.appendChild(button);
    document.querySelector('#mission-list').appendChild(li);
}

function populateMissionList() {
    Object.keys(starship.missions).forEach(mission => createMissionButton(mission));
}

populateMissionList();

function showMissionCard(id) {
    document.getElementById('mission-list').classList.add('hide');
    document.getElementById('mission-card').classList.remove('hide');
    populateMissionCard(id);
}  

function populateMissionCard(id) {
    document.querySelector('.mission-objective').textContent = `objective: ${starship.missions[id].objective}`;
    document.querySelector('.mission-location').textContent = `location: ${starship.missions[id].location}`;

    // document.getElementById('go-to-button').addEventListener('click', () => {
    //     document.getElementById('room-message').textContent = starship.ship_rooms.find(room => room.name === id).goTo();
    // }) 
}
 
document.getElementById('back-to-mission-list').addEventListener('click', () => {
    document.getElementById('mission-list').classList.remove('hide');
    document.getElementById('mission-card').classList.add('hide');
    // document.getElementById('mission-message').textContent = ''; 
})
