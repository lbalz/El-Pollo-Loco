class Chicken extends MovableObject {
    animate(images) {
        setInterval(() => {
            this.movingLeft();

            if(this.positionX < -25) {
                this.positionX += this.randomChickenPosition();
            }
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(images);
        }, 250);
    }

    randomChickenPosition() {
        return 800 + Math.random() * 10000;
    }
}   