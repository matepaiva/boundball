/*jslint browser:true */

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
                document.location.reload();
            } 
            if(b.y - b.size < 0 || b.y + b.size > canvas.height) {
                document.location.reload();
            }
        }
    },
    bounce: function (balls) {
        for (var i = 0; i < balls.length; i++) {
            var b = balls[i];
            for (var j=0; j<bars.content.length; j++){
                var bar = bars.content[j];
                if (b.x >= bar.x && b.x <= bar.x + bar.width && bar.orientation === "ver"){
                    if(b.y >= bar.y && b.y <= bar.y + bar.height){
                        b.dx *= -1;
                    }
                }
                if (b.y >= bar.y && b.y <= bar.y + bar.height && bar.orientation === "hor"){
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
balls.newBall("black", 20, 20, 8, 3.6, 1, 1);

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
                if (bar.orientation == "ver" && bar.y > 0){
                    bar.y -= bar.speed;
                }
            }
        }
        if (controls.downPressed){
            for (var j=0; j<bars.content.length; j++){
                bar = bars.content[j];
                if (bar.orientation == "ver" && bar.y < canvas.height-bar.height){
                    bar.y += bar.speed;
                }
            }
        }
        if (controls.leftPressed){
            for (var g=0; g<bars.content.length; g++){
                bar = bars.content[g];
                if (bar.orientation == "hor" && bar.x > 0){
                    bar.x -= bar.speed;
                }
            }
        }
        if (controls.rightPressed){
            for (var h=0; h<bars.content.length; h++){
                bar = bars.content[h];
                if (bar.orientation == "hor" && bar.x < canvas.width-bar.width){
                    bar.x += bar.speed;
                }
            }
        }
    }
};
bars.newBar("blue", 65, 10, 5, (canvas.height - 50) / 2, "ver", 6);
bars.newBar("blue", 65, 10, (canvas.width - 15), (canvas.height - 50) / 2, "ver", 6);
bars.newBar("red", 10, 80, (canvas.width-50)/2, 5, "hor", 8);
bars.newBar("red", 10, 80, (canvas.width-50)/2, (canvas.height-15), "hor", 8);


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

    requestAnimationFrame(draw);
}

draw();