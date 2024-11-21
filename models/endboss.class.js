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