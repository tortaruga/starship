import "./currentStatus.js";
import "./navLogic.js";
import "./centerPanel.js";
import './bottomBar.js'; 
import './commandConsole.js'; 
import './topBar.js';


function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDownOnce);
    }
  }
 
  function handleMouseDownOnce() {
    document.body.classList.remove('keyboard-navigation');
    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
  }

  window.addEventListener('keydown', handleFirstTab);



window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('loading');
});
