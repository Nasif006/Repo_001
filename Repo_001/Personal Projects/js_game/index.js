const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect (0, 0, canvas.width, canvas.height)

class sprite {
    constructor({position, velocity, color}){
        this.position= position
        this.velocity= velocity
        this.color= color
    }

    draw (){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, 50, 150)
    }
}

const player = new sprite ({
    position : {x : 100, y : 0},
    color : 'green'})

const enemy = new sprite ({
    position : {x : 900, y : 0},
    color : 'red'})

player.draw()

enemy.draw()

console.log(player);
