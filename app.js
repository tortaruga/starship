import { starship } from "./starship.js"; 
import "./currentStatus.js";
import "./navLogic.js";
import "./centerPanel.js";
import './bottomBar.js'; 

const commandInput = document.getElementById('command-line');
const consoleScreen = document.querySelector('.console');

commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = commandInput.value;
        handleCommand(command);
    }
})

function handleCommand(command) {
    const normalizedCommand = command.trim().toLowerCase().replaceAll('"', '');

    if (normalizedCommand === 'help') {
        help();
        return;
    }

    if (normalizedCommand === 'greet crew') {
        // 
        consoleScreen.innerHTML += starship.greetCrew();
        return;
    }

    if (normalizedCommand === 'check vitals') {
        // 
        consoleScreen.innerHTML += starship.checkStats();
        return;
    }

    if (normalizedCommand === 'roam ship') {
        // 
        roamShip();
        return;
    }

    if (normalizedCommand === 'random mission') {
        randomMission();
        return;
    }

    if (normalizedCommand === 'throw party') {
        throwParty();
        return;
    }

    consoleScreen.innerHTML += 'Invalid command. Check spelling or type "help"';
}

function help() {
    document.querySelector('.console').innerHTML += `<ul class="command-list">
                        <li>type one of these commands:</li>
                        <li>- greet crew</li>
                        <li>- check vitals</li>
                        <li>- random mission</li>
                        <li>- roam ship</li>
                        <li>- throw party</li>
                    </ul>`;
}

function roamShip() {
    const randomRoom = starship.ship_rooms[Math.ceil(Math.random() * starship.ship_rooms.length)];
    consoleScreen.innerHTML += `<p>${randomRoom.goTo()}</p>`;
}

function randomMission() {
    const missionsArr = Object.keys(starship.missions);
    consoleScreen.innerHTML += starship.missions[missionsArr[Math.ceil(Math.random() * missionsArr.length)]].outcome(starship);   
}

function throwParty() {
    const party = starship.throwParty();
    if (party.wasSuccessful) {
        setTimeout(() => {
            consoleScreen.innerHTML += '<p>🎉 The crew throws a wild party! Morale is up!</p>';
        }, 1000);
    } 

    consoleScreen.innerHTML += party.result;
}