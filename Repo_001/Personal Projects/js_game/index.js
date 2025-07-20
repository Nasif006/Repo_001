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

    update (){
        if(this.position.y + 150 < canvas.height){
            this.draw()
            this.position.y += this.velocity.y
        }else{
             c.fillRect( this.position.x, this.position.y, 150,50)
             this.position.x += this.velocity.y
             console.log("aa")
        }
       
    }
}

const player = new sprite ({
    position : {x : 100, y : 0},
    velocity : {x : 0, y :6},
    color : 'green'})

const enemy = new sprite ({
    position : {x : 900, y : 0},
    velocity : {x : 0, y :3},
    color : 'red'})


console.log(player);

function animate () {
    window.requestAnimationFrame(animate)
    console.log('go');
    player.update()
    enemy.update()
}

animate ()
