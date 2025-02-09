class Endboss extends MovableObject {
    height = 650;
    width = 450;
    positionY = 50;

    offset = {
        top: 115,
        right: 15,
        bottom: 20,
        left: 30
    };

    state = 'waiting'; // waiting, alert, chasing, hurt, attacking, dead
    firstEncounter = true;
    lastAttackTime = 0;
    attackCoolDown = 5000;
    isPlayingOneTimeAnimation = false;
    attackJumpSpeed = 50;
    attackJumpDistance = 500;
    attackJumpHeight = 300;
    initialAttackPosY = 50;
    isJumping = false;
    hasFirstEncounterOccurred = false;

    ENDBOSS_IMAGES_WALKING_PATH = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    ENDBOSS_IMAGES_ALERT_SEQUENCE_PATH = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    ENDBOSS_IMAGES_ATTACK_PATH = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    ENDBOSS_IMAGES_HURT_PATH = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    ENDBOSS_IMAGES_DEAD_PATH = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super();
        this.loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.ENDBOSS_IMAGES_WALKING_PATH);
        this.loadImages(this.ENDBOSS_IMAGES_ALERT_SEQUENCE_PATH);
        this.loadImages(this.ENDBOSS_IMAGES_ATTACK_PATH);
        this.loadImages(this.ENDBOSS_IMAGES_HURT_PATH);
        this.loadImages(this.ENDBOSS_IMAGES_DEAD_PATH);
        this.positionX = 10000; // 10300
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.state === 'dead') return;

            //Check for first encounter
            if (world.character.positionX > 9000 && this.firstEncounter) {
                this.playAlertSequence();
                this.firstEncounter = false;
            }

            //Handle different states
            switch (this.state) {
                case 'chasing':
                    this.chaseCharacter();
                    this.checkAttackOpportunity();
                    break;

                case 'attacking':
                    if (!this.isPlayingOneTimeAnimation) {
                        this.attackCharacter();
                    }
                    break;

                case 'hurt':
                    if (!this.isPlayingOneTimeAnimation) {
                        this.playHurtAnimation();
                    }
                    break;
            }
        }, 50);
    }

    playAlertSequence() {
        this.state = 'alert';
        this.isPlayingOneTimeAnimation = true;
        this.hasFirstEncounterOccurred = true;
        let currentFrame = 0;

        let alertInterval = setInterval(() => {
            this.playAnimation([this.ENDBOSS_IMAGES_ALERT_SEQUENCE_PATH[currentFrame]]);
            currentFrame++;

            if (currentFrame >= this.ENDBOSS_IMAGES_ALERT_SEQUENCE_PATH.length) {
                clearInterval(alertInterval);
                this.state = 'chasing';
                this.isPlayingOneTimeAnimation = false;
            }
        }, 200);
    }

    chaseCharacter() {
        if (this.positionX > world.character.positionX) {
            this.positionX -= 2;
            this.otherDirection = false;
        } else {
            this.positionX += 2;
            this.otherDirection = true;
        }
        this.playAnimation(this.ENDBOSS_IMAGES_WALKING_PATH);
    }

    checkAttackOpportunity() {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastAttackTime > this.attackCoolDown) {
            this.state = 'attacking';
            this.lastAttackTime = currentTime;
        }
    }

    attackCharacter() {
        if (!this.isJumping) {
            this.isPlayingOneTimeAnimation = true;
            this.isJumping = true;
            let currentFrame = 0;
            let jumpHeight = 0;
            // let startPosY = this.positionY;
            let startPosX = this.positionX;
            let targetPosX = world.character.positionX;
            let jumpDirection = targetPosX > this.positionX ? 1 : -1;

            let attackInterval = setInterval(() => {
                this.playAnimation([this.ENDBOSS_IMAGES_ATTACK_PATH[currentFrame]]);
                currentFrame++;

                if (currentFrame < this.ENDBOSS_IMAGES_ATTACK_PATH.length / 2) {
                    jumpHeight = (currentFrame / (this.ENDBOSS_IMAGES_ATTACK_PATH.length / 2)) * this.attackJumpHeight;
                    this.positionY = this.initialAttackPosY - jumpHeight;
                } else {
                    let fallProgress = (currentFrame - this.ENDBOSS_IMAGES_ATTACK_PATH.length / 2) / (this.ENDBOSS_IMAGES_ATTACK_PATH.length / 2);
                    jumpHeight = (1 - fallProgress) * this.attackJumpHeight;
                    this.positionY = this.initialAttackPosY - jumpHeight;
                }

                this.positionX += jumpDirection * (this.attackJumpDistance / this.ENDBOSS_IMAGES_ATTACK_PATH.length);

                if (currentFrame === Math.floor(this.ENDBOSS_IMAGES_ATTACK_PATH.length / 2)) {
                    if (this.isColliding(world.character)) {
                        world.character.healthPoints -= 20;
                        world.healthStatusBar.setHealthPercentage(world.character.healthPoints);

                        if (world.character.healthPoints <= 0) {
                            world.character.healthPoints = 0;  // Prevent negative health
                            world.gameState = 'lose';
                            world.showLose();
                            clearInterval(attackInterval);  // Stop attack animation
                        }
                    }
                }
    
                if (currentFrame >= this.ENDBOSS_IMAGES_ATTACK_PATH.length) {
                    clearInterval(attackInterval);
                    this.positionY = this.initialAttackPosY;
                    this.state = 'chasing';
                    this.isPlayingOneTimeAnimation = false;
                    this.isJumping = false;
                }
            }, 200);
        }
    }

    playHurtAnimation() {
        this.isPlayingOneTimeAnimation = true;
        let currentFrame = 0;
        
        let hurtInterval = setInterval(() => {
            this.playAnimation([this.ENDBOSS_IMAGES_HURT_PATH[currentFrame]]);
            currentFrame++;
            
            if (currentFrame >= this.ENDBOSS_IMAGES_HURT_PATH.length) {
                clearInterval(hurtInterval);
                this.state = 'chasing';
                this.isPlayingOneTimeAnimation = false;
            }
        }, 200);
    }

    playDeadAnimation() {
        this.state = 'dead';
        this.isPlayingOneTimeAnimation = true;
        let currentFrame = 0;
        
        let deadInterval = setInterval(() => {
            this.playAnimation([this.ENDBOSS_IMAGES_DEAD_PATH[currentFrame]]);
            currentFrame++;
            
            if (currentFrame >= this.ENDBOSS_IMAGES_DEAD_PATH.length) {
                clearInterval(deadInterval);
                setTimeout(() => {
                    world.gameState = 'win';
                    world.showWin();
                }, 2500);
            }
        }, 200);
    }

    hit() {
        if (this.state !== 'dead') {
            this.state = 'hurt';
            this.endbossHealth -= 25;
            if (this.endbossHealth <= 0) {
                this.playDeadAnimation();
            }
        }
    }

    animateWalkingChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_WALKING_PATH);
        }, 200);
    }

    animateAlertChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_ALERT_SEQUENCE_PATH);
        }, 200);
    }

    animateAttackChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_ATTACK_PATH);
        }, 200);
    }

    animateHurtChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_HURT_PATH);
        }, 200);
    }

    animateDeadChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_DEAD_PATH);
        }, 200);
    }
}