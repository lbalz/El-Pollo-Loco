/**
 * @type {number} Number of big chickens to generate in the level
 */
let numOfBigChicken = 15;

/**
 * @type {number} Number of small chickens to generate in the level
 */
let numOfLittleChicken = 15;

/**
 * @type {number} Number of background object groups to generate
 */
let numOfBackgroundObjectGroups = 10;

/**
 * @type {number} Number of clouds to generate in the level
 */
let numOfClouds = 10;

/**
 * @type {number} Number of coins to generate in the level
 */
let numOfCoins = 20;

/**
 * @type {number} Number of bottles to generate in the level
 */
let numOfBottles = 10;

/**
 * @type {number} The width of each background image section
 */
let imagePositionX = 1079;

/**
 * @type {Level} The level instance
 */
let level_1;

/**
 * Initializes the game level by creating all game objects
 * Creates enemies, endboss, clouds, background objects, coins and bottles
 * @returns {void}
 */
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

/**
 * Generates an array of big chicken enemies
 * @param {number} num - The number of big chickens to generate
 * @returns {BigChicken[]} Array of big chicken instances
 */
function generateBigChicken(num) {
    const bigChicken = [];
    for (let i = 0; i < num; i++) {
        bigChicken.push(new BigChicken());
    }
    return bigChicken;
}

/**
 * Generates an array of small chicken enemies
 * @param {number} num - The number of small chickens to generate
 * @returns {SmallChicken[]} Array of small chicken instances
 */
function generateSmallChicken(num) {
    const smallChicken = [];
    for (let i = 0; i < num; i++) {
        smallChicken.push(new SmallChicken());
    }
    return smallChicken;
}

/**
 * Generates an array of standard chicken enemies
 * @param {number} num - The number of chickens to generate
 * @returns {Chicken[]} Array of chicken instances
 */
function generateEnemies(num) {
    const enemies = [];
    for (let i = 0; i < num; i++) {
        enemies.push(new Chicken());
    }
    return enemies;
}

/**
 * Generates an array of cloud objects
 * @param {number} num - The number of clouds to generate
 * @returns {Cloud[]} Array of cloud instances
 */
function generateClouds(num) {
    const clouds = [];
    for (let i = 0; i < num; i++) {
        clouds.push(new Cloud());     
    }
    return clouds;
}

/**
 * Generates the first layer of background objects for the playground
 * @returns {BackgroundObject[]} Array of background objects for the first layer
 */
function generateFirstPlaygroundBGObjectGroupLayer() {
    return [
        new BackgroundObject('./img/5_background/layers/air.png', -1079),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -1079),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -1079),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -1079)
    ];
}

/**
 * Generates multiple layers of background objects for the playground
 * @param {number} num - The number of background object groups to generate
 * @returns {BackgroundObject[]} Array of background object groups
 */
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

/**
 * Generates coins at random positions in the level
 * @param {number} num - The number of coins to generate
 * @returns {Coin[]} Array of coin instances at positions between (500-9000, 200-450)
 */
function generateCoins(num) {
    const coins = []
    for (let i = 0; i < num; i++) {
        let posX = randomPosXNumber(); // Random number between 1000 - 9000
        let posY = Math.floor(200 + Math.random() * 250); // Random number between 200 - 450
        coins.push(
            new Coin(posX, posY)
        );
    }

    return coins;
}

/**
 * Generates bottles at random positions in the level
 * @param {number} num - The number of bottles to generate
 * @returns {Bottle[]} Array of bottle instances at random X positions between 500-9000
 */
function generateBottles(num) {
    const bottles = [];
    for (let i = 0; i < num; i++) {
        let posX = randomPosXNumber();
        bottles.push(
            new Bottle(posX)
        );
    }
    return bottles;
}

/**
 * Generates a random X position for game objects
 * @returns {number} Random X coordinate between 500 and 9000
 * @description Used to position various game objects like coins and bottles in the level
 */
function randomPosXNumber() {
    return Math.floor(500 + Math.random() * 8500);
}