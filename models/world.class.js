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
        // this.draw();
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
                    this.showGameOver();
                }

                if (this.level.endboss.length > 0 && this.level.endboss[0].endbossHealth <= 0) {
                    this.gameState = 'win';
                    this.showWin();
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
    //! TODO: Wenn gameover oder gamewin ist muss die steuereung des characters deaktiviert werden

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
                    console.log(this.keyboard);
                }

            } else {
                if (this.keyboard.THROW) {
                    let throwableBottle = new ThrowableObject(this.character.positionX + 125, this.character.positionY + 175, this.character.otherDirection);
                    this.throwableObjects.push(throwableBottle);
                    this.character.bottles -= 1;
                    this.bottleStatusBar.setBottlesPercentage(this.character.bottles);
                    console.log(this.keyboard);
                }
            }
        }
    }

    checkBottleCollisionWithGround() {
        if (this.character.world.throwableObjects.length > 0) {
            this.character.world.throwableObjects.forEach(bottle => {
                if (bottle.positionY >= 560) {
                    let bottleIndex = this.character.world.throwableObjects.indexOf(bottle);
                    this.character.world.throwableObjects.splice(bottleIndex, 1);
                    console.log("Bottle")
                }
            });
        }
    }

    checkBottleCollisionWithChicken() {
        if (this.character.world.throwableObjects.length > 0) {
            this.character.world.throwableObjects.forEach(bottle => {
                this.level.enemies.forEach(enemy => {
                    if (bottle.isColliding(enemy)) {
                        let bottleIndex = this.character.world.throwableObjects.indexOf(bottle);
                        let enemyIndex = this.level.enemies.indexOf(enemy);

                        this.character.world.throwableObjects.splice(bottleIndex, 1);
                        this.level.enemies.splice(enemyIndex, 1);

                        let randomNumber = Math.round(Math.random() * 8); // Random num 1 - 8
                        console.log(randomNumber);
                        if (randomNumber == 8) {
                            this.character.bottles += 1;
                            console.log("Added new Bottle for killing chicken");
                        }
                        console.log("Bottle killed Chicken!");
                    }
                })
            });
        }
    }

    checkBottleCollisionWithEndboss() {
        if (this.character.world.throwableObjects.length > 0) {
            this.character.world.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(this.level.endboss[0])) {
                    let bottleIndex = this.character.world.throwableObjects.indexOf(bottle);
                    this.character.world.throwableObjects.splice(bottleIndex, 1);
                    this.level.endboss[0].endbossHealth -= 25;
                    this.level.endboss[0].animateHurtChickenEndboss();
                    this.endbossStatusBar.setEndbossHealthPercentage(this.level.endboss[0].endbossHealth);

                    if (this.level.endboss[0].endbossHealth <= 0) {
                        this.level.endboss[0].animateDeadChickenEndboss();

                        //! TODO: -> setInterval gibt als return wert eine id wieder, diese interval ID muss gespeichert werden
                        //! TODO: -> und hier dann irgendwie genutzt werden um den interval der animation zu stoppen, vlt kann
                        //! TODO: -> dann dadurch ja die neue animation ablaufen etc.
                        setTimeout(() => {
                            this.level.endboss.splice(1, 1);
                        }, 2500);
                    }
                }
            });
        }
    }

    //TODO: -> Delete throwable object when hit a chicken, the boss or the ground posY = 260ish?
    checkCharacterGotChickenHit() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                // console.log("Character got hit by chicken");
                let currentTime = Date.now();
                if (currentTime - this.lastHitTime > 1000) {
                    this.character.getHit();
                    console.log("Character got hit by chicken");
                    this.healthStatusBar.setHealthPercentage(this.character.healthPoints, this.ctx);
                    this.lastHitTime = currentTime;
                }
            }
        });
    };

    checkCharacterJumpOnChicken() {
        this.level.enemies.forEach(enemy => {
            //! Add that big chickens can drop with a 10% chance a bottle and if there are no chickens left in total, add mby 5 new each
            if (this.character.isColliding(enemy) && this.character.isNotOnGround() && this.character.speedPosY < 0) { // speedY
                let enemieIndex = this.level.enemies.indexOf(enemy);
                this.level.enemies.splice(enemieIndex, 1);

                let randomNumber = Math.round(Math.random() * 8); // Random num 1 - 8
                console.log(randomNumber);
                if (randomNumber == 8) {
                    this.character.bottles += 1;
                    console.log("Added new Bottle for killing chicken");
                }
            }

            //! TODO: -> Need to add and fix that if there are no chickens left, there will be added 5 of each 
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

            //! TODO: -> Endboss needs hp, check where character hp is created etc. pp

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