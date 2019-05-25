const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Create a function for generating a random number
const randomNumber = (min, max) => {
    const number = Math.floor(Math.random() * (max - min)) + min;
    return number;
}

class Ball {
    constructor(x, y, speedX, speedY, color, size) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if(this.x + this.size > width) {
            this.speedX = -(this.speedX);
        }

        if(this.x - this.size <= 0) {
            this.speedX = -(this.speedX);
        }

        if(this.y + this.size > height) {
            this.speedY = -(this.speedY);
        }

        if(this.y - this.size <= 0) {
            this.speedY = -(this.speedY);
        }

        this.x += this.speedX;
        this.y += this.speedY;
    }
}

var balls = [];

while(balls.length < 25) {
    const size = randomNumber(10, 20);
    const ball = new Ball(
        randomNumber(0 + size, width - size),
        randomNumber(0 + size, height - size),
        randomNumber(-7, 7),
        randomNumber(-7, 7),
        `rgb(${randomNumber(0,255)},${randomNumber(0,255)},${randomNumber(0,255)})`,
        size
    )

    balls.push(ball);
}

const loop = () => {
    ctx.fillStyle = "rgb(0,0,0,0.25)";
    ctx.fillRect(0 ,0, width, height);

    balls.map(ball => {
        ball.draw();
        ball.update();
    })

    requestAnimationFrame(loop);
}

loop();
