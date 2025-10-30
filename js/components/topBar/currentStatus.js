import { currentStatusOptions} from "../../constants/spaceshipStates.js";
import { currentStatusSpan } from "../../constants/DOMvars.js";

function setCurrentStatus() {
    const randomIndex = Math.floor(Math.random() * currentStatusOptions.length);
    currentStatusSpan.textContent = `current status: ${currentStatusOptions[randomIndex]}`;
    handleStatusAnimationStep(currentStatusSpan.textContent);
}

function handleStatusAnimationStep(string) {
    const messageLength = string.length;
    const stepValue = messageLength / 1.2;   
    currentStatusSpan.style.animationTimingFunction = `steps(${stepValue})`;
} 

setCurrentStatus();

// display a new random status every 1.5 minutes
const statusIntervalTime = 1000 * 60 * 1.5; 
setInterval(setCurrentStatus, statusIntervalTime);  
