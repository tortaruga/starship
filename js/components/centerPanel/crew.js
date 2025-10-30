import { starship } from "../../constants/starship.js";

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

