import { updateItemAmount } from "./centerPanel.js";
import { updateStats, handleNegativeLevel, randomColorClass } from "./functions.js"; 

export default {
    supplies: {
    objective: 'Retrieve supplies and fuel from Planet Base.',
    location: 'Planet Base',
    outcome: function(ship) {
      const date = new Date().toLocaleString();
      let missionInfo = `<p>Mission report <span class="pink">${date}</span> --- <span class="pink">Destination:</span> ${this.location} --- <span class="pink">Objective:</span> ${this.objective}</p>`;
      ship.technical_stats.fuel_level = 100;
      ship.technical_stats.ammo_levels = 100;
      ship.inventory.find(item => item.item === 'space rum').amount += 15;
  
      updateStats(ship);
      updateItemAmount(ship.inventory.find(item => item.item === 'space rum'), ship);
      let result = missionInfo + `<p><span class="emoji">✨</span> Fuel tank full, and booze stash replenished!<p> <p class="${randomColorClass()}">Fuel level: 100%</p> <p class="${randomColorClass()}">space rum: +15</p> <p class="${randomColorClass()}">Ammo: 100%</p>`;
      return {message: result, earnedMoney: null}
  }
},

explore: {
  objective: "Explore space and do some piracy",
  location: "The Great Unknown",
  outcome: function(ship) {
    const date = new Date().toLocaleString();
    let missionInfo = `<p>Mission report <span class="pink">${date}</span> --- <span class="pink">Destination:</span> ${this.location} --- <span class="pink">Objective:</span> ${this.objective}</p>`;

      
    const isSuccessful = Math.random() >= 0.5;
    const spacePolice = Math.random() >= 0.5;
    let earnedMoney  = false;
    let police = false;
    let fight = false;
    
    if (isSuccessful) {
      const randomGold = Math.ceil(Math.random() * (300 - 50) + 50);
      const randomFuel = Math.ceil(Math.random() * (50 - 20) + 20);
      const randomAmmo = Math.ceil(Math.random() * (30 - 10) + 10);
      ship.inventory.find(item => item.item === 'credits').amount += randomGold;
      ship.inventory.find(item => item.item === 'artifact').amount += 1;
      ship.technical_stats.fuel_level -= randomFuel;
      ship.technical_stats.ammo_levels -= randomAmmo;
      handleNegativeLevel(ship.technical_stats.fuel_level);
      handleNegativeLevel(ship.technical_stats.ammo_levels);
      earnedMoney = true;
      missionInfo += `<p>Well done, gang, we got some gold and a new artifact! <span class="emoji">✌️</span></p> <p class="${randomColorClass()}">credit: +${randomGold}</p> <p class="${randomColorClass()}">Fuel level: -${randomFuel}%</p> <p class="${randomColorClass()}">Artifacts: +1</p> <p class="${randomColorClass()}">Ammo: -${randomAmmo}%</p>`;
    } else {
      const randomGold = Math.ceil(Math.random() * (250 - 30) + 30);
      const randomFuel = Math.ceil(Math.random() * (50 - 20) + 20);
      const randomAmmo = Math.ceil(Math.random() * (50 - 15) + 15);
      const shieldDamage = Math.ceil(Math.random() * (20 - 8) + 8);
      const moraleDrop =  Math.ceil(Math.random() * (35 - 15) + 15);

      ship.technical_stats.fuel_level -= randomFuel;
      ship.technical_stats.ammo_levels -= randomAmmo;
      ship.inventory.find(item => item.item === 'credits').amount += randomGold;
      ship.technical_stats.crew_morale -= moraleDrop;
      ship.technical_stats.shield_strength -= shieldDamage;

      ship.technical_stats.fuel_level = handleNegativeLevel(ship.technical_stats.fuel_level);
      ship.technical_stats.ammo_levels = handleNegativeLevel(ship.technical_stats.ammo_levels);
      ship.technical_stats.crew_morale = handleNegativeLevel(ship.technical_stats.crew_morale);
      ship.technical_stats.shield_strength = handleNegativeLevel(ship.technical_stats.shield_strength);

      fight = true;
      missionInfo += `<p><span class="emoji">👎 </span>The mission was a disaster... Some other space criminals stole our gold!</p> <p class="${randomColorClass()}">Credit: -${randomGold}</p> <p class="${randomColorClass()}">Fuel level: -${randomFuel}%</p> <p class="${randomColorClass()}">Shield strength: -${shieldDamage}%</p> <p class="${randomColorClass()}">Crew morale: -${moraleDrop}%</p> <p class="${randomColorClass()}">Ammo: -${randomAmmo}%</p>`
    }

    if (spacePolice) {
      const hullDamage = Math.ceil(Math.random() * (40 - 15) + 15);
      const moraleDrop =  Math.ceil(Math.random() * (40 - 20) + 20);
      const randomAmmo =  Math.ceil(Math.random() * (20 - 10) + 10);

      ship.technical_stats.crew_morale -= moraleDrop;
      ship.technical_stats.hull_integrity -= hullDamage; 
      ship.technical_stats.ammo_levels -= randomAmmo; 

      ship.technical_stats.ammo_levels = handleNegativeLevel(ship.technical_stats.ammo_levels);
      ship.technical_stats.crew_morale = handleNegativeLevel(ship.technical_stats.crew_morale);
      ship.technical_stats.hull_integrity = handleNegativeLevel(ship.technical_stats.hull_integrity);

      police = true;
      missionInfo += `<p><span class="emoji">💀</span> Oh no! We stumbled upon the Space Police!<p> <p class="${randomColorClass()}">Hull integrity: -${hullDamage}%</p> <p class="${randomColorClass()}">Crew morale: -${moraleDrop}%</p> <p class="${randomColorClass()}">Ammo: -${randomAmmo}%</p>`;
    }

    setTimeout(() => {
      ship.checkMorale();
      ship.checkFuel();
      ship.checkDamage();
      ship.checkAmmo();
    }, 1000);

    updateItemAmount(ship.inventory.find(item => item.item === 'credits'), ship);
    updateItemAmount(ship.inventory.find(item => item.item === 'artifact'), ship);
    updateStats(ship);

    return {message: missionInfo, earnedMoney: earnedMoney, police: police, fight: fight};
  }
},

sketchy_deals: {
  objective: "Buy and sell stolen goods on black markets or shady space stations.",
  location: 'Crater Town',
  outcome: function(ship) {
    const date = new Date().toLocaleString();
    let missionInfo = `<p>Mission report <span class="pink">${date}</span> --- <span class="pink">Destination:</span> ${this.location} --- <span class="pink">Objective:</span> ${this.objective}</p>`;
    let earnedMoney = false;
  
    const asteroidBelt = Math.random() >= 0.5;
    if (asteroidBelt) {
      const hullDamage = ship.technical_stats.shield_strength >= 50 ? Math.ceil(Math.random() * (10 - 5) + 5) : Math.ceil(Math.random() * (15 - 10) + 10);

      ship.technical_stats.hull_integrity -= hullDamage;
      ship.technical_stats.hull_integrity = handleNegativeLevel(ship.technical_stats.hull_integrity);

      missionInfo += `<p>Ouch! We suffered some damage in the Asteroid Belt! <span class="emoji">😵‍💫</span></p> <p class="${randomColorClass()}">Hull integrity: -${hullDamage}%</p>`;
    }

    if (ship.inventory.find(item => item.item === 'artifact').amount >= 1) {
      ship.inventory.find(item => item.item === 'artifact').amount -= 1;
      const randomGold = Math.ceil(Math.random() * (200 - 50) + 50);
      ship.inventory.find(item => item.item === 'credits').amount += randomGold;
      earnedMoney = true;
      missionInfo += `<p>Nice deal! We got some gold in exchange for a worthless artifact!<span class="emoji"> 💰</span></p> <p class="${randomColorClass()}">Artifacts: -1</p> <p class="${randomColorClass()}">Credit: +${randomGold}</p>`
    } else if (ship.inventory.find(item => item.item === 'credits').amount >= 200) { 
      const randomGold = Math.ceil(Math.random() * (200 - 50) + 50);
      ship.inventory.find(item => item.item === 'credits').amount -= randomGold;
      ship.inventory.find(item => item.item === 'artifact').amount += 1;
      missionInfo += `<p>Nice deal! We bought an interesting artifact! <span class="emoji">💪</span></p> <p class="${randomColorClass()}">Artifacts: +1</p> <p class="${randomColorClass()}">Credit: -${randomGold}</p>`
    }

    const randomFuel = Math.ceil(Math.random() * (50 - 20) + 20);
    ship.technical_stats.fuel_level -= randomFuel;  
    ship.technical_stats.fuel_level = handleNegativeLevel(ship.technical_stats.fuel_level);

    updateItemAmount(ship.inventory.find(item => item.item === 'credits'), ship);
    updateItemAmount(ship.inventory.find(item => item.item === 'artifact'), ship);

    setTimeout(() => {
      ship.checkDamage();
      ship.checkFuel();
    }, 1000);

      updateStats(ship);
      let result = missionInfo + `<p class="${randomColorClass()}">Fuel level: -${randomFuel}%</p>`;

    return {message: result, earnedMoney: earnedMoney}
  }
}, 

repair_ship: {
    objective: "Fix ship before it collapses (even more than usual).",
    location: "Junkstar Prime",
    outcome: function(ship) {
      const date = new Date().toLocaleString(); 
      let missionInfo = `<p>Mission report <span class="pink">${date}</span> --- <span class="pink">Destination:</span> ${this.location} --- <span class="pink">Objective:</span> ${this.objective}</p>`;

      
        const shieldHealth = Math.ceil(Math.random() * (80 - 35) + 35);
        const hullHealth = Math.ceil(Math.random() * (75 - 30) + 30);
        const randomFuel = Math.ceil(Math.random() * (15 - 10) + 10);

        ship.technical_stats.hull_integrity += hullHealth;
        ship.technical_stats.shield_strength += shieldHealth;
        ship.technical_stats.fuel_level -= randomFuel;

        ship.technical_stats.fuel_level = handleNegativeLevel(ship.technical_stats.fuel_level);

        setTimeout(() => ship.checkFuel(), 1000); 

        if (ship.technical_stats.hull_integrity > 100) {ship.technical_stats.hull_integrity = 100};
        if (ship.technical_stats.shield_strength > 100) {ship.technical_stats.shield_strength = 100};
        
        updateStats(ship);
        let message = missionInfo + `<p><span class="emoji">🪄</span> Awesome! The Clunkerfly is in optimal shape! ... I mean, compared to its usual standards...</p> <p class="${randomColorClass()}">Hull integrity: +${hullHealth}%</p> <p class="${randomColorClass()}">Shield strength: +${shieldHealth}%</p> <p class="${randomColorClass()}">Fuel level: -${randomFuel}%</p>`;

        return {message: message, earnedMoney: null};
    } 
  }
} 
