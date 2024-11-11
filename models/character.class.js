class Character extends MovableObject {
    positionY = 250; // Standard Y = 250px
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

    PEPE_JUMPING_IMAGE_PATHS = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];

    walkingSound = new Audio('../audio/walking_steps.mp3');
    walkingSoundLoopStart = 3.1;
    walkingSoundLoopEnd = 4;

    jumpingSound = new Audio('../audio/jump.mp3');
    jumpingSoundLoopStart = 0;
    jumpingSoundLoopEnd = 1.5;

    
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.PEPE_WALKING_IMAGE_PATHS);
        this.loadImages(this.PEPE_JUMPING_IMAGE_PATHS);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.walkingSound.currentTime = this.walkingSoundLoopStart;
        this.walkingSound.playbackRate = 2.0;

        this.jumpingSound.currentTime = this.jumpingSoundLoopStart;
        this.jumpingSound.playbackRate = 1.5;
        
        this.walkingSound.addEventListener('timeupdate', () => {
            if (this.walkingSound.currentTime >= this.walkingSoundLoopEnd) {
                this.walkingSound.currentTime = this.walkingSoundLoopStart;
            }
        });

        this.jumpingSound.addEventListener('timeupdate', () => {
            if (this.jumpingSound.currentTime >= this.jumpingSoundLoopEnd) {
                this.jumpingSound.currentTime = this.jumpingSoundLoopStart;
            }
        })

        setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.RIGHT && this.positionX < this.world.level.levelEndPosX) {
                // Character moving to the right
                this.movingRight();
                this.otherDirection = false;
                this.walkingSound.play();
            }
            
            if (this.world.keyboard.LEFT && this.positionX > 0) {
                // Character moving to the left
                this.movingLeft();
                this.otherDirection = true;
                this.walkingSound.play();
            }

            
            if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isNotOnGround()) {
                this.jumpingSound.play();
                this.jump();
                
            }



            this.world.camPosX = -this.positionX + 150;
        }, 1000 / 60);

        setInterval(() => {
            if(this.isNotOnGround()) {
                this.playAnimation(this.PEPE_JUMPING_IMAGE_PATHS);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.PEPE_WALKING_IMAGE_PATHS);
                }
            }
        }, 25);
    }
    
    jump() {
        this.speedPosY = 35;
    }
}