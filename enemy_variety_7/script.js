/** @type {HTMLCanvasElement} */

document.addEventListener('DOMContentLoaded', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;

    class Game {
        constructor(ctx, width, height){
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 100;
            this.enemyTimer = 0;
        }
        update(deltaTime){
            this.enemies = this.enemies.filter(object => !object.markedForDeletion);
            if(this.enemyTimer > this.enemyInterval){
                this.#addnewEnemy();
                this.enemyTimer = 0;
                console.log(this.enemies);
            }else{
                this.enemyTimer++;
            }
            this.enemies.forEach(object => object.update(deltaTime));
        }
        draw(){
            this.enemies.forEach(object => object.draw(this.ctx));
        }
        #addnewEnemy(){
            this.enemies.push(new Worm(this));
        }
    }

    class Enemy {
        constructor(game){
            this.game = game;
            // console.log(this.game);
            this.markedForDeletion = false;
        }
        update(deltaTime){
            this.x -= this.vx * deltaTime;
            // remove enemies
            if(this.x < 0 - this.width) this.markedForDeletion = true;
        }
        draw(ctx){
            ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy {
        constructor(game){
            super(game);
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth/2;
            this.height = this.spriteHeight/2;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.image = worm;
            this.vx = Math.random() * 0.1 + 0.1;
        }
    }

    const game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 1;
    function animate(timeStamp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        // some code
        requestAnimationFrame(animate);
    };
    animate();
});
