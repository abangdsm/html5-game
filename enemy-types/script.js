/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('cvs1');
const ctx = canvas.getContext('2d');
CANVAS_WIDHT = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numOfEnemies = 10;
const enemiesArray = [];

let gameFrame = 0;


// enemy1 = {
//     x: 10,
//     y: 50,
//     width: 200,
//     height: 200
// }

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy1.png';
        // this.speed = Math.random() * 4 - 2;
        this.sprWidth = 293;
        this.sprHeight = 155;
        this.width = this.sprWidth / 2.5;
        this.height = this.sprHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }
    update(){
        this.x += Math.random() * 5 - 2.5; 
        this.y += Math.random() * 5 - 2.5;
        // animate sprites
        if(gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw(){
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.sprWidth, 0, this.sprWidth, this.sprHeight, this.x, this.y, this.width, this.height);
    }
};

// const enemy1 = new Enemy();
for (let i = 0; i < numOfEnemies; i++){
    enemiesArray.push(new Enemy())
}
console.log(enemiesArray);

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDHT, CANVAS_HEIGHT);
    // enemy1.update();
    // enemy1.draw();

    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw()
    });

    gameFrame++;
    requestAnimationFrame(animate);
}
animate();