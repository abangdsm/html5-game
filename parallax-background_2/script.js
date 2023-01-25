const canvas = document.getElementById('cvs1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 4;
// let gameFrame = 0;

const bg1 = new Image();
bg1.src = 'layer-1.png';
const bg2 = new Image();
bg2.src = 'layer-2.png';
const bg3 = new Image();
bg3.src = 'layer-3.png';
const bg4 = new Image();
bg4.src = 'layer-4.png';
const bg5 = new Image();
bg5.src = 'layer-5.png';

window.addEventListener('load', function(){
    const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', function(e){
    console.log(e);
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
});

// Jadikan komentar == ganti dengan variabel dan class
// let x = 0;
// let x2 = 2400;

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        // this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        // move speed lebih lembut
        if(this.x <= -this.width){
            this.x = 0;
        }
        this.x = this.x - this.speed;
        
        // if(this.x2 <= this.width){
            //    this.x2 = this.width + this.x - this.speed;
            // }
            // this.x2 = Math.floor(this.x2 - this.speed);

        // this.x = gameFrame * this.speed % this.width;

    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(bg1, 0.2)
const layer2 = new Layer(bg2, 0.4)
const layer3 = new Layer(bg3, 0.6)
const layer4 = new Layer(bg4, 0.8)
const layer5 = new Layer(bg5, 0.5)

const gameObject = [layer1, layer2, layer3, layer4, layer5];

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // Jadikan komentar == ganti dengan variabel dan class
    // ctx.drawImage(bg5, x,0);
    // ctx.drawImage(bg5, x2,0);
    // if (x < -2400) x = 2400 + x2 - gameSpeed;
    // else x -= gameSpeed;
    // if(x2 < -2400) x2 = 2400 + x  - gameSpeed;
    // else x2 -= gameSpeed;

    gameObject.forEach(object => {
        object.update();
        object.draw();
    });

    // gameFrame --;
    requestAnimationFrame(animate);
};
animate();
});

