import { engineStates } from "./engineStates.js";

export function updateStats(ship) {

    createBarVisualizer(ship.technical_stats.fuel_level, document.querySelector('.fuel-visualizer'));
    createBarVisualizer(ship.technical_stats.shield_strength, document.querySelector('.shields-visualizer'));
    createBarVisualizer(ship.technical_stats.hull_integrity, document.querySelector('.hull-visualizer'));

    createLevelVisualizer(ship.technical_stats.crew_morale, 'morale-visualizer');
    createLevelVisualizer(ship.technical_stats.ammo_levels, 'ammo-visualizer');  
    ship.calculateSpeed();
    populateStats(ship);
}

function populateStats(ship) {
    document.querySelector('.stats-speed').innerHTML = `speed: <span>${ship.technical_stats.speed_mph} mph</span>`;
    const stateCode = engineStates.find(state => state.state === ship.technical_stats.engine_state).severity; 
    document.querySelector('.stats-engine').innerHTML = `engine state: <span class="${stateCode}">${ship.technical_stats.engine_state}</span>`;
}

// visulizers 
export function createBarVisualizer(value, element) {
  const completeBars = Math.trunc(value / 10);
  const incompleteBars = value % 10;

  if (element.children.length === 0) {
    for (let i = 0; i < 10; i++) {
      const span = document.createElement('span');
      span.classList.add('bar');
      element.appendChild(span);
    }
  }

  for (let i = 0; i < 10; i++) {
    const span = element.children[i];
    span.classList.remove('complete');
    span.style.setProperty('--fill', '0%');

    if (i < completeBars) {
      span.classList.add('complete');
      span.style.setProperty('--fill', '100%');
    } else if (i === completeBars && incompleteBars > 0) {
      updateBarFill(span, incompleteBars * 10);
    }
  }
  
  element.setAttribute('aria-valuenow', value);
}

function updateBarFill(span, targetPercent) {
  const current = parseFloat(span.style.getPropertyValue('--fill')) || 0;
  const step = (targetPercent - current) / 10;
  let progress = current;

  const interval = setInterval(() => {
    progress += step;
    span.style.setProperty('--fill', `${progress}%`);

    if ((step > 0 && progress >= targetPercent) || (step < 0 && progress <= targetPercent)) {
      span.style.setProperty('--fill', `${targetPercent}%`);
      clearInterval(interval);
    }
  }, 30);
}
 
function createLevelVisualizer(value, element) {
    const el =  document.querySelector(`.${element} .inner-level`);
    if (value < 0) value = 0;
    el.style.width = `${value}%`; 
    el.setAttribute('aria-valuenow', value); 
}

export function handleNegativeLevel(stat) {
  if (stat < 0) stat = 0;
  return stat;
}


export function randomColorClass() {
  const colorClasses = [ 'green', 'pink', 'yellow', 'orange'];
  const randomIndex = Math.floor(Math.random() * colorClasses.length);
  return colorClasses[randomIndex];
}


const soundToggle = document.querySelector('.switch input');

export function isSoundOn() {
  return soundToggle.checked;
}