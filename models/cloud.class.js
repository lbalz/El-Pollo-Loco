class Cloud extends MovableObject {
    positionY = 20;
    width = 500;
    height = 250;
    

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.positionX = Math.floor(Math.random() * 9000);
        this.startAnimate();
    }

    // 
    startAnimate() {
        setInterval(() => {
            this.movingLeft();
        }, 1000 / 60);
    }
}