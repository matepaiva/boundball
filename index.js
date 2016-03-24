/*jslint browser:true */

var requestId;

var canvas = document.getElementById("bb");
var ctx = canvas.getContext("2d");

var controls = {
    rightPressed: false,
    leftPressed: false,
    upPressed: false,
    downPressed: false,
    keyDownHandler: function (e) {
        if (e.keyCode == 39) {
            controls.rightPressed = true;
        } else if (e.keyCode == 37) {
            controls.leftPressed = true;
        } else if (e.keyCode == 38) {
            controls.upPressed = true;
        } else if (e.keyCode == 40) {
            controls.downPressed = true;
        }
    },
    keyUpHandler: function (e) {
        if (e.keyCode == 39) {
            controls.rightPressed = false;
        } else if (e.keyCode == 37) {
            controls.leftPressed = false;
        } else if (e.keyCode == 38) {
            controls.upPressed = false;
        } else if (e.keyCode == 40) {
            controls.downPressed = false;
        }
    },

};

document.addEventListener("keydown", controls.keyDownHandler, false);
document.addEventListener("keyup", controls.keyUpHandler, false);

var balls = {
    content: [],
    Ball: function (color, x, y, size, speed, dx, dy) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.dx = dx;
        this.dy = dy;
    },
    newBall: function (color, x, y, size, speed, dx, dy) {
        var nBall = new balls.Ball(color, x, y, size, speed, dx, dy);
        balls.content.push(nBall);
    },
    bounds: function (balls) {
        for (var i = 0; i < balls.length; i++) {
            var b = balls[i];
            if (b.x - b.size < 0 || b.x + b.size > canvas.width){
                //document.location.reload();
            } 
            if(b.y - b.size < 0 || b.y + b.size > canvas.height) {
                //document.location.reload();
            }
        }
    },
    bounce: function (balls) {
        var bar;
        for (var i = 0; i < balls.length; i++) {
            var b = balls[i];
            for (var j=0; j<bars.content.length; j++){
                bar = bars.content[j];
                if ( (b.x-b.size === bar.x + bar.width || b.x+b.size === bar.x) && bar.orientation === "ver"){
                    if(b.y >= bar.y && b.y <= bar.y + bar.height){
                        b.dx *= -1;
                    }
                }
                if ( (b.y-b.size === bar.y + bar.height || b.y+b.size === bar.y) && bar.orientation === "hor"){
                    if(b.x >= bar.x && b.x <= bar.x + bar.width){
                        b.dy *= -1;
                    }
                }
            }
        }
    },
    move: function (balls) {
        for (var i = 0; i < balls.length; i++) {
            var b = balls[i];
            b.x += b.dx * b.speed;
            b.y += b.dy * b.speed;
        }
    }
};
//balls.newBall(color, x, y, size, speed, dx, dy)
balls.newBall("black", 24, 144, 6, 3, 1, 1);

var bars = {
    content: [],
    Bar: function (color, height, width, x, y, o, s) {
        this.color = color;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.orientation = o;
        this.speed = s;
    },
    newBar: function (color, height, width, x, y, o, s) {
        var nBar = new bars.Bar(color, height, width, x, y, o, s);
        bars.content.push(nBar);
    },
    move: function (){
        var bar;
        if (controls.upPressed){
            for (var i=0; i<bars.content.length; i++){
                bar = bars.content[i];
                if (bar.orientation == "ver"){
                    bar.y -= bar.speed;
                    if(bar.y === 0){
                        bars.newBar(bar.color, bar.height, bar.width, bar.x, canvas.height, bar.orientation, bar.speed);
                    } else if (bar.y < 0-bar.height){
                        bars.content.splice(i, 1);
                    }
                }
            }
        }
        if (controls.downPressed){
            for (var j=0; j<bars.content.length; j++){
                bar = bars.content[j];
                if (bar.orientation == "ver"){
                    bar.y += bar.speed;
                    if(bar.y+bar.height === canvas.height){
                        bars.newBar(bar.color, bar.height, bar.width, bar.x, 0-bar.height, bar.orientation, bar.speed);
                    } else if (bar.y > canvas.height){
                        bars.content.splice(j, 1);
                    }
                }
            }
        }
        if (controls.leftPressed){
            for (var g=0; g<bars.content.length; g++){
                bar = bars.content[g];
                if (bar.orientation == "hor"){
                    bar.x -= bar.speed;
                    if(bar.x === 0){
                        bars.newBar(bar.color, bar.height, bar.width, canvas.width, bar.y, bar.orientation, bar.speed);
                    } else if (bar.x < 0-bar.width){
                        bars.content.splice(g, 1);
                    }
                }
            }
        }
        if (controls.rightPressed){
            for (var h=0; h<bars.content.length; h++){
                bar = bars.content[h];
                if (bar.orientation == "hor"){
                    bar.x += bar.speed;
                    if(bar.x + bar.width === canvas.width){
                        bars.newBar(bar.color, bar.height, bar.width, 0-bar.width, bar.y, bar.orientation, bar.speed);
                    } else if (bar.x > canvas.width){
                        bars.content.splice(h, 1);
                    }
                }
            }
        }
    },
};
//bars.newBar(color, height, width, x, y, orientation, speed);
bars.newBar("blue", 60, 6, 0, (canvas.height - 60) / 2, "ver", 6);
bars.newBar("blue", 60, 6, (canvas.width - 6), (canvas.height - 60) / 2, "ver", 6);
bars.newBar("red", 6, 60, (canvas.width-60)/2, 0, "hor", 6);
bars.newBar("red", 6, 60, (canvas.width-60)/2, (canvas.height-6), "hor", 6);

function drawBars(bars) {
    for (var i = 0; i < bars.length; i++) {
        var b = bars[i];
        ctx.beginPath();
        ctx.rect(b.x, b.y, b.width, b.height);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.closePath();
    }
}

function drawBalls(balls) {
    for (var i = 0; i < balls.length; i++) {
        var b = balls[i];
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2, false);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.closePath();
    }
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBalls(balls.content);
    balls.move(balls.content);
    balls.bounds(balls.content);
    balls.bounce(balls.content);
    drawBars(bars.content);
    bars.move();

    requestId=requestAnimationFrame(draw);
}

draw();

function stop(){
    if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
}