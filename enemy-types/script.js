/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('cvs1');
const ctx = canvas.getContext('2d');
CANVAS_WIDHT = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numOfEnemies = 20;
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
        this.image.src = 'enemy4.png';
        this.speed = Math.random() * 4 + 1;
        this.sprWidth = 213;
        this.sprHeight = 213;
        this.width = this.sprWidth / 2.5;
        this.height = this.sprHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50);
        // this.angle = Math.random() * 500;
        // this.angleSpeed = Math.random() * 0.5 + 0.5;
        // this.curve = Math.random() * 200 + 50;
    }
    update(){
        // this.x = 0;
        // this.y = 0;
        if(gameFrame % this.interval === 0){
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }

        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/70;
        this.y -= dy/70;

        // this.angle += this.angleSpeed;
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