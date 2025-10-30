import { tuneBtns, pianoBtn, pianoKeys, infoBtn } from "../../../constants/DOMvars.js";
import { isSoundOn } from "../../../reusableFunctions.js";

const tunes = {
  sadTune: {
    audio: new Audio('./assets/piano-tunes/sad-piano.mp3'), 
    path: '/assets/piano-tunes/sad-piano.mp3',
    title: 'a mysterious past',
    info: 'What\'s his real name? Where does he come from? Where did he learn all the nonsense he continually spouts? And why does he play such heart-wrenching tunes when the ship feels particularly silent?',
    func: animateRandomKey,
    funcParam: null,
    credits: '<a href="https://pixabay.com/users/grand_project-19033897/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=399917">Grand_Project</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=399917">Pixabay</a>'
  },

  madTune: {
    audio: new Audio('./assets/piano-tunes/mad-piano.mp3'),
    path: '/assets/piano-tunes/mad-piano.mp3',
    title: 'runaways',
    info: 'Joyously played while running away from justice, with laser guns blasting around, the crew shouting profanities, and the Captain piloting even worse than usual, if possible.',
    func: animateMultipleKeys,
    funcParam: Math.floor(Math.random() * 3) + 1,
    credits: '<a href="https://freesound.org/s/274218/" target="_blank">Maniacal Piano Loop by Sirkoto51</a> -- License: Attribution 4.0',
  },

  detunedTune: {
    audio: new Audio('./assets/piano-tunes/detuned-piano.wav'),
    path: '/assets/piano-tunes/detuned-piano.wav',
    title: 'are you bleeding?',
    info: 'It\'s just possible that he just collapsed on the keys after suffering a wound.',
    func: animateMultipleKeys,
    funcParam: Math.floor(Math.random() * 4) + 2,
    credits: '<a href="https://freesound.org/s/449798/" target="_blank">Detuned_Piano_Weird_Melody_Loop_1.wav by RutgerMuller</a> -- License: Creative Commons 0',
  },

  dramaticTune: {
    audio: new Audio('./assets/piano-tunes/dramatic-piano.wav'),
    path: '/assets/piano-tunes/dramatic-piano.wav',
    title: 'now, really?',
    info: 'Usually played at the worst possible times.',
    func: animateRandomKey,
    funcParam: null,
    credits: '<a href="https://freesound.org/s/515380/" target="_blank">Piano Loop #1 by danlucaz</a> -- License: Creative Commons 0',
  },

  virtuosoTune: {
    audio: new Audio('./assets/piano-tunes/virtuoso-piano.wav'),
    path: '/assets/piano-tunes/virtuoso-piano.wav',
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
    document.querySelector('#piano-btn img').setAttribute('src', './assets/icons/play.svg');
  };

  selectedTune = tunes[`${btn.id}Tune`].audio;
  document.querySelector('.track-title span').innerHTML = 'track: ' + tunes[`${btn.id}Tune`].title;
  btn.classList.add('active');
})) 
 
pianoBtn.addEventListener('click', () => {
     
    if (selectedTune.paused) { 
        if (isSoundOn()) {
          selectedTune.play();
          document.querySelector('#piano-btn img').setAttribute('src', './assets/icons/pause.svg');
        } else {
          alert('Turn on sound in settings!');
        }
    } else {
        selectedTune.pause();
        document.querySelector('#piano-btn img').setAttribute('src', './assets/icons/play.svg');
    }
})

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
    document.querySelector('#piano-btn img').setAttribute('src', './assets/icons/play.svg');
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
