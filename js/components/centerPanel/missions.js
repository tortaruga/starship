import { starship } from "../../constants/starship.js";
import { createWrapper, isSoundOn, handleMessages } from "../../reusableFunctions.js";

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
        if (result.police  && isSoundOn()) laserGun.play();
        if (result.fight  && isSoundOn()) gunFight.play(); 
         
    }
}
 
document.getElementById('back-to-mission-list').addEventListener('click', () => {
    document.getElementById('mission-list').classList.remove('hide');
    document.getElementById('mission-card').classList.add('hide');
    document.getElementById('mission-message').textContent = ''; 
})
