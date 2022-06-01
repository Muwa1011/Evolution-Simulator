const box = document.querySelector(".box")
let id = 0;

/* 
function createCreature() {
    const creature = document.createElement("div")
    creature.speed = 1;
    creature.moving = true;
    creature.move = function () {
        while (creature.moving) {

        }
        creature.style.position = 'absolute';
        creature.style.top = Math.floor(Math.random() * 90 + 5) + '%';
        creature.style.left = Math.floor(Math.random() * 90 + 5) + '%';
    }
    creature.classList.add("creature")
    box.append(creature)
    return creature;
} */

function Creature(div, size, speed) {
    this.id = id++;
    this.div = div;
    this.size = size;
    this.speed = speed;
    console.log(this)
}

function getDestination() {
    const randomPositionLeft = Math.floor(Math.random() * 200) + 150
    const randomPositionTop = Math.floor(Math.random() * 200)
    return [randomPositionLeft, randomPositionTop]
}

let destination = getDestination();
let destinationReachedLeft = false;
let destinationReachedTop = false;

console.log(destination)

Creature.prototype.move = function () {

    //this.div.style.top = this.div.getBoundingClientRect().top + 1 + 'px';
    //Left
    if(this.div.getBoundingClientRect().left < destination[0]){
        this.div.style.left = this.div.getBoundingClientRect().left + 1 + 'px';
        console.log("move right")
    } else if(this.div.getBoundingClientRect().left > destination[0]){
        this.div.style.left = this.div.getBoundingClientRect().left - 1 + 'px';
        console.log("move left")
    } else {
        console.log("got there")
        destinationReachedLeft = true;
    }

    //Top
    if(this.div.getBoundingClientRect().top < destination[1]){
        this.div.style.top = this.div.getBoundingClientRect().top + 1 + 'px';
        console.log("move right")
    } else if(this.div.getBoundingClientRect().top > destination[1]){
        this.div.style.top = this.div.getBoundingClientRect().top - 1 + 'px';
        console.log("move left")
    } else {
        console.log("got there")
        destinationReachedtop = true;
    }

    if(destinationReachedLeft === true && destinationReachedtop === true){
        destination = getDestination()
        destinationReachedLeft = false;
        destinationReachedtop = false;
    }



}

setInterval(function () {
    creature.move()
}, 1);

const creatureDiv = document.createElement("div");
creatureDiv.classList.add("creature")
box.append(creatureDiv)

const creature = new Creature(creatureDiv, 1, 1);

creature.move()
