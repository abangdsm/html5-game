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
        this.image.src = 'enemy2.png';
        this.speed = Math.random() * 4 + 1;
        this.sprWidth = 266;
        this.sprHeight = 188;
        this.width = this.sprWidth / 2.5;
        this.height = this.sprHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 10;
    }
    update(){
        this.x -= this.speed; 
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas.width;
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