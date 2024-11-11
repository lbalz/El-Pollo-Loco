class World {
    character = new Character();
    level = level_1;
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

        //! Nochmal genau schauen wo man das so machen kann, dass Pepe nicht außerhalb
        //! des lvls kann und evtl. mit einer if-abfrage testen, dass ab einer gewissen
        //! px pos die cam nicht mehr weiter sich bewegt sondern stoppt
        this.ctx.translate(this.camPosX, 0);

        // Add Images to Map
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

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