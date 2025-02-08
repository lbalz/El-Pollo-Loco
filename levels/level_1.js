let numOfBigChicken = 15; // 15
let numOfLittleChicken  = 15; // 15
let numOfBackgroundObjectGroups = 10;
let numOfClouds = 10;
let numOfCoins = 20;
let numOfBottles = 10;
let imagePositionX = 1079;
let level_1;

function initLevel() {
    level_1 = new Level(
        [
            ...generateBigChicken(numOfBigChicken),
            ...generateSmallChicken(numOfLittleChicken)
        ],
        [
            new Endboss()
        ],
        [
            //TODO: FIX -> Need to Fix Cloud Movement, and generate random posX
            ...generateClouds(numOfClouds)
        ],
        [
            ...generateFirstPlaygroundBGObjectGroupLayer(),
            ...generatePlaygroundBackgroundObjectGroups(numOfBackgroundObjectGroups)
        ],
        [
            ...generateCoins(numOfCoins)
        ],
        [
            ...generateBottles(numOfBottles)
        ]
    );
}

function resetLevel() {
    window.location.reload();
}

function generateBigChicken(num) {
    const bigChicken = [];
    for (let i = 0; i < num; i++) {
        bigChicken.push(new BigChicken());
    }
    return bigChicken;
}

function generateSmallChicken(num) {
    const smallChicken = [];
    for (let i = 0; i < num; i++) {
        smallChicken.push(new SmallChicken());
    }
    return smallChicken;
}

function generateEnemies(num) {
    const enemies = [];
    for (let i = 0; i < num; i++) {
        enemies.push(new Chicken());
    }
    return enemies;
}

function generateClouds(num) {
    const clouds = [];
    for (let i = 0; i < num; i++) {
        clouds.push(new Cloud());     
    }
    return clouds;
}

function generateFirstPlaygroundBGObjectGroupLayer() {
    return [
        new BackgroundObject('./img/5_background/layers/air.png', -1079),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -1079),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -1079),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -1079)
    ];
}

function generatePlaygroundBackgroundObjectGroups(num) {
    const pbgObjectGroups = [];
    for (let i = 0; i < num; i++) {
        const position = imagePositionX * i;


        pbgObjectGroups.push(
            new BackgroundObject('./img/5_background/layers/air.png', position),
            new BackgroundObject(`./img/5_background/layers/3_third_layer/${i % 2 === 0 ? '1.png' : '2.png'}`, position),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/${i % 2 === 0 ? '1.png' : '2.png'}`, position),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/${i % 2 === 0 ? '1.png' : '2.png'}`, position)
        );
    }
    return pbgObjectGroups;
}

function generateCoins(num) {
    const coins = []
    for (let i = 0; i < num; i++) {
        let posX = randomPosXNumber(); // Random number between 1000 - 9000
        let posY = Math.floor(200 + Math.random() * 250); // Random number between 200 - 450
        coins.push(
            new Coin(posX, posY)
        );
        console.log(`Coin Nr. ${i + 1} Pos: `, posX, posY);
    }

    return coins;
}

function generateBottles(num) {
    const bottles = [];
    for (let i = 0; i < num; i++) {
        let posX = randomPosXNumber();
        bottles.push(
            new Bottle(posX)
        );
        console.log(`Bottle Nr. ${i + 1} Pos: `, posX);
    }
    return bottles;
}

function randomPosXNumber() {
    return Math.floor(500 + Math.random() * 8500);
}