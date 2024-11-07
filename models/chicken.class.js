class Chicken extends MovableObject {
    positionY = 540;
    height = 100;
    width = 100;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    
        this.positionX = 200 + Math.random() * 500; // Zahl zwischen 200 - 700
    }
}