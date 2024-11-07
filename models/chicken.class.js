class Chicken extends MovableObject {
    positionY = 295;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    
        this.positionX = 200 + Math.random() * 500; // Zahl zwischen 200 - 700
    }
}