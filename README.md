- [overview](#overview)
- [features](#features)
- [things I learned](#things-i-learned)
- [license](#license)

## Overview

This project is an exercise in working with JavaScript Objects and Classes, disguised as a spaceship simulator. It began as a humble JS file containing a single spaceship object, but quickly spiraled out of control as I got carried away with ideas. The result: a sprawling mess of features, a billion loose files, and deep regret over not using a framework or organizing folders from the start.

### Features

- View generic ship info (name and description)
- Explore the crew and their bios
- Access the ship systems panel (speed, fuel, ammo, engine state, shields, hull integrity, crew morale)
- Browse the cargo hold
- Explore ship rooms and space locations
- Embark on missions
- Type commands in the console to:
  - Check ship stats
  - Go on a random mission
  - Visit a random ship room
  - Greet the crew
  - Throw a party 🎉
- Console-based mission reports with sound effects to match the mood
- Settings to disable sound effects (for peace of mind)
- Dynamic current status and random event log that updates every few minutes
- Disco switch! Triggers visual chaos
- Piano corner: play notes or listen to a tune (with animated keys for extra flair)

#### Things I learned

Apart from getting more comfortable with classes, objects, methods and the `this` keyword, through this project I also learned the following things: 

1. Primitive value reassignment inside a function doesn’t affect the original variable

I had a function to set any negative stat back to 0, that looked something like this: 

    handleNegative(stat) {
        if (stat < 0) stat = 0;
    }

Then I would handle the negative stats like so: `handleNegative(myStat);`
...and nothing would happen. 

I learned that primitive types (like numbers, strings, booleans) are passed to functions by value, not by reference. This means that I wasn't changing the actual stat property, but only a copy of its value, that didn't affect the original.

To really change the original value, I had to modify the function to return the new value (0), and set it to the stat:

    function handleNegative(stat) {
        if (stat < 0) return 0;
    }

    obj.myStat = handleNegative(obj.myStat);


2. innerHTML vs appendChild()

I initially added messages to the console panel with `consoleScreen.innerHTML += newMessage;`, but when there were multiple messages to be added only the last one survived.

So I learned that instead of doing that, creating a div containing the new message and appending that to consoleScreen is safer and more efficient, since it creates a new DOM node and adds it to the existing DOM tree, without touching or re-parsing the rest of consoleScreen content.

3. removing event listener

I found out that these two functions, that look the same to me, are actually not treated as the same function, and therefore do not successfully remove the event listener: 

```
button.addEventListener('click', () => obj.method());

button.removeEventListener('click', () => obj.method());

```

Those two are *two different anonymous functions*, and even though they look the same, they’re not the *same reference in memory*.
So to make it work I have to use a named function or a stable reference:
```
   function handleClick() {
       obj.method();
    }

    button.removeEventListener('click', handleClick);
    button.addEventListener('click', handleClick);
```

4. CSS tranform property doesn't work on inline elements...

I'm sure I read about this when first studying the difference between block and inline elements, and then obviously I completely forgot, so I spent half an hour wondering why the spans weren't scaling as I was telling them to...

5. circular imports

Apparently having 2646862143456 js files where things are being exported and imported wherever without rhyme or reason results in this very curious situation in which two modules depend on each other and I keep getting the error "Cannot access variable before initialization". Interesting. 

## License

Code: [MIT License](./LICENSE)  
Story & Lore: All rights reserved by the author. See LICENSE for details.