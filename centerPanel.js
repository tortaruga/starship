import { createWrapper, handleMessages } from "./commandConsole.js";
import { updateStats } from "./functions.js";
import { starship } from "./starship.js"; 
// populate center panel 
  // generic

function populateGenericInfoPanel() {
    document.getElementById('starship-name').innerHTML = `name: <span>${starship.name}</span>`;
    document.getElementById('starship-model').innerHTML = `model: <span>${starship.model}</span>`;
    document.getElementById('starship-description').innerHTML = `${starship.description}`;
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
    document.querySelector('.member-name').innerHTML = `name: <span>${starship.crew.find(member => member.name === id).name}</span>`;
    document.querySelector('.member-role').innerHTML = `role: <span>${starship.crew.find(member => member.name === id).role}</span>`;
    document.querySelector('.member-description').innerHTML = `${starship.crew.find(member => member.name === id).description}`;

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

updateStats(starship); 

// document.querySelectorAll('[data-label="ship-systems"]').forEach(btn => {
//     btn.addEventListener('click', () => updateStats(starship));
// });

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

    const itemName = document.createElement('p');
    itemName.classList.add('item-name');
    
    itemName.innerHTML = `${item.item}`; 
    div.appendChild(itemName);

    if (item.amount) {
        const amount = document.createElement('p');
        amount.classList.add('item-amount');
        amount.setAttribute('id', item.item);
        amount.innerHTML = `amount: <span>${item.amount}</span>`;
        div.appendChild(amount);
    } 

    if (item.tag) {
        const tag = document.createElement('span');
        tag.classList.add('item-tag');
        tag.textContent = item.tag;
        itemName.appendChild(tag); 
    }
 
    const descP = document.createElement('p');
    descP.textContent = item.description;
    descP.classList.add('item-desc')
    div.appendChild(descP);
}

populateCargoList();

export function updateItemAmount(item, ship) {
    document.getElementById(`${item.item}`).textContent = ship.inventory.find(el => el.item === item.item).amount;
}

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
    document.querySelector('.room-name').innerHTML = `name: <span>${starship.ship_rooms.find(room => room.name === id).name}</span>`;
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
    name.classList.add('location-name');
    div.appendChild(name);
    const desc = document.createElement('p');
    desc.textContent = location.description;
    desc.classList.add('location-desc');
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

const goMissionBtn = document.querySelector('#go-mission-button');

function populateMissionCard(id) {
    document.querySelector('.mission-objective').innerHTML = `objective: <span>${starship.missions[id].objective}</span>`;
    document.querySelector('.mission-location').innerHTML = `location: <span>${starship.missions[id].location}</span>`;
 
    goMissionBtn.onclick = () => {
        document.getElementById('mission-message').innerHTML = 'check console for mission report.';
        const consoleScreen = document.querySelector('.console');
        
        const result = starship.missions[id].outcome(starship); 
        createWrapper(result.message, consoleScreen);

        handleMessages();

        const coinNotification = new Audio('./assets/sound-effects/coins.wav');
       
        if (result.earnedMoney && isSoundOn()) coinNotification.play();
        const laserGun = new Audio('./assets/sound-effects/laser-gun.wav');
        const gunFight = new Audio('./assets/sound-effects/gun-fight.wav');
        if (randomMission.police  && isSoundOn()) laserGun.play();
        if (randomMission.fight  && isSoundOn()) gunFight.play(); 
         
    }
}
 
document.getElementById('back-to-mission-list').addEventListener('click', () => {
    document.getElementById('mission-list').classList.remove('hide');
    document.getElementById('mission-card').classList.add('hide');
    document.getElementById('mission-message').textContent = ''; 
})
