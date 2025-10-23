import { updateStats } from "./functions.js";
import { starship } from "./starship.js";
const commandInput = document.getElementById('command-line');
const consoleScreen = document.querySelector('.console');

commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = commandInput.value;
        handleCommand(command);
        commandInput.value = '';
    }
})

function handleCommand(command) {
    const normalizedCommand = command.trim().toLowerCase().replaceAll('"', '');

    if (normalizedCommand === '') return;

    if (normalizedCommand === 'help') {
        help();
        consoleScreen.scrollTop = consoleScreen.scrollHeight; 
        return;
    }

    if (normalizedCommand === 'greet crew') {
        // 
        consoleScreen.innerHTML += starship.greetCrew();
        
        consoleScreen.scrollTop = consoleScreen.scrollHeight; 
        return;
    }

    if (normalizedCommand === 'check vitals') {
        // 
        consoleScreen.innerHTML += starship.checkStats();
        
        consoleScreen.scrollTop = consoleScreen.scrollHeight; 
        return;
    }

    if (normalizedCommand === 'roam ship') {
        // 
        roamShip();
        
        consoleScreen.scrollTop = consoleScreen.scrollHeight; 
        return;
    }

    if (normalizedCommand === 'random mission') {
        randomMission();
        
        consoleScreen.scrollTop = consoleScreen.scrollHeight; 
        return;
    }

    if (normalizedCommand === 'throw party') {
        throwParty();
        
        consoleScreen.scrollTop = consoleScreen.scrollHeight; 
        return;
    }

    consoleScreen.innerHTML += '<p>Invalid command. Check spelling or type "help"</p>';
    consoleScreen.scrollTop = consoleScreen.scrollHeight; 
    
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
    const wrapper = document.createElement('div');
    wrapper.innerHTML = starship.missions[missionsArr[Math.floor(Math.random() * missionsArr.length)]].outcome(starship);
    consoleScreen.appendChild(wrapper);
}

function throwParty() {
    const party = starship.throwParty();
    if (party.wasSuccessful) {
        setTimeout(() => {
            consoleScreen.innerHTML += '<p>🎉 The crew throws a wild party! Morale is up!</p>';
        }, 1000);
    } 

    updateStats(starship);
    consoleScreen.innerHTML += party.result;
}