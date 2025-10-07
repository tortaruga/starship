export default {
    supplies: {
  objective: 'Retrieve supplies and fuel from Planet Base.',
  location: 'Planet Base',
  outcome: function(ship) {
    ship.technical_stats.fuel_level = 100;
    ship.inventory.find(item => item.item === 'space rum').amount += 15;
    console.log('Fuel tank full, and booze stash replenished!');
  }
},

explore: {
  objective: "Explore space and do some piracy",
  location: "The Great Unknown",
  outcome: function(ship) {
    const isSuccessful = Math.random() >= 0.5;
    const spacePolice = Math.random() >= 0.5;

    if (isSuccessful) {
      const randomGold = Math.ceil(Math.random() * (300 - 50) + 50);
      const randomFuel = Math.ceil(Math.random() * (50 - 20) + 20);
      ship.inventory.find(item => item.item === 'credits').amount += randomGold;
      ship.inventory.find(item => item.item === 'artifact').amount += 1;
      ship.technical_stats.fuel_level -= randomFuel;
      
      console.log('Well, done, gang, we got some gold and a new artifact!')
    } else {
      const randomGold = Math.ceil(Math.random() * (250 - 30) + 30);
      const randomFuel = Math.ceil(Math.random() * (50 - 20) + 20);
      const shieldDamage = Math.ceil(Math.random() * (20 - 8) + 8);
      const moraleDrop =  Math.ceil(Math.random() * (35 - 15) + 15);

      ship.technical_stats.fuel_level -= randomFuel;
      ship.inventory.find(item => item.item === 'credits').amount += randomGold;
      ship.technical_stats.crew_morale -= moraleDrop;
      ship.technical_stats.shield_strength -= shieldDamage;

      console.log("The mission was a disaster... Some other space criminals stole our gold!")
    }

    if (spacePolice) {
      const hullDamage = Math.ceil(Math.random() * (40 - 15) + 15);
      const moraleDrop =  Math.ceil(Math.random() * (40 - 20) + 20);

      ship.technical_stats.crew_morale -= moraleDrop;
      ship.technical_stats.hull_integrity -= hullDamage; 

      console.log('Oh no! We stumbled upon the Space Police!')
    }

  }
},

sketchy_deals: {
  objective: "Buy and sell stolen goods on black markets or shady space stations.",
  location: 'Crater Town',
  outcome: function(ship) {
    const asteroidBelt = Math.random() >= 0.5;
    if (asteroidBelt) {
      const hullDamage = ship.technical_stats.shield_strength >= 50 ? Math.ceil(Math.random() * (10 - 5) + 5) : Math.ceil(Math.random() * (15 - 10) + 10);

      ship.technical_stats.hull_integrity -= hullDamage;
      console.log("Ouch! We suffered some damage in the Asteroid Belt!");
    }

    if (ship.inventory.find(item => item.item === 'artifact').amount >= 1) {
      ship.inventory.find(item => item.item === 'artifact').amount -= 1;
      ship.inventory.find(item => item.item === 'credits').amount += Math.ceil(Math.random() * (200 - 50) + 50);
      console.log("Nice deal! We got some gold in exchange for a worthless artifact!");

    } else if (ship.inventory.find(item => item.item === 'credits').amount >= 200) {
      ship.inventory.find(item => item.item === 'credits').amount -= Math.ceil(Math.random() * (200 - 50) + 50);
      ship.inventory.find(item => item.item === 'artifact').amount += 1;
      console.log("Nice deal! We bought an interesting artifact!");
    }

    const randomFuel = Math.ceil(Math.random() * (50 - 20) + 20);
    ship.technical_stats.fuel_level -= randomFuel;  
  }
}, 

repair_ship: {
    objective: "Fix ship before it collapses (even more than usual).",
    location: "Junkstar Prime",
    outcome: function(ship) {
        const shieldHealth = Math.ceil(Math.random() * (80 - 35) + 35);
        const hullHealth = Math.ceil(Math.random() * (75 - 30) + 30);
        const randomFuel = Math.ceil(Math.random() * (15 - 10) + 10);

        ship.technical_stats.hull_integrity += hullHealth;
        ship.technical_stats.shield_strength += shieldHealth;
        ship.technical_stats.fuel_level -= randomFuel;

        if (ship.technical_stats.hull_integrity > 100) {ship.technical_stats.hull_integrity = 100};
        if (ship.technical_stats.shield_strength > 100) {ship.technical_stats.shield_strength = 100};
        console.log("Awesome! The Clunkerfly is in optimal shape! ... I mean, compared to its usual standards...");
    } 
}
}
