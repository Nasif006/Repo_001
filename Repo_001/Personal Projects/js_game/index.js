const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect (0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite ({
    position : {x : 0, y : 0},
    imageSrc : "./assets/background.png"
})

const player = new Fighter ({
    position : {x : 100, y : 0},
    velocity : {x : 0, y : 0},
    offset : { x : 0, y : 0},
    color : 'green'})

const enemy = new Fighter ({
    position : {x : 900, y : 0},
    velocity : {x : 0, y : 0},
    offset : { x : -50, y : 0},
    color : 'red'})


console.log(player);

const keys = {
    a : {
        pressed : false
    },
    d : {
        pressed : false
    },

    ArrowLeft : {
        pressed : false
    },
    ArrowRight : {
        pressed : false
    }
    
}

function rectangularCollision ({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <=rectangle2.position.y + rectangle2.height
    )
}

function determineWinner ({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector("#result").style.display = "flex";
        if (player.health === enemy.health) {
            document.querySelector("#result").innerHTML = "Draw" 
        }else if (player.health > enemy.health) {
            document.querySelector("#result").innerHTML = "Player 1 Wins"
        }else if (player.health < enemy.health) {
            document.querySelector("#result").innerHTML = "Player 2 Wins"
        }
}

let timer = 20;
let timerId
function decreaseTimer () {
    if (timer > 0){
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector("#timer").innerHTML = timer
    }

    if (timer === 0) {
        determineWinner ({player, enemy, timerId})
    }
}

decreaseTimer ()

function animate () {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    
    //player movement
    if (keys.a.pressed && player.lastkey === 'a') {
        player.velocity.x = -5
    }else if (keys.d.pressed && player.lastkey === 'd') {
        player.velocity.x = 5
    }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -5
    }else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

    //detect collision
    if ( rectangularCollision ({
        rectangle1 : player,
        rectangle2 : enemy
        }) && 
        player.isAttacking){
        enemy.color='orange'
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealthBar').style.width = enemy.health + '%'
    }else{
        enemy.color='red'
    }

    if ( rectangularCollision ({
        rectangle1 : enemy,
        rectangle2 : player
        }) && 
        enemy.isAttacking){
        player.color='orange'
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealthBar').style.width = player.health + '%'
    }else{
        player.color='green'
    }

    // endgame result based on health

    if (enemy.health <= 0 || player.health <= 0){
        determineWinner ({player, enemy, timerId})
    }
}

animate ()

window.addEventListener("keydown", (event) => {
    switch (event.key){
        case 'd' :
            keys.d.pressed = true
            player.lastkey = 'd'
            break
        
        case 'a' :
            keys.a.pressed = true
            player.lastkey = 'a'
            break

        case 'w' :
            player.velocity.y = -20
            break

        case ' ' :
            player.attack()
            break
        //enemy keys

        case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'
            break
        
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break

        case 'ArrowUp' :
            enemy.velocity.y = -20
            break
        
        case '0' :
            enemy.attack()
            break
                
    }
    console.log(event.key)
})


window.addEventListener("keyup", (event) => {
    switch (event.key){
        case 'd' :
            keys.d.pressed = false
            break
        
        case 'a' :
            keys.a.pressed = false
            break

        //enemy
        case 'ArrowRight' :
            keys.ArrowRight.pressed = false
            break
        
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false
            break

    }
})