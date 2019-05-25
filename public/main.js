"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// Create a function for generating a random number
var randomNumber = function randomNumber(min, max) {
    var number = Math.floor(Math.random() * (max - min)) + min;
    return number;
};

var Ball = function () {
    function Ball(x, y, speedX, speedY, color, size) {
        _classCallCheck(this, Ball);

        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.size = size;
    }

    _createClass(Ball, [{
        key: "draw",
        value: function draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }, {
        key: "update",
        value: function update() {
            if (this.x + this.size > width) {
                this.speedX = -this.speedX;
            }

            if (this.x - this.size <= 0) {
                this.speedX = -this.speedX;
            }

            if (this.y + this.size > height) {
                this.speedY = -this.speedY;
            }

            if (this.y - this.size <= 0) {
                this.speedY = -this.speedY;
            }

            this.x += this.speedX;
            this.y += this.speedY;
        }
    }]);

    return Ball;
}();

var balls = [];

while (balls.length < 25) {
    var size = randomNumber(10, 20);
    var ball = new Ball(randomNumber(0 + size, width - size), randomNumber(0 + size, height - size), randomNumber(-7, 7), randomNumber(-7, 7), "rgb(" + randomNumber(0, 255) + "," + randomNumber(0, 255) + "," + randomNumber(0, 255) + ")", size);

    balls.push(ball);
}

var loop = function loop() {
    ctx.fillStyle = "rgb(0,0,0,0.25)";
    ctx.fillRect(0, 0, width, height);

    balls.map(function (ball) {
        ball.draw();
        ball.update();
    });

    requestAnimationFrame(loop);
};

loop();