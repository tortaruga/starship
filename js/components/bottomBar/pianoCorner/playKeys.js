import { pianoKeys } from "../../../constants/DOMvars.js";
import { isSoundOn } from "../../../reusableFunctions.js"; 

const keyAudios = {
  a: './assets/piano-notes/piano-a.mp3', 
  b: './assets/piano-notes/piano-b.mp3',
  c: './assets/piano-notes/piano-c.mp3',
  d: './assets/piano-notes/piano-d.mp3',
  e: './assets/piano-notes/piano-e.mp3',
  f: './assets/piano-notes/piano-f.mp3',
  g: './assets/piano-notes/piano-g.mp3',
  'd-flat': './assets/piano-notes/piano-db.mp3',
  'e-flat': './assets/piano-notes/piano-eb.mp3',
  'g-flat': './assets/piano-notes/piano-gb.mp3',
  'a-flat': './assets/piano-notes/piano-ab.mp3',
  'b-flat': './assets/piano-notes/piano-bb.mp3', 
}

pianoKeys.forEach(key => key.addEventListener('click', (e) => {
  // check id
  const id = e.target.id;
  if (isSoundOn()) new Audio(keyAudios[id]).play();  
}))