class Cloud extends MovableObject {
    positionY = 20;
    width = 500;
    height = 250;
    cloudIntervalID;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');

        this.positionX = Math.random() * 500;
        this.startMovingClouds();
    }

    // 
    startMovingClouds() {
        this.cloudIntervalID = setInterval(() => {
            this.movingClouds();
        }, 1000 / 60);
    }

    movingClouds() {
        this.positionX -= 0.2;

        if(this.positionX < 0) {
            this.positionX += 1060;
        }
    }
}