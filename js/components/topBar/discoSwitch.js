import { isSoundOn } from "../../reusableFunctions.js"; 
import { bottomBar, centerPanel, consoleInstructions, discoSwitch, navBtnsLi } from "../../constants/DOMvars.js";
import { discoBeat } from "../../constants/audios.js";

discoSwitch.addEventListener('click', handleDisco);

function handleDisco() {
    discoBeat.paused ? discoOn() : discoOff();
}

function discoOn() {
    // remove animation class to add it again 
    removeAnimationClass();
    
    centerPanel.offsetWidth; // trigger reflow 

    addAnimationClass();

    if (isSoundOn()) {
        discoBeat.play()
    } else {
        alert ('Turn on sound effects in settings!')
    }   
}

function discoOff() {
    discoBeat.pause();
}

function addAnimationClass() {
    centerPanel.classList.add('disco');  
    bottomBar.classList.add('disco'); 
    navBtnsLi.forEach(btn => btn.classList.add('disco'));
    consoleInstructions.classList.add('disco');
}

function removeAnimationClass() {
    centerPanel.classList.remove('disco');  
    bottomBar.classList.remove('disco'); 
    navBtnsLi.forEach(btn => btn.classList.remove('disco'));
    consoleInstructions.classList.remove('disco');
}