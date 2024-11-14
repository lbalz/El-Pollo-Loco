class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    characterLevelEndPosX = 9775;

    constructor(enemies, endboss, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}