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
        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
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

        // Add Images to Map
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        

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
        this.ctx.drawImage(
            movableObject.image,
            movableObject.positionX, 
            movableObject.positionY, 
            movableObject.width, 
            movableObject.height
        );
    }
}