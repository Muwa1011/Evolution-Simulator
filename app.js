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

function getDestination(){
    const randomPositionLeft = Math.floor(Math.random() * 200)
    const randomPositionTop = Math.floor(Math.random() * 200)
    return [randomPositionLeft, randomPositionTop]
}

Creature.prototype.move = function () {
    const destination = getDestination();
    console.log(destination)

    console.log(this.div.getBoundingClientRect().top)
    this.div.style.top = this.div.getBoundingClientRect().top + 50 + 'px';
    console.log(this.div.getBoundingClientRect().top)
}


const creatureDiv = document.createElement("div");
creatureDiv.classList.add("creature")
box.append(creatureDiv)

const creature = new Creature(creatureDiv, 1, 1);

creature.move()
