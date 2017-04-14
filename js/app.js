'use strict';
// Enemies our player must avoid

var enemyCanvasLimitsLeft = 505;
var inicialPosX = 202.5;
var inicialPosY = 383;

var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
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
    this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= enemyCanvasLimitsLeft) {
        this.x = -200;
    }

    // Verifica colisões com as laterais ou com inimigos.
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 20;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 20;
    }
    console.log('Tecla pressionada: ' + keyPress);
};

//Função que desenha o final do jogo ao alcançar o maxLevel.
Player.prototype.win = function(){
  console.log("Game Over!");
  scoreLevelDiv.innerHTML = 'Você venceu o jogo!';
  document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

//Função que desenha quando o jogador perde suas vidas.
Player.prototype.lose = function(){
  console.log("Game Over!");
  scoreLevelDiv.innerHTML = 'Você perdeu, suas vidas acabaram!';
  document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
}


// Função que exibe a pontuação
var displayScoreLevel = function(aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // Adiciona o score e o nivel.
    scoreLevelDiv.innerHTML = 'Pontos: ' + aScore
        + ' / ' + 'Nível: ' + aLevel + ' / ' + 'Vidas: ' + lifes;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

var checkCollision = function(anEnemy) {
    // Detecta colissões.
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
        console.log('Perdeu, vidas: ' + lifes + '.');
        lifes--;
        player.x = inicialPosX;
        player.y = inicialPosY;
    }

    // Detecta se o jogador atravessou a rua, aumenta a pontuação e
    // a dificuldade baseados no score.
    if (player.y + 63 <= 0) {
        player.x = inicialPosX;
        player.y = inicialPosY;
        console.log('Você venceu!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('Pontuação: ' + score + ', nível: ' + gameLevel);
        increaseDifficulty(score);

    }

    // Delimita o espaço do jogador dentro da canvas.
    var limitsX = [402.5,2.5];

    if (player.y > inicialPosY ) {
        player.y = inicialPosY;
    }
    if (player.x > limitsX[0]) {
        player.x = limitsX[0];
    }
    if (player.x < limitsX[1]) {
        player.x = limitsX[1];
    }
};

// Aumenta o número de inimigos baseado nos pontos.
var increaseDifficulty = function(numEnemies) {
    // Limpa o vetor de inimigos.
    allEnemies.length = 0;

    // Carrega novos inimigos.
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level

var allEnemies = [];
var player = new Player(inicialPosX, inicialPosY, 50);
var score = 0;
var gameLevel = 1;
var maxLevel = 12;
var lifes = 5;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 180 + 50, Math.random() * 250);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
