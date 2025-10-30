// remove outline from input when clicked but retain it when navigating through keyboard

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