// Enemies our player must avoid
//function enemy has x-axis,y-axis and the speed
let Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x ;
    this.y = y ;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt ;

    //now cearte if-else statment to make the speed of enemis reapear randomly when they off;
    if(this.x > 510){
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }
    // now use if-else to Check for collisions between the player and the enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x,y) {
        this.x = x ;
        this.y = y ;
        this.player = 'images/char-boy.png';
    }
}

Player.prototype.update = function (dt) {

}
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player),this.x,this.y);
}




//From https://gist.githubusercontent.com/Ul1ra/a824487a6d784dcd689f83092c8643dd/raw/afc9a293d04e2da4f01b7a7fc4bfbfcbe3d595a5/app.js
//https://medium.com/letsboot/classic-arcade-game-with-js-5687e4125169

Player.prototype.handleInput = function (keyPress) {
// Enables user on left arrow key to move left on the x axis by 102
// Also enables user not to go off the game tiles on the left side
if (keyPress == 'left' && this.x > 0) {
    this.x -= 102;
};

// Enables user on right arrow key to move right on the x axis by 102
// Also enables user not to go off the game tiles on the right side
if (keyPress == 'right' && this.x < 405) {
    this.x += 102;
};

// Enables user on up arrow key to move upwards on the y axis by 83
if (keyPress == 'up' && this.y > 0) {
    this.y -= 83;
};

// Enables user on down arrow key to move downwards on the y axis by 83
// Also enables user not to go off the game tiles on the bottom side
if (keyPress == 'down' && this.y < 405) {
    this.y += 83;
};

// Once the user reaches the top of the page; the water, the user is
// Instantly reset to the starting position
if (this.y < 0) {
    setTimeout(() => {
        this.x = 202;
        this.y = 405;
    }, 500);
};
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// All enemies are placed in an array
let allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
let enemyLocation = [63, 147, 230];


// For each enemy located on the y axis from 0 on the x axis move at a speed of 200
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    eneme = new Enemy(0, locationY, 200);
    allEnemies.push(eneme);
});
// Place the player object in a variable called player
// The starting location of the player is located at x=200, y=405
let player = new Player(202, 405);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
