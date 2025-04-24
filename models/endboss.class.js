/**
 * Class representing the end boss enemy in the game
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /** @type {number} Height of the end boss sprite in pixels */
    height = 650;

    /** @type {number} Width of the end boss sprite in pixels */
    width = 450;

    /** @type {number} Vertical position of the end boss */
    positionY = 50;

    /** 
     * @type {Object} Collision offset values for the end boss
     * @property {number} top - Top offset for collision detection
     * @property {number} right - Right offset for collision detection
     * @property {number} bottom - Bottom offset for collision detection
     * @property {number} left - Left offset for collision detection
     */
    offset = {
        top: 115,
        right: 15,
        bottom: 20,
        left: 30
    };

    /** @type {string} Current state of the end boss (waiting, alert, chasing, hurt, attacking, dead) */
    state = 'waiting';

    /** @type {boolean} Whether this is the first encounter with the player */
    firstEncounter = true;

    /** @type {number} Timestamp of the last attack */
    lastAttackTime = 0;

    /** @type {number} Cooldown period between attacks in milliseconds */
    attackCoolDown = 5000;

    /** @type {boolean} Whether a one-time animation is currently playing */
    isPlayingOneTimeAnimation = false;

    /** @type {number} Speed of the jump during attack */
    attackJumpSpeed = 50;

    /** @type {number} Horizontal distance covered during attack jump */
    attackJumpDistance = 500;

    /** @type {number} Maximum height of the attack jump */
    attackJumpHeight = 300;

    /** @type {number} Initial Y position for attack calculations */
    initialAttackPosY = 50;

    /** @type {boolean} Whether the boss is currently jumping */
    isJumping = false;

    /** @type {boolean} Whether the first encounter has occurred */
    hasFirstEncounterOccurred = false;

    /** @type {string[]} Array of image paths for walking animation */
    ENDBOSS_IMAGES_WALKING_PATH = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /** @type {string[]} Array of image paths for alert sequence */
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

    /** @type {string[]} Array of image paths for attack animation */
    ENDBOSS_IMAGES_ATTACK_PATH = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /** @type {string[]} Array of image paths for hurt animation */
    ENDBOSS_IMAGES_HURT_PATH = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /** @type {string[]} Array of image paths for death animation */
    ENDBOSS_IMAGES_DEAD_PATH = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates a new end boss instance and initializes animations
     */
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

    /**
     * Main animation loop for the end boss
     * Handles state changes and corresponding behaviors
     */
    animate() {
        setInterval(() => {
            if (this.state === 'dead') return;

            if (world.character.positionX > 9000 && this.firstEncounter) {
                this.playAlertSequence();
                this.firstEncounter = false;
            }

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

    /**
     * Plays the alert animation sequence when first encountering the player
     */
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

    /**
     * Makes the end boss chase the player character
     * Updates position and animation based on player location
     */
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

    /**
     * Checks if the boss can perform an attack based on cooldown
     */
    checkAttackOpportunity() {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastAttackTime > this.attackCoolDown) {
            this.state = 'attacking';
            this.lastAttackTime = currentTime;
        }
    }

    /**
     * Executes the attack animation and damage calculation
     * Includes jump arc calculation and collision detection
     */
    attackCharacter() {
        if (!this.isJumping) {
            this.isPlayingOneTimeAnimation = true;
            this.isJumping = true;
            let currentFrame = 0;
            let jumpHeight = 0;
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

    /**
     * Plays the hurt animation when the boss takes damage
     */
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

    /**
     * Plays the death animation and triggers win condition
     */
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

    /**
     * Handles damage taken by the end boss
     * Triggers hurt state and checks for death condition
     */
    hit() {
        if (this.state !== 'dead') {
            this.state = 'hurt';
            this.endbossHealth -= 25;
            if (this.endbossHealth <= 0) {
                this.playDeadAnimation();
            }
        }
    }

    /**
     * Animates the walking state
     */
    animateWalkingChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_WALKING_PATH);
        }, 200);
    }

    /**
     * Animates the alert state
     */
    animateAlertChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_ALERT_SEQUENCE_PATH);
        }, 200);
    }

    /**
     * Animates the attack state
     */
    animateAttackChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_ATTACK_PATH);
        }, 200);
    }

    /**
     * Animates the hurt state
     */
    animateHurtChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_HURT_PATH);
        }, 200);
    }

    /**
     * Animates the dead state
     */
    animateDeadChickenEndboss() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_IMAGES_DEAD_PATH);
        }, 200);
    }
}