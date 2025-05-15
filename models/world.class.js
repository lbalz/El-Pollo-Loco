/**
 * Class representing the game world
 * Manages all game objects, collisions, and game state
 */
class World {
    /** @type {Character} The player character instance */
    character = new Character();

    /** @type {Level} Current game level */
    level = level_1;

    /** @type {HTMLCanvasElement} The game's canvas element */
    canvas;

    /** @type {CanvasRenderingContext2D} The canvas 2D rendering context */
    ctx;

    /** @type {Keyboard} Keyboard input handler */
    keyboard;

    /** @type {number} Camera position on X axis */
    camPosX = 0;

    /** @type {HealthStatusBar} Health status bar instance */
    healthStatusBar = new HealthStatusBar();

    /** @type {CoinStatusBar} Coin collection status bar */
    coinStatusBar = new CoinStatusBar();

    /** @type {BottleStatusBar} Bottle collection status bar */
    bottleStatusBar = new BottleStatusBar();

    /** @type {EndbossStatusBar} End boss health status bar */
    endbossStatusBar = new EndbossStatusBar();

    /** @type {ThrowableObject[]} Array of thrown bottles */
    throwableObjects = [];

    /** @type {number} Timestamp of last damage taken */
    lastHitTime = 0;

    /** @type {boolean} Whether the game is currently running */
    gameRunning = false;

    /** @type {HTMLImageElement} Start screen image */
    startScreenImage = new Image();

    /** @type {HTMLImageElement} Game over screen image */
    gameOverScreenImage = new Image();

    /** @type {HTMLImageElement} Win screen image */
    winScreenImage = new Image();

    /** 
     * @type {string} 
     * @default 'start'
     * Current game state ('start', 'running', 'gameover', 'win') 
     */
    gameState = 'start';

    /** 
     * @type {HTMLAudioElement} 
     * Sound effect for bottle breaking
     */
    bottleBreakSound = new Audio('./audio/glass_bottle_destroyed.mp3');

    /** 
     * @type {HTMLAudioElement} 
     * Sound effect for chicken death
     */
    chickenAudio = new Audio('./audio/chicken.mp3');

    /** 
     * @type {number}
     * @default 0
     * Timestamp of last bottle throw in milliseconds
     */
    lastBottleThrow = 0;

    /**
     * Creates a new game world
     * @param {HTMLCanvasElement} canvas - The game's canvas element
     * @param {Keyboard} keyboard - Keyboard input handler
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadStartAndEndImages();
        this.setWorld();
        this.checkingFunctionLoop();
        this.lastBottleThrow = 0;
    }

    /**
     * Loads start, game over and win screen images
     */
    loadStartAndEndImages() {
        this.startScreenImage.src = "./img/9_intro_outro_screens/start/startscreen_1.png";
        this.gameOverScreenImage.src = "./img/9_intro_outro_screens/game_over/game over.png";
        this.winScreenImage.src = "./img/9_intro_outro_screens/win/win_2.png";
    }

    /**
     * Sets up the world reference in character
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Main game loop for checking various conditions
     */
    checkingFunctionLoop() {
        setInterval(() => {
            if (this.gameState === 'running') {
                this.checkGameStatus();
                this.checkEndBossStatus();
            }
        }, 100);

        setInterval(() => {
            if (this.gameState === 'running') this.checkCollisions();
        }, 1000 / 60);
    }

    /**
     * Checks game status including character health and attacks
     */
    checkGameStatus() {
        this.checkThrowBottle();
        this.checkCharacterGotChickenHit();
        if (this.character.isDead() || this.character.healthPoints <= 0) {
            this.handleGameOver();
        }
    }

    /**
     * Handles game over state
     */
    handleGameOver() {
        this.gameState = 'gameover';
        this.character.healthPoints = 0;
        setTimeout(() => this.showGameOver(), 50);
    }

    /**
     * Checks end boss status and victory conditions
     */
    checkEndBossStatus() {
        if (this.level.endboss.length > 0 && this.level.endboss[0].endbossHealth <= 0) {
            this.gameState = 'win';
            this.level.endboss[0].playDeadAnimation();
            setTimeout(() => this.showWin(), 500);
        }
    }

    /**
     * Checks all collision-related events
     */
    checkCollisions() {
        this.checkCharacterJumpOnChicken();
        this.checkBottleCollisionWithGround();
        this.checkCollectables();
        this.checkBottleCollisionWithChicken();
        this.checkBottleCollisionWithEndboss();
    }

    /**
     * Starts the game and animation loop
     */
    startGame() {
        this.gameState = 'running';
        this.gameRunning = true;
        this.draw();
    }

