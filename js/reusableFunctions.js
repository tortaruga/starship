import { soundToggle, consoleScreen } from "./constants/DOMvars.js";
import { notificationSound } from "./constants/audios.js";

export function isSoundOn() {
  return soundToggle.checked;
} 

export function updateItemAmount(item, ship) {
  document.getElementById(`${item.item}`).innerHTML = 'amount: ' + `<span>${ship.inventory.find(el => el.item === item.item).amount}</span>`;
}

export function createWrapper(content, parent) {
   const wrapper = document.createElement('div');
   wrapper.classList.add('wrapper-div');
   parent.appendChild(wrapper);
   wrapper.innerHTML = content;
}

export function randomColorClass() {
  const colorClasses = [ 'green', 'pink', 'yellow', 'orange'];
  const randomIndex = Math.floor(Math.random() * colorClasses.length);
  return colorClasses[randomIndex];
}


export function handleNegativeLevel(stat) {
  if (stat < 0) stat = 0;
  return stat;
}

const maxMessages = 10;

export function handleMessages() {
    while (consoleScreen.children.length >= maxMessages) {
    consoleScreen.removeChild(consoleScreen.firstChild);
  }
  // Scroll to bottom 
  consoleScreen.scrollTop = consoleScreen.scrollHeight;    
  if (isSoundOn()) notificationSound.play();
 
}
