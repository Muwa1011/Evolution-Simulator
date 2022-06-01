const box = document.querySelector(".box")
let id = 0;

function Creature(div, size, speed, destination, destinationReachedLeft, destinationReachedTop) {
    this.id = id++;
    this.div = div;
    this.div.classList.add("creature")
    box.append(this.div)
    this.size = size;
    this.speed = speed;
    this.destination = destination;
    this.destinationReachedLeft = destinationReachedLeft;
    this.destinationReachedTop = destinationReachedTop;
    //??? this.move = move()??
    this.move()


    console.log(this)
}

function getDestination() {
    const randomPositionLeft = Math.floor(Math.random() * 1500) + 150
    const randomPositionTop = Math.floor(Math.random() * 600) + 200
    return [randomPositionLeft, randomPositionTop]
}


Creature.prototype.move = function () {
    //Left
    if (this.div.getBoundingClientRect().left < this.destination[0]) {
        this.div.style.left = this.div.getBoundingClientRect().left + 1 + 'px';
    } else if (this.div.getBoundingClientRect().left > this.destination[0]) {
        this.div.style.left = this.div.getBoundingClientRect().left - 1 + 'px';
    } else {
        this.destinationReachedLeft = true;
    }

    //Top
    if (this.div.getBoundingClientRect().top < this.destination[1]) {
        this.div.style.top = this.div.getBoundingClientRect().top + 1 + 'px';
    } else if (this.div.getBoundingClientRect().top > this.destination[1]) {
        this.div.style.top = this.div.getBoundingClientRect().top - 1 + 'px';
    } else {
        this.destinationReachedTop = true;
    }

    //Reached
    if (this.destinationReachedLeft === true && this.destinationReachedTop === true) {
        this.destination = getDestination()
        this.destinationReachedLeft = false;
        this.destinationReachedTop = false;
    }
}

setInterval(function () {
    creature.move()
    creature2.move()
    creature3.move()
    creature4.move()
    creature5.move()
    creature6.move()
    creature7.move()
    creature8.move()
    creature9.move()
    creature10.move()
}, 1);

const creature = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);
const creature2 = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);
const creature3 = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);
const creature4 = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);
const creature5 = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);
const creature6 = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);
const creature7 = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);
const creature8 = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);
const creature9 = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);
const creature10 = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);


function createCreatures(amount) {
    for (let i = 0; i < amount; i++) {
        new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);

    }
}

createCreatures(100)