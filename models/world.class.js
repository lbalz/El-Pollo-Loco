class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        //! Hier kann man das evtl. mit einer for loop machen um das lvl variabel groß zu machen
        //! und damit hier nicht so viel code in dem array steht, das ist nicht clean
        new BackgroundObject('../img/5_background/layers/air.png', -1079 * 2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', -1079 * 2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', -1079 * 2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', -1079 * 2),
        new BackgroundObject('../img/5_background/layers/air.png', -1079),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -1079),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -1079),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -1079),
        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/air.png', 1079),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 1079),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 1079),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 1079),
        new BackgroundObject('../img/5_background/layers/air.png', 1079 * 2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 1079 * 2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 1079 * 2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 1079 * 2),
    ]
    canvas;
    ctx;
    keyboard;
    camPosX = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
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
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

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
            this.ctx.save();
            this.ctx.translate(movableObject.width, 0);
            this.ctx.scale(-1, 1);
            movableObject.positionX = movableObject.positionX * -1;
        }

        this.ctx.drawImage(
            movableObject.image,
            movableObject.positionX, 
            movableObject.positionY, 
            movableObject.width, 
            movableObject.height
        );

        if (movableObject.otherDirection) {
            movableObject.positionX = movableObject.positionX * -1;
            this.ctx.restore();
        }
    }
}