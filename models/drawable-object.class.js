class DrawableObject {
    positionX = 120;
    positionY = 280;
    height = 150;
    width = 100;
    image;
    imageCache = {};
    currentImage = 0;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };


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

    drawOffsetFrame(ctx) {
        if (this instanceof Character || 
            this instanceof Chicken || 
            this instanceof Endboss ||
            this instanceof Coin ||
            this instanceof Bottle) 
            {
                const posX = this.positionX + this.offset.left;
                const posY = this.positionY + this.offset.top;
                const width = this.width - this.offset.left - this.offset.right;
                const height = this.height - this.offset.top - this.offset.bottom;

                ctx.beginPath();
                ctx.lineWidt = '5';
                ctx.strokeStyle = 'red';
                ctx.rect(posX, posY, width, height);
                ctx.stroke();
            }
    }
}