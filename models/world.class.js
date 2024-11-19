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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkingFunctionLoop();
    }

    setWorld() {
        this.character.world = this;
    }

    checkingFunctionLoop() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowBottle();
            this.checkCharacterNearBoss();
            this.checkCharacterGotChickenHit();
        }, 100);

        setInterval(() => {
            this.checkCharacterChickenCollision();
        }, 1000 / 60);
    }

    checkCharacterNearBoss() {
        if (this.character.positionX >= 8350) {
            this.endbossStatusBar 
        }
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

    //TODO: -> Delete throwable object when hit a chicken, the boss or the ground posY = 260ish?
    checkCharacterGotChickenHit() {
        this.level.enemies.forEach( enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.getHit();
                this.healthStatusBar.setHealthPercentage(this.character.healthPoints, this.ctx);
            }
        })
    }

    checkCharacterChickenCollision() {
        this.level.enemies.forEach( enemy => {
            //! Add that big chickens can drop with a 10% chance a bottle and if there are no chickens left in total, add mby 5 new each
            if (this.character.isColliding(enemy) && this.character.isNotOnGround() && this.character.speedPosY < 0) { // speedY
                let enemieIndex = this.level.enemies.indexOf(enemy);
                this.level.enemies.splice(enemieIndex, 1);

                let randomNumber = Math.random() * 10; // Random num 1 - 10
                if (randomNumber == 10) {
                    //TODO: Write new addToMap func which is pretty similar, just to add the bottle at the pos of dead chicken or something
                }
            }
        });
    }

    //! TODO: -> Wie es aussieht werden die chicken nur getroffen wenn man nicht direkt mittig auf sie drauf springt
    checkCollisions() {
        

        this.level.coins.forEach( coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.coinStatusBar.setCoinsPercentage(this.character.coins);

                let coinIndex = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinIndex, 1);

            }
        });

        this.level.bottles.forEach( bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.bottleStatusBar.setBottlesPercentage(this.character.bottles);

                let bottleIndex = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(bottleIndex, 1);
            }
        });


    }

    checkBottleCollisionChicken() {
        this.level.enemies.forEach( (enemy, index) => {
            if (this.world.throwableObjects[index].positionX == enemy.positionX &&
                this.world.throwableObjects[index].positionY == enemy.positionY) 
            {
                //! Delete object but check this function, im not sure if this is the right if condition
            }
        })
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
        this.drawStatusText(this.character.coins, this.ctx, 265, 135);

        this.addToMap(this.bottleStatusBar);
        this.drawStatusText(this.character.bottles, this.ctx, 265, 210);

        // Chickens left text
        this.drawStatusText("Current chickens: " + this.level.enemies.length, this.ctx, 38, 250);

        if (this.character.positionX >= 8350) {
            this.addToMap(this.endbossStatusBar);
            //! TODO: -> Endboss needs hp, check where character hp is created etc. pp
            // this.drawStatusText(this.world.endboss, this.ctx, 265, 210);
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
        movableObject.drawOffsetFrame(this.ctx);

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