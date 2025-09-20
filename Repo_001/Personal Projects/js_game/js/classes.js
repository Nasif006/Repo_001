class Sprite {
    constructor({position, imageSrc, scale= 1, frameMax =1, offset ={ x:0, y:0}}){
        this.position= position
        this.height = 150
        this.width = 50
        this.image = new Image
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.framesCurrent = 0
        this.framesElasped =0
        this.framesHold = 6
        this.offset = offset
        
    }

    draw (){
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.frameMax), 
            0, 
            this.image.width/this.frameMax, 
            this.image.height, 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width/this.frameMax) * this.scale, 
            this.image.height * this.scale)
    }

    animateFrames () {
        this.framesElasped ++

        if (this.framesElasped % this.framesHold === 0 ){
            if (this.framesCurrent < this.frameMax - 1) {
                this.framesCurrent++
            }else{
                this.framesCurrent = 0
            }
        }
    }

    update (){
        this.draw()
        this.animateFrames()
        
    }

}


class Fighter extends Sprite {
        constructor({position, velocity, color='blue', imageSrc, scale= 1, frameMax =1, offset = { x:0, y:0}, sprites }){
            super ({position, imageSrc, scale, frameMax, offset})

            this.color = color
            this.velocity= velocity
            this.height = 150
            this.width = 50
            this.lastkey
            this.attackBox = {
                position : {
                    x : this.position.x,
                    y : this.position.y
                },
                offset : offset,
                width : 100,
                height : 50
            }
            this.isAttacking = false
            this.health = 100
            this.framesCurrent = 0
            this.framesElasped =0
            this.framesHold = 9 
            this.sprites = sprites

            for (sprite in sprites){
                sprites[sprite].image = new Image ()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }
        }



        update (){
            this.draw()
            this.animateFrames()
            
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x
            this.attackBox.position.y = this.position.y

            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            if (this.position.y + this.height + this.velocity.y >= canvas.height - 96){
                this.velocity.y = 0
            }else{
                this.velocity.y += gravity
            }

        }

        attack (){
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            },100)
        }
}