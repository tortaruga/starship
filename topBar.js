const discoSwitch = document.getElementById('disco-switch');

const navBtns = document.querySelectorAll('.left-sidebar li, .collapsible-nav li');
const discoBeat = new Audio('./assets/disco-beat.wav'); 

discoSwitch.addEventListener('click', handleDisco);




function handleDisco() {
    document.querySelector('.center-panel').classList.remove('disco');  
    document.querySelector('.bottom-bar').classList.remove('disco'); 
    navBtns.forEach(btn => btn.classList.remove('disco'));
    document.querySelector('.instructions p').classList.remove('disco');
    
    document.querySelector('.center-panel').offsetWidth;

    document.querySelector('.center-panel').classList.add('disco'); 
    document.querySelector('.bottom-bar').classList.add('disco');  
    document.querySelector('.instructions p').classList.add('disco');

    navBtns.forEach(btn => btn.classList.add('disco'));
    discoBeat.play();

}
 