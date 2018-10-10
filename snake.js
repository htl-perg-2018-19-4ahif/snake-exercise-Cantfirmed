var keypress = require('keypress');
var ansi = require('ansi');
var cursor = ansi(process.stdout);

var xmin = 1;
var ymin = 1;
var width = 25;
var height = 15;



var xSnake = Math.floor(width / 2);
var ySnake = Math.floor(height / 2);

var xApple=xSnake;
var yApple=ySnake;

var dirX = 1; //direction
var dirY = 0;

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdout.write('\x1Bc');
process.stdout.write('\x1B[?25l');
cursor.bg.grey();
drawRectangle();
cursor.bg.reset();

process.stdin.on('keypress', changeDirection);

console.log("\n");

placeApple();
loop();

function drawRectangle() {
    for (var i = 1; i < width + xmin; i++) {
        if (i == 1 || i == width) {
            for (var j = 1; j < height + 1; j++) {
                cursor.goto(i, j).write(' ');
            }
        } else {
            for (var j = 1; j < height + 1; j++) {
                if (j == 1 || j == height)
                    cursor.goto(i, j).write(' ');
            }
        }
    }
}

function placeApple() {
    
    while (xApple == xSnake || xApple == 1 || xApple == width) {
        xApple = Math.ceil((Math.random() * width - 2) + 2);
    }
    while (yApple == ySnake || yApple == 1 || yApple == height) {
        yApple = Math.ceil((Math.random() * height - 2) + 2);
    }

    cursor.bg.red();
    cursor.goto(xApple, yApple).write(' ');
    cursor.bg.reset();
    loop();
}

function drawSnake() {
    xSnake += dirX;
    ySnake += dirY;
    if(xSnake==xApple&&ySnake==yApple){
        placeApple();
    }
    cursor.bg.green();
    cursor.goto(xSnake, ySnake).write(' ');
    cursor.bg.reset();
}

function changeDirection(chunk, key) {
    switch (key.name) {

        case 'w':
            dirX = 0;
            dirY = -1;
            break;
        case 'a':
            dirY = 0;
            dirX = -1;
            break;
        case 's':
            dirX = 0;
            dirY = 1;
            break;
        case 'd':
            dirY = 0;
            dirX = 1;
            break;
        case 'escape': case 'q':
            quitGame();
            break;

    }
}
function removeSnake() {
    cursor.bg.black();
    cursor.goto(xSnake, ySnake).write(' ');
    cursor.bg.reset();
}
function isDead() {
    if (xSnake != width && xSnake != 1 && ySnake != height && ySnake != 1) {
        return false;
    } else {
        return true;
    }
}

function quitGame() {
    cursor.reset();
    cursor.bg.reset();
    process.stdout.write('\x1B[?25h');
    cursor.goto(width/2, height/2);
    console.log("Game Over");
    cursor.goto(1, height + 4);
    //process.stdin.setRawMode(false);
    process.exit();
}
function loop() {
    removeSnake();
    drawSnake();
    if (isDead()) {
        quitGame();
    }
    setTimeout(loop, 1000);
}


/*
        case 'w': ySnake--
            if(ySnake==0){
                ySnake=height--;
            }
            break;
        case 'a': xSnake--;
            if(xSnake==0){
                xSnake=width--;
            }
            break;
        case 's': ySnake++;
            if(ySnake==height){
                ySnake=1;
            }
            break;
        case 'd': xSnake++;
            if(xSnake==width){
                xSnake=1;
            }
            break;
*/