    /**
     * Resets the game by reloading the page
     */
    resetGame() {
        this.resetGameState();
        this.clearGameObjects();
        this.resetCamera();
        this.initializeLevel();
        this.resetCharacter();
        this.resetStatusBars();
        this.showStartScreen();
        this.setupStartButton();
        this.updateUIElements();
    }

    /**
     * Resets basic game state variables
     */
    resetGameState() {
        this.gameState = 'start';
        this.gameRunning = false;
    }

    /**
     * Clears all game objects
     */
    clearGameObjects() {
        this.throwableObjects = [];
        this.level.enemies = [];
        this.level.endboss = [];
        this.level.clouds = [];
        this.level.coins = [];
        this.level.bottles = [];
    }

    /**
     * Resets camera position
     */
    resetCamera() {
        this.camPosX = 0;
    }

    initializeLevel() {
        initLevel();
        this.level = level_1;
    }

    resetCharacter() {
        this.character = new Character();
        this.character.world = this;
        this.character.healthPoints = 100;
        this.character.bottles = 0;
        this.character.coins = 0;
    }

    resetStatusBars() {
        this.healthStatusBar.setHealthPercentage(100);
        this.coinStatusBar.setCoinsPercentage(0);
        this.bottleStatusBar.setBottlesPercentage(0);
        this.endbossStatusBar.setEndbossHealthPercentage(250);
    }

    /**
     * Shows the start screen overlay
     */
    showStartScreen() {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'flex';
        overlay.style.marginTop = '78px';
        overlay.innerHTML = `<button id="startButton">Start Game</button>`;
        overlay.style.backgroundImage = `url(${this.startScreenImage.src})`;
        overlay.style.backgroundColor = 'transparent';
    }

    /**
     * Updates UI element visibility
     */
    updateUIElements() {
        document.getElementById('footer').style.display = 'flex';
        document.getElementById('gameplayInfoButton').style.display = 'flex';
        document.getElementById('volume').style.display = 'none';
    }

    /**
     * Sets up the start button event listener
     */
    setupStartButton() {
        document.getElementById('startButton').addEventListener('click', () => {
            window.startGame();
        });
    }

    /**
     * Displays the game over screen
     */
    showGameOver() {
        this.gameRunning = false;
        let overlay = document.getElementById('overlay');
        this.setupOverlayBase(overlay);
        this.setGameOverContent(overlay);
        this.setupResetButton();
    }

    /**
     * Sets up base overlay styles
     * @param {HTMLElement} overlay - The overlay element
     */
    setupOverlayBase(overlay) {
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.gap = '20px';
        overlay.style.backgroundImage = 'none';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }

    /**
     * Sets game over content in overlay
     * @param {HTMLElement} overlay - The overlay element
     */
    setGameOverContent(overlay) {
        overlay.innerHTML = `
        <img src="${this.gameOverScreenImage.src}" alt="Game Over" style="width: 100%; height: 100%;">
        <button id="resetButton">Reset Game</button>
    `;
    }

    /**
     * Sets up the reset button event listener
     */
    setupResetButton() {
        let resetButton = document.getElementById('resetButton');
        resetButton.style.display = 'block';
        resetButton.addEventListener('click', () => this.resetGame());
    }

    /**
 * Displays the win screen
 */
    showWin() {
        this.gameRunning = false;
        let overlay = document.getElementById('overlay');
        this.setupOverlayBase(overlay);
        this.setWinContent(overlay);
        this.setupResetButton();
    }

    /**
     * Sets win screen content in overlay
     * @param {HTMLElement} overlay - The overlay element
     */
    setWinContent(overlay) {
        overlay.innerHTML = `
        <img src="${this.winScreenImage.src}" alt="Win Screen" style="width: 100%; height: 100%;">
        <button id="resetButton">Reset Game</button>
    `;
    }

    /**
     * Handles bottle throwing mechanics
     */
    checkThrowBottle() {
        if (!this.canThrowBottle()) return;

        const currentTime = new Date().getTime();
        if (currentTime - this.lastBottleThrow > 1000) {
            if (this.keyboard.THROW) {
                const throwPosX = this.character.otherDirection ?
                    this.character.positionX :
                    this.character.positionX + 125;
                this.createAndThrowBottle(throwPosX);
            }
        }
    }

    /**
     * Checks if character can throw a bottle
     * @returns {boolean} Whether throwing is possible
     */
    canThrowBottle() {
        return this.character.bottles > 0;
    }

    /**
     * Creates and throws a bottle
     * @param {number} throwPosX - X position to throw from
     */
    createAndThrowBottle(throwPosX) {
        const bottle = new ThrowableObject(
            throwPosX,
            this.character.positionY + 175,
            this.character.otherDirection
        );
        this.throwableObjects.push(bottle);
        this.character.bottles--;
        this.bottleStatusBar.setBottlesPercentage(this.character.bottles);
        this.lastBottleThrow = new Date().getTime();
    }

