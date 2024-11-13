class DrawableObject {
    positionX = 120;
    positionY = 280;
    height = 150;
    width = 100;
    image;
    imageCache = {};
    currentImage = 0;




    loadImage(path) {
        this.image = new Image(); // creates new <img> Tag
        this.image.src = path;
    }


    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        console.log(this.imageCache)
    }


    draw(ctx) {
        try {
            ctx.drawImage(
                this.image,
                this.positionX, 
                this.positionY, 
                this.width, 
                this.height
            );
        } catch (error) {
            console.warn('Error loading Image', error);
            console.log('Cant load image', this.image);
        }
    }

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken /*|| this instanceof Endboss*/) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.positionX,
                this.positionY,
                this.width,
                this.height
            );
            ctx.stroke();
        }
    }
}