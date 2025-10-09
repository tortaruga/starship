const menuBtn = document.getElementById('menu-button');
const navMenu = document.querySelector('.collapsible-nav');

// handle responsive layout
menuBtn.addEventListener('click', handleNavMenu);

function handleNavMenu() {
    navMenu.classList.toggle('hide');
}

// add functionality to nav buttons
const navBtns = document.querySelectorAll('.nav-btn');

navBtns.forEach(btn => btn.addEventListener('click', (e) => showSelectedContent(e.target.dataset.label)));

function showSelectedContent(selected) {
    // grab all center-panel-content elements
    // give all of them the class hide
    // remove the class hide from the content matching selected id
    document.querySelectorAll('.center-panel-content').forEach(div => div.classList.add('hide'));
    document.getElementById(`${selected}-info`).classList.remove('hide');
}

showSelectedContent('generic'); // show generic by default
