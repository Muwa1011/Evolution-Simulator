const box = document.querySelector(".box")
let id = 0;

let creatureArray = [100];
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
}

function getDestination() {
    const randomPositionLeft = Math.floor(Math.random() * 1500) + 150
    const randomPositionTop = Math.floor(Math.random() * 600) + 200
    return [randomPositionLeft, randomPositionTop]
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
        this.destination = [200, this.destination[1]]
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

        //Reached
        if (this.destinationReachedLeft === true && this.destinationReachedTop === true) {
        }
    }
}

function createCreatures(amount) {
    for (let i = 0; i < amount; i++) {
        creatureArray[i] = new Creature(document.createElement("div"), 1, 1, getDestination(), false, false, false);
        const rnd = getDestination()
        const oneTwo = Math.random()
        if (oneTwo < 0.5) {
            creatureArray[i].div.style.left = "200px";
        } else {
            creatureArray[i].div.style.left = "1700px";

        }
        creatureArray[i].div.style.top = rnd[1] + 'px';
    }
}

function generateFood(amount) {
    for (let i = 0; i < amount; i++) {
        food[i] = document.createElement("div")
        food[i].classList.add("food")
        box.append(food[i])
        const rnd = getDestination()
        food[i].style.left = rnd[0] + 'px';
        food[i].style.top = rnd[1] + 'px';

    }
}

createCreatures(20)
generateFood(20)

setInterval(function () {
    for (creatureS of creatureArray) {
        creatureS.move()
        creatureS.eat()
    }
}, 2);


Creature.prototype.eat = function () {
    for (foodSingle of food) {
        if (!this.eaten) {
            if (this.div.getBoundingClientRect().top === foodSingle.getBoundingClientRect().top && this.div.getBoundingClientRect().left === foodSingle.getBoundingClientRect().left) {
                this.eaten = true;
                food.splice (food.indexOf(foodSingle), 2)
            }
        }

    }
}




