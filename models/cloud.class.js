class Cloud extends MovableObject {
    positionY = 20;
    width = 500;
    height = 250;
    cloudIntervalID; // Wird benötigt, wenn cloud animation mit clearInterval() gestoppt werden soll

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');

        this.positionX = Math.random() * 500;
        this.startAnimate();
    }

    // 
    startAnimate() {
        this.movingLeft();
    }
}