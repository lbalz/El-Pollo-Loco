let numOfEnemies = 15; 
let numOfBackgroundObjectGroups = 10;
let numOfClouds = 10;
let imagePositionX = 1079;

//! TODO: Add coins & Bottles
const level_1 = new Level(
    [
        //TODO: FIX -> Need to fix numOfEnemies count & code to just add like 5/6 chicken 
        //TODO: FIX -> and after those got killed, generate new chickens
        ...generateEnemies(numOfEnemies)
    ],
    [
        //TODO: FIX -> Need to update code to show endboss again, 
        //TODO: FIX -> code doenst match atm, thats why there is no endboss
        //TODO: FIX -> Mby add params to Endboss Class to set hp etc. mby variable,
        //TODO: FIX -> Pos need to be variable to set Endboss pos, which depends on map size
        new Endboss()
    ],
    [
        //TODO: FIX -> Cloud isnt moving anymore, fix this
        new Cloud()
    ],
    [

        //TODO: FIX -> BGObjects loading right, but doenst get shown right, need to fix this
        //TODO: FIX -> mby dont need to load a first layer to add more after this, seems like this
        //TODO: FIX -> is a useless function and can gets deleted?
        // ...generateFirstPlaygroundBGObjectGroupLayer(),
        ...generatePlaygroundBackgroundObjectGroups(numOfBackgroundObjectGroups)
        
        
        // new BackgroundObject('./img/5_background/layers/air.png', -1079),
        // new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -1079),
        // new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -1079),
        // new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -1079),
        // new BackgroundObject('./img/5_background/layers/air.png', 0),
        // new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
        // new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
        // new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
        // new BackgroundObject('./img/5_background/layers/air.png', 1079),
        // new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 1079),
        // new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 1079),
        // new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 1079),
        // new BackgroundObject('./img/5_background/layers/air.png', 1079 * 2),
        // new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 1079 * 2),
        // new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 1079 * 2),
        // new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 1079 * 2),
    ]
);

function generateEnemies(num) {
    const enemies = [];
    for (let i = 0; i < num; i++) {
        enemies.push(new Chicken());
    }
    return enemies;
}

// function generateFirstPlaygroundBGObjectGroupLayer() {
//     return [
//         new BackgroundObject('./img/5_background/layers/air.png', -1079),
//         new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -1079),
//         new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -1079),
//         new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -1079),
//         new BackgroundObject('./img/5_background/layers/air.png', 0),
//         new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
//         new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
//         new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0)
//     ];
// }

function generatePlaygroundBackgroundObjectGroups(num) {
    const pbgObjectGroups = [];
    for (let i = 0; i < num; i++) {
        pbgObjectGroups.push(
            new BackgroundObject('./img/5_background/layers/air.png', imagePositionX * i),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', imagePositionX * i),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', imagePositionX * i),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', imagePositionX * i),
            // new BackgroundObject('./img/5_background/layers/air.png', imagePositionX * (i + 1)),
            // new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', imagePositionX * (i + 1)),
            // new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', imagePositionX * (i + 1)),
            // new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', imagePositionX * (i + 1)),
            // new BackgroundObject('./img/5_background/layers/air.png', imagePositionX * (i + 2)),
            // new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', imagePositionX * (i + 2)),
            // new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', imagePositionX * (i + 2)),
            // new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', imagePositionX * (i + 2)),
            // new BackgroundObject('./img/5_background/layers/air.png', imagePositionX * (i + 3)),
            // new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', imagePositionX * (i + 3)),
            // new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', imagePositionX * (i + 3)),
            // new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', imagePositionX * (i + 3))
        );
    }
    return pbgObjectGroups;
}