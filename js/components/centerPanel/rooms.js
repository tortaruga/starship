import { starship } from "../../constants/starship.js";

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
