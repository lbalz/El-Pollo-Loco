class World {
    character = new Character();
    level = level_1;
    canvas;
    ctx;
    keyboard;
    camPosX = 0;
    healthStatusBar = new HealthStatusBar();
    coinStatusBar = new CoinStatusBar();
    bottleStatusBar = new BottleStatusBar();
    endbossStatusBar = new EndbossStatusBar();
    throwableObjects = [];
    lastHitTime = 0;
    gameRunning = false;
    startScreenImage = new Image();
    gameOverScreenImage = new Image();
    winScreenImage = new Image();
    gameState = 'start'; // States: start, running, gameover, win



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadStartAndEndImages();
        this.setWorld();
        this.checkingFunctionLoop();
    }

    loadStartAndEndImages() {
        this.startScreenImage.src = "./img/9_intro_outro_screens/start/startscreen_1.png";
        this.gameOverScreenImage.src = "./img/9_intro_outro_screens/game_over/game over.png";
        this.winScreenImage.src = "./img/9_intro_outro_screens/win/win_2.png";
    }

    setWorld() {
        this.character.world = this;
    }

    checkingFunctionLoop() {
        setInterval(() => {
            if (this.gameState === 'running') {
                this.checkThrowBottle();
                this.checkCharacterGotChickenHit();

                if (this.character.isDead()) {
                    this.gameState = 'gameover';
                    setTimeout(() => {
                        this.showGameOver();
                    }, 50);
                }

                if (this.level.endboss.length > 0 && this.level.endboss[0].endbossHealth <= 0) {
                    this.gameState = 'win';
                    this.level.endboss[0].playDeadAnimation();
                    setTimeout(() => {
                        this.showWin();
                    }, 500);
                }
            }
        }, 100);

        setInterval(() => {
            if (this.gameState === 'running') {
                this.checkCharacterJumpOnChicken();
                this.checkBottleCollisionWithGround();
                this.checkCollectables();
                this.checkBottleCollisionWithChicken();
                this.checkBottleCollisionWithEndboss();
            }
        }, 1000 / 60);
    }

    startGame() {
        this.gameState = 'running';
        this.gameRunning = true;
        this.draw();
    }

    resetGame() {
        window.location.reload();
    }

    showGameOver() {
        this.gameRunning = false;

        let overlay = document.getElementById('overlay');
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.gap = '20px';
        overlay.innerHTML = `
        <img src="${this.gameOverScreenImage.src}" alt="Game Over" style="width: 100%; height: 100%;">
        <button id="resetButton">Reset Game</button>
        `;
        overlay.style.backgroundImage = 'none';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

        let resetButton = document.getElementById('resetButton');
        resetButton.style.display = 'block';
        resetButton.addEventListener('click', () => {
            this.resetGame();
        });
    }
    

    showWin() {
        this.gameRunning = false;

        let overlay = document.getElementById('overlay');
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.gap = '20px';
        overlay.innerHTML = `
        <img src="${this.winScreenImage.src}" alt="Game Over" style="width: 100%; height: 100%;">
        <button id="resetButton">Reset Game</button>
        `;
        overlay.style.backgroundImage = 'none';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

        let resetButton = document.getElementById('resetButton');
        resetButton.style.display = 'block';
        resetButton.addEventListener('click', () => {
            this.resetGame();
        });
    }

    checkThrowBottle() {
        if (this.character.bottles > 0) {
            if (this.character.otherDirection) {
                if (this.keyboard.THROW) {
                    let throwableBottle = new ThrowableObject(this.character.positionX, this.character.positionY + 175, this.character.otherDirection);
                    this.throwableObjects.push(throwableBottle);
                    this.character.bottles -= 1;
                    this.bottleStatusBar.setBottlesPercentage(this.character.bottles);
                }

            } else {
                if (this.keyboard.THROW) {
                    let throwableBottle = new ThrowableObject(this.character.positionX + 125, this.character.positionY + 175, this.character.otherDirection);
                    this.throwableObjects.push(throwableBottle);
                    this.character.bottles -= 1;
                    this.bottleStatusBar.setBottlesPercentage(this.character.bottles);
                }
            }
        }
    }

    checkBottleCollisionWithGround() {
        if (this.character.world.throwableObjects.length > 0) {
            this.character.world.throwableObjects.forEach(bottle => {
                if (bottle.positionY >= 560) {
                    let bottleBreakSound = new Audio('./audio/glass_bottle_destroyed.mp3');
                    bottleBreakSound.currentTime = 0.5;
                    bottleBreakSound.play();
                    let bottleIndex = this.character.world.throwableObjects.indexOf(bottle);
                    this.character.world.throwableObjects.splice(bottleIndex, 1);
                }
            });
        }
    }

    checkBottleCollisionWithChicken() {
        if (this.character.world.throwableObjects.length > 0) {
            this.character.world.throwableObjects.forEach(bottle => {
                this.level.enemies.forEach(enemy => {
                    if (bottle.isColliding(enemy)) {
                        let chickenAudio = new Audio('./audio/chicken.mp3');
                        chickenAudio.play();

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


    checkBottleCollisionWithEndboss() {
        if (this.throwableObjects.length > 0) {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(this.level.endboss[0])) {
                    let chickenAudio = new Audio('./audio/chicken.mp3');
                    chickenAudio.play();
                    
                    let bottleIndex = this.throwableObjects.indexOf(bottle);
                    this.throwableObjects.splice(bottleIndex, 1);
                    this.level.endboss[0].hit();
                    this.endbossStatusBar.setEndbossHealthPercentage(this.level.endboss[0].endbossHealth);
                }
            });
        }
    }

    checkCharacterGotChickenHit() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                let currentTime = Date.now();
                if (currentTime - this.lastHitTime > 1000) {
                    this.character.getHit();
                    this.healthStatusBar.setHealthPercentage(this.character.healthPoints, this.ctx);
                    this.lastHitTime = currentTime;
                }
            }
        });

        if (this.level.endboss.length > 0) {
            let endboss = this.level.endboss[0];
            if (this.character.isColliding(endboss) && endboss.state === 'attacking') {
                let currentTime = Date.now();
                if (currentTime - this.lastHitTime > 1000) {
                    this.character.healthPoints -= 20; // Endboss does more damage
                    this.healthStatusBar.setHealthPercentage(this.character.healthPoints, this.ctx);
                    this.lastHitTime = currentTime;
                }
            }
        }
    };

    checkCharacterJumpOnChicken() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isNotOnGround() && this.character.speedPosY < 0) { // speedY
                let chickenAudio = new Audio('./audio/chicken.mp3');
                chickenAudio.currentTime = 0.5;
                chickenAudio.play();
                
                let enemieIndex = this.level.enemies.indexOf(enemy);
                this.level.enemies.splice(enemieIndex, 1);

                let randomNumber = Math.round(Math.random() * 8); // Random num 1 - 8
                if (randomNumber == 8) {
                    this.character.bottles += 1;
                }
            }

            if (this.level.enemies.length == 0) {
                for (let i = 0; i < 5; i++) {
                    this.addToMap(new BigChicken());
                    this.addToMap(new SmallChicken());
                }
            }
        });
    }

    checkCollectables() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.coinStatusBar.setCoinsPercentage(this.character.coins);

                let coinIndex = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinIndex, 1);
            }
        });

        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.bottleStatusBar.setBottlesPercentage(this.character.bottles);

                let bottleIndex = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(bottleIndex, 1);
            }
        });
    }

    // Function draw to draw all images needed
    draw() {

        // Clear Canvas
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.ctx.translate(this.camPosX, 0);

        // Add Images to Map
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camPosX, 0);

        this.addToMap(this.healthStatusBar);
        this.drawStatusText(this.character.healthPoints, this.ctx, 250, 60);

        this.addToMap(this.coinStatusBar);
        this.drawStatusText(this.character.coins, this.ctx, 250, 135);

        this.addToMap(this.bottleStatusBar);
        this.drawStatusText(this.character.bottles, this.ctx, 250, 210);

        // Chickens left text
        this.drawStatusText("Current chickens: " + this.level.enemies.length, this.ctx, 38, 250);


        if (this.character.positionX >= 8350) { // 8350
            this.addToMap(this.endbossStatusBar);
            if (this.level.endboss[0].endbossHealth > 0) {
                this.drawStatusText(this.level.endboss[0].endbossHealth, this.ctx, 1000, 60);
            } else {
                this.drawStatusText(0, this.ctx, 1000, 60);
            }
        }

        if (this.level.endboss[0].hasFirstEncounterOccurred) {
            this.addToMap(this.endbossStatusBar);
            if (this.level.endboss[0].endbossHealth > 0) {
                this.drawStatusText(this.level.endboss[0].endbossHealth, this.ctx, 1000, 60);
            } else {
                this.drawStatusText(0, this.ctx, 1000, 60);
            }
        }

        this.ctx.translate(this.camPosX, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camPosX, 0);


        // draw() wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    // Draw image canvas function to draw all images in to Map
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }

        movableObject.draw(this.ctx);
        // movableObject.drawOffsetFrame(this.ctx); // Need offset frame for dev mode

        if (movableObject.otherDirection) {
            this.restoreFlippedImage(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.positionX = movableObject.positionX * -1;
    }

    restoreFlippedImage(movableObject) {
        movableObject.positionX = movableObject.positionX * -1;
        this.ctx.restore();
    }

    drawStatusText(num, ctx, posX, posY) {
        // Idee: da die Statusbalken nur alle 20 punkte z.B. ein neues Bild haben
        // evtl. einen Statustext direkt neben dem balken anzeigen wieviel hp punkte, coins oder flaschen man hat
        ctx.font = "28px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(num, posX, posY);
    }
}