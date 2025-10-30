import { starship } from "../../constants/starship.js";

function populateGenericInfoPanel() {
    document.getElementById('starship-name').innerHTML = `name: <span>${starship.name}</span>`;
    document.getElementById('starship-model').innerHTML = `model: <span>${starship.model}</span>`;
    document.getElementById('starship-description').innerHTML = `${starship.description}`;
}

populateGenericInfoPanel();
 