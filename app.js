const box = document.querySelector(".box")
const populationText = document.querySelector("#population")
let id = 0;

let creatureArray = [];
let food = [100];

function Creature(div, size, speed, destination, destinationReachedLeft, destinationReachedTop, eaten) {
    this.id = id++;
    this.div = div;
    this.div.classList.add("creature")
    box.append(this.div)
    this.size = size;
    this.speed = speed;
    this.destination = destination;
    this.destinationReachedLeft = destinationReachedLeft;
    this.destinationReachedTop = destinationReachedTop;
    this.eaten = eaten;
    console.log(this)
    this.div.innerText = id
}

function getDestination() {
    const randomPositionLeft = Math.floor(Math.random() * 1509) + 199
    const randomPositionTop = Math.floor(Math.random() * 600) + 150
    return [randomPositionLeft, randomPositionTop]
}

function goBack(){
        const destination = [0, Math.floor(Math.random() * 600) + 150]
        if (Math.random() < 0.5) {
            destination[0] = 165;
        } else {
            destination[0] = 1750;
        }
        return destination;
}

Creature.prototype.goBack = function (){
    const destination = this.destination;

    const distanceTop = this.div.getBoundingClientRect().top - 130;
    const distanceBottom = 640 + 130 - this.div.getBoundingClientRect().top;
    const distanceLeft = this.div.getBoundingClientRect().left - 199;
    const distanceRight = 1509 + 199 - this.div.getBoundingClientRect().left;

    let shortestWay = 0;
    if(distanceTop < distanceRight){
        shortestWay = distanceTop
    } 
    if(distanceBottom < shortestWay) {
        shortestWay = distanceBottom
    }
    if(distanceLeft < shortestWay){
        shortestWay = distanceLeft
    }
    if(distanceRight < shortestWay){
        shortestWay = distanceRight
    }

    if(shortestWay === distanceTop){
        destination[0] =  this.div.getBoundingClientRect().left;
        destination[1] = 130;
    }
    if(shortestWay === distanceBottom){
        destination[0] = this.div.getBoundingClientRect().left
        destination[1] = 770
    }
    if(shortestWay === distanceLeft){
        destination[0] = 199;
        destination[1] =  this.div.getBoundingClientRect().top;
    }
    if(shortestWay === distanceRight){
        destination[0] = 1708;
        destination[1] =  this.div.getBoundingClientRect().top;
    }
    console.log(`Top: ${distanceTop} Bottom: ${distanceBottom} Left: ${distanceLeft} Right: ${distanceRight}` )
        return destination
}

Creature.prototype.move = function () {
    if (!this.eaten) {
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
        destinationReachedTop = false;
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
        const c = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false, false);
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

function removeFood(){
    for(foodSingle of food){
        foodSingle.remove()
    }
}

createCreatures(40)
generateFood(20)

let generation = 0;
let population = 0;

setInterval(function (){
    for(creatureS of creatureArray){
        if(!creatureS.eaten){
            creatureS.div.remove()
            creatureArray.splice(creatureArray.indexOf(creatureS), 1)
        } else {
            creatureS.destination = getDestination()
            creatureS.eaten = false;
            creatureS.div.style.background = "black";
            createCreatures(1);
        }
    }
    removeFood();
    generateFood(20)
    let population = 0;
    for(creatureS of creatureArray){
        population++;
    }
    generation++;
    populationText.innerText = `Population: ${population} / Gen: ${generation}`
    console.log(creatureArray)
},40000)

setInterval(function () {
    for (creatureS of creatureArray) {
        creatureS.move()
        creatureS.eat()
    }
}, 1);


Creature.prototype.eat = function () {
    for (foodSingle of food) {
        if (!this.eaten) {
            const topDifference = this.div.getBoundingClientRect().top - foodSingle.getBoundingClientRect().top
            const leftDifference = this.div.getBoundingClientRect().left - foodSingle.getBoundingClientRect().left
            if(((topDifference < 10 && topDifference > 0) || (topDifference < 0 && topDifference > -24)) && ((leftDifference < 10 && leftDifference > 0) || (leftDifference < 0 && leftDifference > -24))){
                this.eaten = true;
                this.div.style.background = "green";
                this.destination = this.goBack()
                foodSingle.remove()
            }
            
        }

    }
}




