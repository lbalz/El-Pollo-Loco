let numOfBigChicken = 5;
let numOfLittleChicken  = 5;
let numOfBackgroundObjectGroups = 10;
let numOfClouds = 10;
let imagePositionX = 1079;

//! TODO: Add coins & Bottles
const level_1 = new Level(
    [
        //TODO: FIX -> Need to fix numOfEnemies count & code to just add like 5/6 chicken 
        //TODO: FIX -> and after those got killed, generate new chickens
        ...generateEnemies(numOfBigChicken),

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
    ]
);

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