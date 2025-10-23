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

const intervalTime = 1000 * 60 * 1.2;

function showEvent() {
    const randomIndex = Math.floor(Math.random() * events.length);
    document.getElementById('event-log-message').textContent = events[randomIndex];
}

setInterval(showEvent, intervalTime);

showEvent();

// doc's piano corner

const pianoBtn = document.getElementById('piano-btn');
const tuneBtns = document.querySelectorAll('.select-tune button');

const tunes = {
  sadTune: {
    audio: new Audio('./assets/sad-piano.mp3'), 
    title: 'a mysterious past',
    func: animateRandomKey,
    funcParam: null,
  },

  madTune: {
    audio: new Audio('./assets/mad-piano.mp3'),
    title: 'running from justice',
    func: animateMultipleKeys,
    funcParam: Math.floor(Math.random() * 3) + 1,
  },

  detunedTune: {
    audio: new Audio('./assets/detuned-piano.wav'),
    title: 'bleeding profusely',
    func: animateMultipleKeys,
    funcParam: Math.floor(Math.random() * 4) + 2,
  },

  dramaticTune: {
    audio: new Audio('./assets/dramatic-piano.wav'),
    title: 'does this seem like the time to play, Doc?',
    func: animateRandomKey,
    funcParam: null,
  },

  virtuosoTune: {
    audio: new Audio('./assets/virtuoso-piano.wav'),
    title: 'played deep into the night when everybody is trying to get some sleep',
    func: animateMultipleKeys,
    funcParam: Math.floor(Math.random() * 4) + 1,
  },
}

let selectedTune = tunes.sadTune.audio;

tuneBtns.forEach(btn => btn.addEventListener('click', () => {
  tuneBtns.forEach(btn => btn.classList.remove('active'));

  if (!selectedTune.paused) {
    selectedTune.pause();
    document.querySelector('#piano-btn img').setAttribute('src', './assets/play.svg');
  };

  selectedTune = tunes[`${btn.id}Tune`].audio;
  document.querySelector('.track-title').innerHTML = 'track: ' + tunes[`${btn.id}Tune`].title;
  btn.classList.add('active');
}))


pianoBtn.addEventListener('click', () => {
     
    if (selectedTune.paused) { 
        selectedTune.play();
        document.querySelector('#piano-btn img').setAttribute('src', './assets/pause.svg');
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

// function startAnimatingKeys() {
//   if (animationInterval) return;
//   animationInterval = setInterval(() => animateMultipleKeys(Math.floor(Math.random() * 3) + 1), 300); // adjust speed here
// }


function stopAnimatingKeys() { 
  clearInterval(animationInterval);
  animationInterval = null;
}

Object.values(tunes).forEach(tune => {
  tune.audio.addEventListener('play', () => startAnimatingKeys(() => tune.func(tune.funcParam)));  
  tune.audio.addEventListener('pause', stopAnimatingKeys);
  tune.audio.addEventListener('ended', stopAnimatingKeys);
});