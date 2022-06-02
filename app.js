const box = document.querySelector(".box")
let id = 0;

let creatureArray = [100];

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
   // this.move()


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

function createCreatures(amount) {
    for (let i = 0; i < amount; i++) {
        creatureArray[i] = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false);

    }
}

createCreatures(100)

setInterval(function () {

    for(creatureS of creatureArray){
        creatureS.move()
    }
}, 1);


