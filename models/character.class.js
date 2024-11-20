class Character extends MovableObject {
    positionY = 255; // Standard Y = 250px
    positionX = 25;
    height = 400;
    width = 200;
    movingSpeed = 15;

    offset = {
        top: 150,
        right: 30,
        bottom: 20,
        left: 30
    };

    world;

    //TODO: -> IDLE ANIMATION muss immer laufen wenn nix passiert, weder dmg noch laufen oder jump

    PEPE_WALKING_IMAGE_PATHS = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    PEPE_JUMPING_IMAGE_PATHS = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    PEPE_DYING_IMAGE_PATHS = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ];

    PEPE_HURT_IMAGE_PATHS = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    PEPE_IDLE_IMAGE_PATHS = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    PEPE_LONG_IDLE_IMAGE_PATHS = [
        './img/2_character_pepe/1_idle/idle/I-11.png',
        './img/2_character_pepe/1_idle/idle/I-12.png',
        './img/2_character_pepe/1_idle/idle/I-13.png',
        './img/2_character_pepe/1_idle/idle/I-14.png',
        './img/2_character_pepe/1_idle/idle/I-15.png',
        './img/2_character_pepe/1_idle/idle/I-16.png',
        './img/2_character_pepe/1_idle/idle/I-17.png',
        './img/2_character_pepe/1_idle/idle/I-18.png',
        './img/2_character_pepe/1_idle/idle/I-19.png',
        './img/2_character_pepe/1_idle/idle/I-20.png',
    ];

    walkingSound = new Audio('./audio/walking_steps.mp3');
    walkingSoundLoopStart = 3.1;
    walkingSoundLoopEnd = 4;

    jumpingSound = new Audio('./audio/jump.mp3');
    jumpingSoundLoopStart = 0;
    jumpingSoundLoopEnd = 1.5;

    
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.PEPE_WALKING_IMAGE_PATHS);
        this.loadImages(this.PEPE_JUMPING_IMAGE_PATHS);
        this.loadImages(this.PEPE_DYING_IMAGE_PATHS);
        this.loadImages(this.PEPE_HURT_IMAGE_PATHS);
        this.loadImages(this.PEPE_IDLE_IMAGE_PATHS);
        this.loadImages(this.PEPE_LONG_IDLE_IMAGE_PATHS);
        this.applyGravity();
        this.animate();
        this.godMode(); // Godmode for developing game without dying and inifite bottles
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
            if (this.world.keyboard.RIGHT && this.positionX < this.world.level.characterLevelEndPosX) {
                // Character moving to the right
                this.movingRight();
                this.otherDirection = false;
                if (!this.isNotOnGround()) {
                    this.walkingSound.play();
                }
                console.log("Current positionX", this.positionX);
            }
            
            if (this.world.keyboard.LEFT && this.positionX > 0) {
                // Character moving to the left
                this.movingLeft();
                this.otherDirection = true;
                if (!this.isNotOnGround()) {
                    this.walkingSound.play();
                }
                console.log("Current positionX", this.positionX);
            }

            
            if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isNotOnGround()) {
                this.jumpingSound.play();
                this.jump();
                
            }

            this.world.camPosX = -this.positionX + 150;
        }, 1000 / 60);

        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.PEPE_DYING_IMAGE_PATHS);
                //! Nur 1x abspielen und dann Game Over screen anzeigen
            } else if (this.isHurt()) {
                this.playAnimation(this.PEPE_HURT_IMAGE_PATHS);
            } else if(this.isNotOnGround()) {
                this.playAnimation(this.PEPE_JUMPING_IMAGE_PATHS);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk animation
                this.playAnimation(this.PEPE_WALKING_IMAGE_PATHS);
            } else {
                this.playAnimation(this.PEPE_IDLE_IMAGE_PATHS);
            }
        }, 50);
    }
    
    jump() {
        this.speedPosY = 35;
    }

    godMode() {
        setInterval( () => {
            this.movingSpeed = 35;
            this.healthPoints = 150;
            this.bottles = 20;
            //TODO: After the implementation of being able to throw only 1 bottle in a sec for e.g.
            //TODO: i need infinite bottles here 
        }, 250);
    }
}