    /**
     * Checks for bottle collisions with ground
     */
    checkBottleCollisionWithGround() {
        if (this.character.world.throwableObjects.length > 0) {
            this.character.world.throwableObjects.forEach(bottle => {
                if (bottle.positionY >= 560) {
                    this.bottleBreakSound.currentTime = 0.5;
                    this.bottleBreakSound.play();
                    let bottleIndex = this.character.world.throwableObjects.indexOf(bottle);
                    this.character.world.throwableObjects.splice(bottleIndex, 1);
                }
            });
        }
    }

    /**
     * Checks for bottle collisions with chickens
     */
    checkBottleCollisionWithChicken() {
        if (this.character.world.throwableObjects.length > 0) {
            this.character.world.throwableObjects.forEach(bottle => {
                this.level.enemies.forEach(enemy => {
                    if (bottle.isColliding(enemy)) {
                        this.chickenAudio.play();

                        let bottleIndex = this.character.world.throwableObjects.indexOf(bottle);
                        let enemyIndex = this.level.enemies.indexOf(enemy);

                        this.character.world.throwableObjects.splice(bottleIndex, 1);
                        this.level.enemies.splice(enemyIndex, 1);

                        let randomNumber = Math.round(Math.random() * 8); // Random num 1 - 8
                        if (randomNumber == 8) {
                            this.character.bottles += 1;
                        }
                    }
                })
            });
        }
    }

