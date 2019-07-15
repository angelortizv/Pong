/** 
 * @file pong.js
 * @version 1.0
 * @date 14/07/2019
 * @author angelortizv
 * @title PONG
 * @brief Clone of the classic Atari Pong game. See Full Project https://github.com/angelortizv/Pong for details. 
 */

var canvas = document.getElementById('game-canvas')
var ctx = canvas.getContext('2d')

var playerPaddle = {
    width = 15,
    height = 90,
    x: 20,
    y: 100,
    score = 0
};

var computerPaddle = {
    width: 15,
    height: 90,
    x: canvas.width - 35,
    y: 400,
    vx: 0,
    vy: 0.1,    
    score: 0,
};

var ball = {
    width: 15,
    height: 15,
    x: 200,
    y: 50,
    vx: -10,
    vy: 3
};

document.getElementById('game-canvas').style.background = '#000'