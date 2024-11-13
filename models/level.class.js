class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    levelEndPosX = 10000;

    constructor(enemies, endboss, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}