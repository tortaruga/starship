// event log
import { isSoundOn } from "./functions.js";

const events = [
    'Purple goo detected in Medbay <span class="emoji">🟣</span>',
    'Space weather report: Solar flares <span class="emoji">🕶️</span>',
    'Space weather report: ion storms <span class="emoji">⛈️</span>',
    'Alert: space anomalies <span class="emoji">🚨</span>',
    'Alert: gravitational well <span class="emoji">🌀</span>',
    'Minor fire flaring up in engine room (again) <span class="emoji">🧯</span>',
    'Reminder: it\'s Byte\'s turn to do the dishes <span class="emoji">🧼</span>',
    'Alert: spacedust storm incoming <span class="emoji">💨</span>',
    'Space weather report: diamond rain expected on Planet Base <span class="emoji">☔</span>',
    'Traffic report: an accident caused a 60km queue near Kora Gamma <span class="emoji">💥</span>',
    'Traffic report: heavy traffic on Rocky Highway <span class="emoji">🚥</span>',
];

const intervalTime = 1000 * 60 * 1.2;

function showEvent() {
    const randomIndex = Math.floor(Math.random() * events.length);
    document.getElementById('event-log-message').innerHTML = events[randomIndex];
}

setInterval(showEvent, intervalTime);

showEvent();

// doc's piano corner

const pianoBtn = document.getElementById('piano-btn');
const tuneBtns = document.querySelectorAll('.select-tune button');
const infoBtn = document.getElementById('info-btn');

const tunes = {
  sadTune: {
    audio: new Audio('./assets/sad-piano.mp3'), 
    path: '/assets/sad-piano.mp3',
    title: 'a mysterious past',
    info: 'What\'s his real name? Where does he come from? Where did he learn all the nonsense he continually spouts? And why does he play such heart-wrenching tunes when the ship feels particularly silent?',
    func: animateRandomKey,
    funcParam: null,
    credits: '<a href="https://pixabay.com/users/grand_project-19033897/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=399917">Grand_Project</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=399917">Pixabay</a>'
  },

  madTune: {
    audio: new Audio('./assets/mad-piano.mp3'),
    path: '/assets/mad-piano.mp3',
    title: 'runaways',
    info: 'Joyously played while running away from justice, with laser guns blasting around, the crew shouting profanities, and the Captain piloting even worse than usual, if possible.',
    func: animateMultipleKeys,
    funcParam: Math.floor(Math.random() * 3) + 1,
    credits: '<a href="https://freesound.org/s/274218/" target="_blank">Maniacal Piano Loop by Sirkoto51</a> -- License: Attribution 4.0',
  },

  detunedTune: {
    audio: new Audio('./assets/detuned-piano.wav'),
    path: '/assets/detuned-piano.wav',
    title: 'are you bleeding?',
    info: 'It\'s just possible that he just collapsed on the keys after suffering a wound.',
    func: animateMultipleKeys,
    funcParam: Math.floor(Math.random() * 4) + 2,
    credits: '<a href="https://freesound.org/s/449798/" target="_blank">Detuned_Piano_Weird_Melody_Loop_1.wav by RutgerMuller</a> -- License: Creative Commons 0',
  },

  dramaticTune: {
    audio: new Audio('./assets/dramatic-piano.wav'),
    path: '/assets/dramatic-piano.wav',
    title: 'now, really?',
    info: 'Usually played at the worst possible times.',
    func: animateRandomKey,
    funcParam: null,
    credits: '<a href="https://freesound.org/s/515380/" target="_blank">Piano Loop #1 by danlucaz</a> -- License: Creative Commons 0',
  },

  virtuosoTune: {
    audio: new Audio('./assets/virtuoso-piano.wav'),
    path: '/assets/virtuoso-piano.wav',
    title: 'just let us sleep',
    info: 'Played as loudly as possible, deep into the night, when the rest of the crew is trying to get some sleep.',
    func: animateMultipleKeys,
    funcParam: Math.floor(Math.random() * 4) + 1,
    credits: '<a href="https://freesound.org/s/621383/" target="_blank">The Devils Etude Piano Concerto - NOT mastered.wav by WelvynZPorterSamples</a>-- License: Creative Commons 0',
  },
}

