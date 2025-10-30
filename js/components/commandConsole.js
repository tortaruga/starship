import { createWrapper, randomColorClass, isSoundOn } from "../reusableFunctions.js";
import { updateStats } from "./centerPanel/shipSystems.js";
import { starship } from "../constants/starship.js";
import { coinNotification, gunFight, laserGun } from "../constants/audios.js";
import { commandInput, consoleScreen } from "../constants/DOMvars.js";
import { handleMessages } from "../reusableFunctions.js";


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
        handleMessages(); 
        return;
    }

    if (normalizedCommand === 'greet crew') {
        createWrapper(starship.greetCrew(), consoleScreen);
        handleMessages(); 
        return;
    }

    if (normalizedCommand === 'check vitals') {
        createWrapper(starship.checkStats(), consoleScreen); 
        handleMessages();
        return;
    }

    if (normalizedCommand === 'roam ship') {
        roamShip();
        handleMessages();
        return;
    }

    if (normalizedCommand === 'random mission') {
        randomMission();
        
        handleMessages();
        return;
    }

    if (normalizedCommand === 'throw party') {
        throwParty();
        
        handleMessages();
        return;
    }

    createWrapper('<p>Invalid command. Check spelling or type "help"</p>', consoleScreen);
    handleMessages();
    
}

function help() {
    const content = `<ul class="command-list">
                        <li>type one of these commands:</li>
                        <li>- greet crew</li>
                        <li>- check vitals</li>
                        <li>- random mission</li>
                        <li>- roam ship</li>
                        <li>- throw party</li>
                    </ul>`;
    createWrapper(content, consoleScreen);
}

function roamShip() {
    const randomRoom = starship.ship_rooms[Math.ceil(Math.random() * starship.ship_rooms.length)];
    createWrapper(`<p class="${randomColorClass()}">${randomRoom.goTo()}</p>`, consoleScreen);
}

function randomMission() {
    const missionsArr = Object.keys(starship.missions);
    const randomMission = starship.missions[missionsArr[Math.floor(Math.random() * missionsArr.length)]].outcome(starship);
    createWrapper(randomMission.message, consoleScreen); 

    if (randomMission.earnedMoney && isSoundOn()) coinNotification.play();
    if (randomMission.police && isSoundOn()) laserGun.play();
    if (randomMission.fight && isSoundOn()) gunFight.play();
}

function throwParty() {
    const party = starship.throwParty();

    if (party.wasSuccessful) {
        setTimeout(() => {
            createWrapper(`<p><span class="emoji">🎉</span> The crew throws a wild party! Morale is up!</p> <p class="${randomColorClass()}">Crew morale: ${starship.technical_stats.crew_morale}%</p>`, consoleScreen);
            handleMessages();
        }, 1000);
    } 

    updateStats(starship);
    createWrapper(party.result, consoleScreen);
}