    /**
     * Checks for bottle collisions with end boss
     */
    checkBottleCollisionWithEndboss() {
        if (this.throwableObjects.length > 0) {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(this.level.endboss[0])) {
                    this.chickenAudio.play();

                    let bottleIndex = this.throwableObjects.indexOf(bottle);
                    this.throwableObjects.splice(bottleIndex, 1);
                    this.level.endboss[0].hit();
                    this.endbossStatusBar.setEndbossHealthPercentage(this.level.endboss[0].endbossHealth);
                }
            });
        }
    }

    /**
     * Checks if character takes damage from enemies
     */
    checkCharacterGotChickenHit() {
        this.checkChickenCollisions();
        this.checkEndbossCollision();
    }

    /**
     * Checks collisions with regular chickens
     */
    checkChickenCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.handleChickenDamage();
            }
        });
    }

    /**
     * Checks collision with end boss
     */
    checkEndbossCollision() {
        if (this.level.endboss.length > 0) {
            let endboss = this.level.endboss[0];
            if (this.character.isColliding(endboss) && endboss.state === 'attacking') {
                this.handleEndbossDamage();
            }
        }
    }

    /**
     * Handles damage from chicken collisions
     */
    handleChickenDamage() {
        let currentTime = Date.now();
        if (currentTime - this.lastHitTime > 1000) {
            this.character.getHit();
            this.healthStatusBar.setHealthPercentage(this.character.healthPoints, this.ctx);
            this.lastHitTime = currentTime;
            this.checkGameOver();
        }
    }

    /**
     * Handles damage from end boss collisions
     */
    handleEndbossDamage() {
        let currentTime = Date.now();
        if (currentTime - this.lastHitTime > 1000) {
            this.character.healthPoints -= 20;
            this.healthStatusBar.setHealthPercentage(this.character.healthPoints, this.ctx);
            this.lastHitTime = currentTime;
        }
    }

    /**
     * Checks if character health reaches zero
     */
    checkGameOver() {
        if (this.character.healthPoints <= 0) {
            this.character.healthPoints = 0;
            this.gameState = 'gameover';
            setTimeout(() => this.showGameOver(), 50);
        }
    }

    /**
     * Checks if character jumps on enemies
     */
    checkCharacterJumpOnChicken() {
        this.level.enemies.forEach(enemy => {
            if (this.isJumpingOnEnemy(enemy)) {
                this.handleEnemyDeath(enemy);
            }
            this.respawnEnemiesIfNeeded();
        });
    }

    /**
     * Checks if character is jumping on an enemy
     * @param {MovableObject} enemy - The enemy to check
     * @returns {boolean} Whether character is jumping on enemy
     */
    isJumpingOnEnemy(enemy) {
        return this.character.isColliding(enemy) &&
            this.character.isNotOnGround() &&
            this.character.speedPosY < 0;
    }

    /**
     * Handles enemy death and possible bottle drops
     * @param {MovableObject} enemy - The enemy that died
     */
    handleEnemyDeath(enemy) {
        this.playChickenDeathSound();
        let enemyIndex = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(enemyIndex, 1);
        this.checkBottleDrop();
    }

    /**
     * Plays chicken death sound effect
     */
    playChickenDeathSound() {
        this.chickenAudio.currentTime = 0.5;
        this.chickenAudio.play();
    }

    /**
     * Checks if enemy should drop a bottle
     */
    checkBottleDrop() {
        let randomNumber = Math.round(Math.random() * 8);
        if (randomNumber === 8) {
            this.character.bottles += 1;
        }
    }

    /**
     * Respawns enemies if all are defeated
     */
    respawnEnemiesIfNeeded() {
        if (this.level.enemies.length === 0) {
            for (let i = 0; i < 5; i++) {
                this.addToMap(new BigChicken());
                this.addToMap(new SmallChicken());
            }
        }
    }

    /**
     * Checks for collisions with collectible items
     */
    checkCollectables() {
        this.checkCoinCollisions();
        this.checkBottleCollisions();
    }

    /**
     * Checks for coin collisions and handles collection
     */
    checkCoinCollisions() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(coin);
            }
        });
    }

    /**
     * Checks for bottle collisions and handles collection
     */
    checkBottleCollisions() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(bottle);
            }
        });
    }

    /**
     * Handles coin collection
     * @param {Coin} coin - The coin to collect
     */
    collectCoin(coin) {
        this.character.collectCoin();
        this.coinStatusBar.setCoinsPercentage(this.character.coins);
        let coinIndex = this.level.coins.indexOf(coin);
        this.level.coins.splice(coinIndex, 1);
    }

    /**
     * Handles bottle collection
     * @param {Bottle} bottle - The bottle to collect
     */
    collectBottle(bottle) {
        this.character.collectBottle();
        this.bottleStatusBar.setBottlesPercentage(this.character.bottles);
        let bottleIndex = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(bottleIndex, 1);
    }

    /**
     * Main drawing function for rendering the game
     */
    draw() {
        this.clearCanvas();
        this.drawBackgroundElements();
        this.drawStatusBars();
        this.drawChickenCount();
        this.drawEndbossStatus();
        this.drawGameObjects();
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Clears the canvas for the next frame
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws background elements with camera offset
     */
    drawBackgroundElements() {
        this.ctx.translate(this.camPosX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camPosX, 0);
    }

    /**
     * Draws all status bars and their values
     */
    drawStatusBars() {
        this.addToMap(this.healthStatusBar);
        this.drawStatusText(this.character.healthPoints, this.ctx, 250, 60);
        this.addToMap(this.coinStatusBar);
        this.drawStatusText(this.character.coins, this.ctx, 250, 135);
        this.addToMap(this.bottleStatusBar);
        this.drawStatusText(this.character.bottles, this.ctx, 250, 210);
    }

    /**
     * Draws the current chicken count
     */
    drawChickenCount() {
        this.drawStatusText("Current chickens: " + this.level.enemies.length, this.ctx, 38, 250);
    }

    /**
     * Draws end boss status if in range
     */
    drawEndbossStatus() {
        if (this.shouldShowEndbossStatus()) {
            this.addToMap(this.endbossStatusBar);
            const health = Math.max(0, this.level.endboss[0].endbossHealth);
            this.drawStatusText(health, this.ctx, 1000, 60);
        }
    }

    /**
     * Checks if end boss status should be shown
     * @returns {boolean}
     */
    shouldShowEndbossStatus() {
        return this.character.positionX >= 8350 ||
            this.level.endboss[0].hasFirstEncounterOccurred;
    }

    /**
     * Draws all game objects with camera offset
     */
    drawGameObjects() {
        this.ctx.translate(this.camPosX, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camPosX, 0);
    }

    /**
     * Adds multiple objects to the game map
     * @param {DrawableObject[]} objects - Array of objects to add
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    /**
     * Adds a single object to the game map
     * @param {DrawableObject} movableObject - Object to add
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }

        movableObject.draw(this.ctx);

        if (movableObject.otherDirection) {
            this.restoreFlippedImage(movableObject);
        }
    }

    /**
     * Flips an image horizontally for opposite direction
     * @param {MovableObject} movableObject - Object to flip
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.positionX = movableObject.positionX * -1;
    }

    /**
     * Restores original image orientation
     * @param {MovableObject} movableObject - Object to restore
     */
    restoreFlippedImage(movableObject) {
        movableObject.positionX = movableObject.positionX * -1;
        this.ctx.restore();
    }

    /**
     * Draws status text on the canvas
     * @param {number} num - Number to display
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} posX - X position of text
     * @param {number} posY - Y position of text
     */
    drawStatusText(num, ctx, posX, posY) {
        ctx.font = "28px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(num, posX, posY);
    }
}