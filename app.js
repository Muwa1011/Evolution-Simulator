const box = document.querySelector(".box")
let id = 0;

function Creature(div, size, speed, destination, destinationReachedLeft, destinationReachedTop) {
    this.id = id++;
    this.div = div;
    this.size = size;
    this.speed = speed;
    this.destination = destination;
    this.destinationReachedLeft = destinationReachedLeft;
    this.destinationReachedTop = destinationReachedTop;
    console.log(this)
}

function getDestination() {
    const randomPositionLeft = Math.floor(Math.random() * 1500) + 150
    const randomPositionTop = Math.floor(Math.random() * 600) + 200
    return [randomPositionLeft, randomPositionTop]
}

let destination = getDestination();
let destinationReachedLeft = false;
let destinationReachedTop = false;

console.log(destination)

Creature.prototype.move = function () {
    //Left
    if(this.div.getBoundingClientRect().left < this.destination[0]){
        this.div.style.left = this.div.getBoundingClientRect().left + 1 + 'px';
    } else if(this.div.getBoundingClientRect().left > this.destination[0]){
        this.div.style.left = this.div.getBoundingClientRect().left - 1 + 'px';
    } else {
        this.destinationReachedLeft = true;
    }

    //Top
    if(this.div.getBoundingClientRect().top < this.destination[1]){
        this.div.style.top = this.div.getBoundingClientRect().top + 1 + 'px';
    } else if(this.div.getBoundingClientRect().top > this.destination[1]){
        this.div.style.top = this.div.getBoundingClientRect().top - 1 + 'px';
    } else {
        this.destinationReachedTop = true;
    }

    if(this.destinationReachedLeft === true && this.destinationReachedTop === true){
        this. destination = getDestination()
        this.destinationReachedLeft = false;
        this.destinationReachedTop = false;
    }
}

setInterval(function () {
    creature.move()
    creature2.move()
}, 1);

const creatureDiv = document.createElement("div");
const creatureDiv2 = document.createElement("div");
creatureDiv.classList.add("creature")
creatureDiv2.classList.add("creature")
box.append(creatureDiv)
box.append(creatureDiv2)

const creature = new Creature(creatureDiv, 1, 1, getDestination(), false, false);
const creature2 = new Creature(creatureDiv2, 1, 1, getDestination(), false, false);

creature.move()
creature2.move()
