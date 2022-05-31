const box = document.querySelector(".box")

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
    this.div = div;
    this.size = size;
    this.speed = speed;
}

Creature.prototype.move = function () {
    this.div.style.position = 'absolute';
    this.div.style.top = Math.floor(Math.random() * 90 + 5) + '%';
    this.div.style.left = Math.floor(Math.random() * 90 + 5) + '%';
}

const creatureDiv = document.createElement("div");
creatureDiv.classList.add("creature")
box.append(creatureDiv)
const creature = new Creature(creatureDiv, 1, 1);
creature.move()
console.log(creature.speed)
