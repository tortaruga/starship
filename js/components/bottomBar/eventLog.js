import { events } from "../../constants/spaceshipStates.js"; 


function showEvent() {
    const randomIndex = Math.floor(Math.random() * events.length);
    document.getElementById('event-log-message').innerHTML = events[randomIndex];
}

// display new random event every 1.2 min
const intervalTime = 1000 * 60 * 1.2;
setInterval(showEvent, intervalTime);

showEvent();

