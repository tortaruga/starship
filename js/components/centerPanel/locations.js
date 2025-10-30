import { starship } from "../../constants/starship.js";

function populateLocationList() {
    starship.locations.forEach(location => createLocationElement(location))
}
function createLocationElement(location) {
    const li = document.createElement('li');
    document.getElementById('location-list').appendChild(li);
    const div = document.createElement('div');
    li.appendChild(div);
    const name = document.createElement('p');
    name.textContent = location.name;
    name.classList.add('location-name');
    div.appendChild(name);
    const desc = document.createElement('p');
    desc.textContent = location.description;
    desc.classList.add('location-desc');
    div.appendChild(desc);
}

populateLocationList();
