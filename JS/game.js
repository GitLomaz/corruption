var game, ball
var paddle = [];
var speed = 100;

$( document ).ready(function() {
    startGame()
});

function startGame() {
	game = new Phaser.Game(900, 600, Phaser.AUTO, 'wrapper', { preload: preload, create: create, update: update, render: render});
}

function preload () {
    game.load.image('ball', 'images/ball.png');
    game.load.image('left', 'images/left.png');
    game.load.image('middle', 'images/middle.png');
    game.load.image('right', 'images/right.png');
}

function create() {
    ball = game.add.sprite(300, 300, 'ball');
    paddle[0] = game.add.sprite(600, 550, 'left');
    paddle[1] = game.add.sprite(600, 550, 'middle');
    paddle[2] = game.add.sprite(600, 550, 'right');

    right = new Phaser.Line(500, 10, 500, 500);

    $.each(paddle, function( index, value ) {
        game.physics.arcade.enable(paddle[index])
    });

    game.physics.arcade.enable(ball);
    ball.body.bounce.y = 1;
    ball.body.bounce.x = 1;
    ball.anchor.x = .5;
    ball.anchor.y = .5;
    ball.angle = 30;
    ball.body.collideWorldBounds = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
}

function update() {


    console.log(ball.angle);

    game.physics.arcade.velocityFromAngle(ball.angle, speed, ball.body.velocity);

    game.physics.arcade.overlap(ball, paddle[0], collisionHandler, null, this);
    game.physics.arcade.overlap(ball, paddle[1], collisionHandler, null, this);
    game.physics.arcade.overlap(ball, paddle[2], collisionHandler, null, this);

    if(ball.x > 500){
        console.log("right");
        angle = ball.angle;
        if(ball.angle > 0){
            ball.angle = 180 - angle;
        } else {
            ball.angle = -180 - angle;
        }
        ball.x = ball.x - 5;
    }

    if(ball.x < 10){
        console.log("left");
        angle = ball.angle;
        if(ball.angle > 0){
            ball.angle = 180 - angle;
        } else {
            ball.angle = -180 - angle;
        }
        ball.x = ball.x + 5;
    }

    if(ball.y < 10){
        console.log("top");
        ball.angle = -ball.angle;
        ball.y = ball.y + 5;
    }

    if(ball.y > 500){
        console.log("bottom");
        ball.angle = -ball.angle;
        ball.y = ball.y - 5;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && paddle[1].x > 8)
     {
         paddle[1].x -= 15;
         if(paddle[1].x < 8){
             paddle[1].x = 8;
         }
     }
     else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && paddle[1].x < game.width - (paddle[1].width + 8))
     {
         paddle[1].x += 15;
         if(paddle[1].x > game.width - (paddle[1].width + 8)){
             paddle[1].x = game.width - (paddle[1].width + 8);
         }
     }
    adjustPaddle();
}

function render() {
    game.debug.body(ball);
    game.debug.body(paddle[1]);
    game.debug.body(paddle[2]);
    game.debug.body(paddle[0]);
}

function adjustPaddle(){
    paddle[0].x = paddle[1].x - 8;
    paddle[2].x = paddle[1].x + paddle[1].width;
}

function collisionHandler(obj1, obj2){

    ball.body.velocity.y = 0;
    ball.body.angularVelocity = 0;
    ball.body.velocity.x = 0;

}