let selectedTune = tunes.sadTune.audio;

tuneBtns.forEach(btn => btn.addEventListener('click', () => {
  closeModal();
  tuneBtns.forEach(btn => btn.classList.remove('active'));

  if (!selectedTune.paused) {
    selectedTune.pause();
    document.querySelector('#piano-btn img').setAttribute('src', './assets/play.svg');
  };

  selectedTune = tunes[`${btn.id}Tune`].audio;
  document.querySelector('.track-title span').innerHTML = 'track: ' + tunes[`${btn.id}Tune`].title;
  btn.classList.add('active');
})) 
 
pianoBtn.addEventListener('click', () => {
     
    if (selectedTune.paused) { 
        if (isSoundOn()) {
          selectedTune.play();
          document.querySelector('#piano-btn img').setAttribute('src', './assets/pause.svg');
        } else {
          alert('Turn on sound in settings!');
        }
    } else {
        selectedTune.pause();
        document.querySelector('#piano-btn img').setAttribute('src', './assets/play.svg');
    }
})

const pianoKeys = document.querySelectorAll('.piano span');
let animationInterval = null;

function animateMultipleKeys(count = 2) {
  const indices = new Set();

  // Ensure unique random indices
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * pianoKeys.length));
  }

  indices.forEach(index => {
    const key = pianoKeys[index];
    key.classList.add('animate');

    key.addEventListener('animationend', () => {
      key.classList.remove('animate');
    }, { once: true });
  });
}


function animateRandomKey() {
  const randomIndex = Math.floor(Math.random() * pianoKeys.length);
  const key = pianoKeys[randomIndex];
 
  key.classList.add('animate');

  // Remove the class after animation ends to allow re-triggering
  key.addEventListener('animationend', () => {
    key.classList.remove('animate');
  }, { once: true });
}

function startAnimatingKeys(func) {
  if (animationInterval) return;
  animationInterval = setInterval(func, 300); // adjust speed here
}

function stopAnimatingKeys() { 
  clearInterval(animationInterval);
  animationInterval = null;
}

Object.values(tunes).forEach(tune => {
  tune.audio.addEventListener('play', () => startAnimatingKeys(() => tune.func(tune.funcParam)));  
  tune.audio.addEventListener('pause', stopAnimatingKeys);
  tune.audio.addEventListener('ended', () => {
    stopAnimatingKeys();
    document.querySelector('#piano-btn img').setAttribute('src', './assets/play.svg');
  });
});


infoBtn.addEventListener('click', showTrackInfo);

function showTrackInfo() {
  document.querySelector('.track-credits-modal').classList.remove('hide');

  const currentTune = Object.entries(tunes).find(tune => selectedTune.src.includes(tune[1].path));
  document.querySelector('.credits').innerHTML = currentTune[1].credits; 
  document.querySelector('.track-info').innerHTML = currentTune[1].info; 
  
} 

function closeModal() {
  document.querySelector('.track-credits-modal').classList.add('hide');
}

document.querySelector('.track-credits-modal .close').addEventListener('click', closeModal);

const keyAudios = {
  a: './assets/piano-a.mp3', 
  b: './assets/piano-b.mp3',
  c: './assets/piano-c.mp3',
  d: './assets/piano-d.mp3',
  e: './assets/piano-e.mp3',
  f: './assets/piano-f.mp3',
  g: './assets/piano-g.mp3',
  'd-flat': './assets/piano-db.mp3',
  'e-flat': './assets/piano-eb.mp3',
  'g-flat': './assets/piano-gb.mp3',
  'a-flat': './assets/piano-ab.mp3',
  'b-flat': './assets/piano-bb.mp3', 
}  

pianoKeys.forEach(key => key.addEventListener('click', (e) => {
  // check id
  const id = e.target.id;
  if (isSoundOn()) new Audio(keyAudios[id]).play();  
}))