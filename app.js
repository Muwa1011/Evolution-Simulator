const box = document.querySelector(".box")
const populationText = document.querySelector("#population")
const restartButton = document.querySelector("#resetButton")
restartButton.addEventListener('click', reset)
let id = 0;

let creatureArray = [];
let food = [100];

function Creature(div, size, speed, destination, destinationReachedLeft, destinationReachedTop, amountEaten, eaten, replicate) {
    this.id = id++;
    this.div = div;
    this.div.classList.add("creature")
    box.append(this.div)
    this.size = size;
    this.speed = speed;
    this.destination = destination;
    this.destinationReachedLeft = destinationReachedLeft;
    this.destinationReachedTop = destinationReachedTop;
    this.amountEaten = amountEaten
    this.eaten = eaten;
    this.replicate = replicate
    console.log(this)
    this.div.innerText = id
}

function reset(creatures, food){
    // Remove Creatures
    for(let i = creatureArray.length; i > 0; i--){
        creatureArray[i - 1].div.remove()
        creatureArray.splice(i - 1, 1)
    }
    // Remove Food
    // restart Intervall Functions
    // create Creatures
    // generate Food

}

function getDestination() {
    const randomPositionLeft = Math.floor(Math.random() * 1509) + 199
    const randomPositionTop = Math.floor(Math.random() * 600) + 150
    return [randomPositionLeft, randomPositionTop]
}

Creature.prototype.goBack = function () {
    const destination = this.destination;

    const distanceTop = this.div.getBoundingClientRect().top - 130;
    const distanceBottom = 640 + 130 - this.div.getBoundingClientRect().top;
    const distanceLeft = this.div.getBoundingClientRect().left - 199;
    const distanceRight = 1509 + 199 - this.div.getBoundingClientRect().left;

    let shortestWay = distanceTop;

    if (distanceBottom < shortestWay) {
        shortestWay = distanceBottom
    }
    if (distanceLeft < shortestWay) {
        shortestWay = distanceLeft
    }
    if (distanceRight < shortestWay) {
        shortestWay = distanceRight
    }

    if (shortestWay === distanceTop) {
        destination[0] = this.div.getBoundingClientRect().left;
        destination[1] = 130;
    }
    if (shortestWay === distanceBottom) {
        destination[0] = this.div.getBoundingClientRect().left
        destination[1] = 770
    }
    if (shortestWay === distanceLeft) {
        destination[0] = 199;
        destination[1] = this.div.getBoundingClientRect().top;
    }
    if (shortestWay === distanceRight) {
        destination[0] = 1708;
        destination[1] = this.div.getBoundingClientRect().top;
    }
    return destination
}

Creature.prototype.move = function () {
    if (this.amountEaten < 2) {
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
    } else {

        this.destinationReachedLeft = false;
        this.destinationReachedTop = false;
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
    }
}

function createCreatures(amount) {
    for (let i = 0; i < amount; i++) {
        const c = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false, 0, false, false);
        creatureArray.push(c)
        const rnd = getDestination()
        const oneTwo = Math.random()
        if (oneTwo < 0.5) {
            creatureArray[i].div.style.left = "165px";
        } else {
            creatureArray[i].div.style.left = "1750px";
        }
        creatureArray[i].div.style.top = rnd[1] + 'px';
    }
}

function createCreatureOne(parent) {
    const c = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false, 0, false, false);
    creatureArray.push(c)
    c.div.style.top = creatureArray[creatureArray.indexOf(parent)].div.getBoundingClientRect().top + 25 + 'px';
    c.div.style.left = creatureArray[creatureArray.indexOf(parent)].div.getBoundingClientRect().left + 25 + 'px';
    console.log("c" + c.id)
    console.log("parent" + parent.id)

}

function generateFood(amount) {
    for (let i = 0; i < amount; i++) {
        food[i] = document.createElement("div")
        food[i].classList.add("food")
        box.appendChild(food[i])
        const rnd = getDestination()
        food[i].style.left = rnd[0] + 'px';
        food[i].style.top = rnd[1] + 'px';

    }
}

function removeFood() {
    for (foodSingle of food) {
        foodSingle.remove()
    }
}

createCreatures(10)
generateFood(33)

let generation = 0;
let population = 0;

setInterval(function () {
    for(let i = creatureArray.length; i > 0; i--){
        if(!creatureArray[i - 1].eaten){
            creatureArray[i - 1].div.remove();
            creatureArray.splice(i - 1, 1);
        }
    }
    for (creatureS of creatureArray) {
        if (!creatureS.eaten) {
            //TODO if creature is removed the next creature will be skiped (?) 
            // solution traverse backwards
            /* creatureS.div.remove()
            creatureArray.splice(creatureArray.indexOf(creatureS), 1) */
        } else {
            creatureS.destination = getDestination()
            creatureS.eaten = false;
            creatureS.amountEaten = 0;
            creatureS.div.style.boxShadow  = "0px 0px 5px 0px rgb(75, 75, 75)";
            if (creatureS.replicate) {
                createCreatureOne(creatureS)
                creatureS.replicate = false;
            }
        }
    }
    removeFood();
    generateFood(33)
    let population = 0;
    for (creatureS of creatureArray) {
        population++;
    }
    generation++;
    populationText.innerText = `Population: ${population} / Gen: ${generation}`
    console.log(creatureArray)
}, 40000)

setInterval(function () {
    for (creatureS of creatureArray) {
        creatureS.move()
        creatureS.eat()
    }
}, 2);


Creature.prototype.eat = function () {
    for (foodSingle of food) {
        if (this.amountEaten < 2) {
            const topDifference = this.div.getBoundingClientRect().top - foodSingle.getBoundingClientRect().top
            const leftDifference = this.div.getBoundingClientRect().left - foodSingle.getBoundingClientRect().left
            if (((topDifference < 10 && topDifference > 0) || (topDifference < 0 && topDifference > -24)) &&
                ((leftDifference < 10 && leftDifference > 0) || (leftDifference < 0 && leftDifference > -24))) {
                this.amountEaten++;
                this.eaten = true;
                this.div.style.boxShadow  = "0px 0px 5px 0px rgb(0, 200, 0)";
                foodSingle.remove()
                if (this.amountEaten === 2) {
                    this.div.style.boxShadow  = "0px 0px 5px 0px rgb(144, 0, 255)";
                    this.replicate = true;
                    this.destination = this.goBack()
                }
                //console.log(this)
            }

        }

    }
}




