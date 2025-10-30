import { starship } from "../../constants/starship.js";

function populateCargoList() {
    starship.inventory.forEach(item => createCargoItem(item));
}

function createCargoItem(item) {
    const li = document.createElement('li');
    document.getElementById('cargo-list').appendChild(li);
    const div = document.createElement('div');
    div.classList.add('cargo-item-container');
    li.appendChild(div); 

    const itemName = document.createElement('p');
    itemName.classList.add('item-name');
    
    itemName.innerHTML = `${item.item}`; 
    div.appendChild(itemName);

    if (item.amount) {
        const amount = document.createElement('p');
        amount.classList.add('item-amount');
        amount.setAttribute('id', item.item);
        amount.innerHTML = `amount: <span>${item.amount}</span>`;
        div.appendChild(amount);
    } 

    if (item.tag) {
        const tag = document.createElement('span');
        tag.classList.add('item-tag');
        tag.textContent = item.tag;
        itemName.appendChild(tag); 
    }
 
    const descP = document.createElement('p');
    descP.textContent = item.description;
    descP.classList.add('item-desc')
    div.appendChild(descP);
}

populateCargoList();
