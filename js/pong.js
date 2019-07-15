/** 
 * @file pong.js
 * @version 1.0
 * @date 14/07/2019
 * @author angelortizv
 * @title PONG
 * @brief Clone of the classic Atari Pong game. See Full Project https://github.com/angelortizv/Pong for details. 
 */

var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');

var playerPaddle = {
    width: 15,
    height: 90,
    x: 20,
    y: 100,
    score: 0
};

var computerPaddle = {
    width: 15,
    height: 90,
    x: canvas.width - 35,
    y: 400,
    vy: 0.1,                    
    score: 0,
    track: function() {
        var destination = ball.y - (this.height - ball.width) / 2;
        this.y += (destination - this.y) * this.vy;
        this.y = Math.max(Math.min(this.y, canvas.height - this.height), 0);
    }
};

var ball = {
    width: 15,
    height: 15,
    x: 200,
    y: 50,
    vx: -10,
    vy: 3,
    serve: function(side) {
        ball.y = canvas.height / 2;
        this.vy = Math.floor(Math.random() * (3 + 3) - 3);
        if (side === 1) {
            this.x = playerPaddle.width + 40;
            
            if (this.vx < 0) {
                this.vx = -this.vx;
            }
        } else {
            this.x = canvas.width - playerPaddle.width - 40 - this.width;

            if (this.vx > 0) {
                this.vx = -this.vx;
            }
        }
    }
};


function drawRect(object) {
    ctx.beginPath();
    ctx.rect(object.x, object.y, object.width, object.height);
    ctx.fillStyle = '#f7ff1c';
    ctx.fill();
    ctx.closePath();
}

function drawNet(width, height, padding) {
    var x = (canvas.width - width) / 2;
    var i = 0;
    var step = canvas.height / height;

    while (i < step) {
        var y = i * (height + padding);
        drawRect({x: x, y: y, width: width, height: height});

        i++;
    }
}

function drawScore() {
    ctx.font = '50px Arial';
    ctx.fillText(playerPaddle.score, canvas.width / 2 - 50, 50);
    ctx.fillText(computerPaddle.score, canvas.width / 2 + 20, 50);
}

function collisionDetection(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) {
        return true;
    }
    return false;
}

function reflectBall(paddle) {
    var relativeY = (paddle.y + paddle.height / 2) - (ball.y + ball.height / 2);
    ball.vy = -relativeY / 8;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(ball);
    drawRect(playerPaddle);
    drawRect(computerPaddle);
    drawNet(3, 10, 10);
    drawScore();
    computerPaddle.track();

    if (ball.y <= 0 || ball.y + ball.height >= canvas.height) {
        ball.vy = -ball.vy;
    }

    if (collisionDetection(ball, playerPaddle)) {
        ball.vx = Math.abs(ball.vx);
        reflectBall(playerPaddle);
    }

    if (collisionDetection(ball, computerPaddle)) {
        if (ball.vx > 0) {
            ball.vx = -ball.vx;
            reflectBall(computerPaddle);
        }
    }

    if (ball.x < 0) {
        computerPaddle.score++;
        ball.serve(1);
    }
    if (ball.x > canvas.width) {
        playerPaddle.score++;
        ball.serve(0);
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

document.getElementById('game-canvas').style.background = '#000';
document.addEventListener('mousemove', mouseMoveHandler, false);
draw();