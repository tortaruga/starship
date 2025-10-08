const menuBtn = document.getElementById('menu-button');
const navMenu = document.querySelector('.collapsible-nav');

menuBtn.addEventListener('click', handleNavMenu);

function handleNavMenu() {
    navMenu.classList.toggle('hide');
}