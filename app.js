const box = document.querySelector(".box")


function createCreature(){
    const creature = document.createElement("div")
    creature.speed = 1;
    creature.moving = true;
    creature.move = function (){
        while(creature.moving){
            
        }
        creature.style.position ='absolute';
        creature.style.top = Math.floor(Math.random()*90+5)+'%';
        creature.style.left = Math.floor(Math.random()*90+5)+'%';
    }
    creature.classList.add("creature")
    box.append(creature)
    return creature;
} 


const creature = createCreature()
creature.move()
console.log(creature.speed)
