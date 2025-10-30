import { menuBtn, navMenu, navBtns } from "../constants/DOMvars.js"; 

// show / hide mobile menu
menuBtn.addEventListener('click', handleNavMenu);

function handleNavMenu() {
    navMenu.classList.toggle('hide');
}

// add functionality to nav buttons
navBtns.forEach(btn => btn.addEventListener('click', (e) => showSelectedContent(e.target.dataset.label)));

function showSelectedContent(selected) {
    // grab all center-panel-content elements
    // give all of them the class hide
    document.querySelectorAll('.center-panel-content').forEach(div => div.classList.add('hide'));
    
    // remove the class hide from the content matching selected id
    document.getElementById(`${selected}-info`).classList.remove('hide');
}

showSelectedContent('generic'); // show generic by default
