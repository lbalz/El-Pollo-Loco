class Character extends MovableObject {
    positionY = 250;
    positionX = 25;
    height = 400;
    width = 200;
    movingSpeed = 15;

    world;

    PEPE_WALKING_IMAGE_PATHS = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];

    walkingSound = new Audio('../audio/walking_steps.mp3');
    walkingSoundLoopStart = 3.1;
    walkingSoundLoopEnd = 4;

    
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.PEPE_WALKING_IMAGE_PATHS);
        this.animate();
    }

    animate() {
        this.walkingSound.currentTime = this.walkingSoundLoopStart;
        this.walkingSound.playbackRate = 2.0;
        
        this.walkingSound.addEventListener('timeupdate', () => {
            if (this.walkingSound.currentTime >= this.walkingSoundLoopEnd) {
                this.walkingSound.currentTime = this.walkingSoundLoopStart;
            }
        });

        setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.RIGHT && this.positionX < this.world.level.levelEndPosX) {
                // Character moving to the right
                this.positionX += this.movingSpeed;
                this.otherDirection = false;
                this.walkingSound.play();
            }
            
            if (this.world.keyboard.LEFT && this.positionX > 0) {
                // Character moving to the left
                this.positionX -= this.movingSpeed;
                this.otherDirection = true;
                this.walkingSound.play();
            }
            this.world.camPosX = -this.positionX + 150;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk animation
                let pepeWalkingImagesIndex = this.currentImage % this.PEPE_WALKING_IMAGE_PATHS.length;
                let imagePath = this.PEPE_WALKING_IMAGE_PATHS[pepeWalkingImagesIndex];
                this.image = this.imageCache[imagePath];
                this.currentImage++;
            }
        }, 25);
    }
    
    jump() {

    }
}