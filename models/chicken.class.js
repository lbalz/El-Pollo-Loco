/**
 * Class representing a chicken enemy in the game
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /**
     * Animates the chicken's movement and sprite animation
     * @param {string[]} images - Array of image paths for the animation frames
     */
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

    /**
     * Generates a random position for the chicken respawn
     * @returns {number} Random position between 800 and 10800 pixels
     */
    randomChickenPosition() {
        return 800 + Math.random() * 10000;
    }
}   