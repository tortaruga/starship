const currentStatusOptions = [
  "Drifting near asteroid belt",
  "Peacefully floating into darkness",
  "Just barely avoiding collision with supernovas",
  "Losing speed, Grease do something about it, thx",
  "Passing through Enchanted Nebula",
  "Fleeing from angry thugs we sold fake artifacts to",
  "Hiding from Space Financial Police",
  "Right engine about to fail",
  "Hit a random rock, sorry about that",
  "Floating next to Laika the space dog, guys, say hi!",
  "Taking scenic route even though we're being chased by rival pirates",
  "High speed chase with some criminals who tried to steal our cargo",
  "Narrowingly escaping from Interstellar Police",
  "Stealthily avoiding encounter with the Cosmic Cops",
  "All good, for once",
  "Caught in a Space Storm",
  "Warp mode: active",
  "Cruise mode: active",
  "Combat mode: active",
  "Stealth mode: active",
];

const currentStatusSpan = document.querySelector('.current-status span');

function setCurrentStatus() {
    const randomIndex = Math.floor(Math.random() * currentStatusOptions.length);
    currentStatusSpan.textContent = `current status: ${currentStatusOptions[randomIndex]}`;
    handleStatusAnimationStep(currentStatusSpan.textContent);
}

setCurrentStatus();
const statusIntervalTime = 1000 * 60 * 3;
setInterval(setCurrentStatus, statusIntervalTime);  

function handleStatusAnimationStep(string) {
    const messageLength = string.length;
    const stepValue = messageLength / 1.2;   
    currentStatusSpan.style.animationTimingFunction = `steps(${stepValue})`;
} 
