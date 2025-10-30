import './components/topBar/currentStatus.js';
import './components/topBar/discoSwitch.js'; 
import './components/navBar.js';
import './components/centerPanel/genericInfo.js';
import './components/centerPanel/crew.js';
import './components/centerPanel/cargo.js';
import './components/centerPanel/rooms.js';
import './components/centerPanel/locations.js';
import './components/centerPanel/missions.js';
import './components/centerPanel/shipSystems.js';
import './components/bottomBar/eventLog.js';
import './components/bottomBar/pianoCorner/playKeys.js';
import './components/bottomBar/pianoCorner/playTunes.js';
import './components/commandConsole.js';
import './inputFocus.js';

import { updateStats } from './components/centerPanel/shipSystems.js'; 
import { starship } from './constants/starship.js';

updateStats(starship);


// hide content until it has fully loaded to avoid flashing unstyled content
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('loading');
});
