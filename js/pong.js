/** 
 * @file pong.js
 * @version 1.0
 * @date 14/07/2019
 * @author angelortizv
 * @title PONG
 * @brief Clone of the classic Atari Pong game. See Full Project https://github.com/angelortizv/Pong for details. 
 */

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var playerPaddle = {
    width: 15,
    height: 90,
    x: 20,
    y: 100
};

var computerPaddle = {
    width: 15,
    height: 90,
    x: canvas.width - 35,
    y: 100
};

var ball = {
    width: 10,
    height: 10,
    x: 200,
    y: 50,
    vx: -2,
    vy: -4
};

function drawRect(object) {
    ctx.beginPath();
    ctx.rect(object.x, object.y, object.width, object.height);
    ctx.fillStyle = '#efefef';
    ctx.fill();
    ctx.closePath();
}

function collisionDetection(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) {
        return true;
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(ball);
    drawRect(playerPaddle);
    drawRect(computerPaddle);
    if (ball.y <= 0 || ball.y + ball.height >= canvas.height) {
        ball.vy = -ball.vy;
    }
    if (collisionDetection(ball, playerPaddle)) {
        ball.vx = -ball.vx;
    }
    ball.x += ball.vx;
    ball.y += ball.vy;

    requestAnimationFrame(draw);
}

function mouseMoveHandler(e) {
    var relativeY = e.clientY - canvas.offsetTop;
    if (relativeY > playerPaddle.height / 2) {
        if (relativeY + playerPaddle.height / 2 < canvas.height) {
            playerPaddle.y = relativeY - playerPaddle.height / 2;
        }
    }
}

document.getElementById('myCanvas').style.background = '#000';
document.addEventListener('mousemove', mouseMoveHandler, false);
draw();