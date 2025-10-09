// event log

const events = [
    'Purple goo detected in Medbay',
    'Space weather report: Solar flares',
    'Space weather report: ion storms',
    'Alert: space anomalies',
    'Alert: gravitational well',
    'Minor fire flaring up in engine room (again)',
    'Reminder: it\'s Byte\'s turn to do the dishes',
    'Alert: spacedust storm incoming',
    'Space weather report: diamond rain expected on Planet Base',
    'Traffic report: an accident caused a 60km queue near Kora Gamma',
    'Traffic report: heavy traffic on Rocky Highway',
];

const intervalTime = 1000 * 60 * 2;

function showEvent() {
    const randomIndex = Math.floor(Math.random() * events.length);
    document.getElementById('event-log-message').textContent = events[randomIndex];
}

setInterval(showEvent, intervalTime);

showEvent();

// doc's piano corner

const pianoBtn = document.getElementById('piano-btn');
const pianoMelody = new Audio('./assets/piano.mp3');

pianoBtn.addEventListener('click', () => {
    if (pianoMelody.paused) {
        pianoMelody.play();
    } else {
        pianoMelody.pause();
    }
})