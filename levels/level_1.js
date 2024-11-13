//TODO: FIX -> Need to fix this count & code to just add like 5/6 chicken and after those 
//TODO: FIX -> got killed, generate new chickens
let numOfEnemies = 15; 
let numOfBackgroundObjectGroups = 10;
let numOfClouds = 10;
let imagePositionX = 1079;


const level_1 = new Level(
    [
        ...generateEnemies(numOfEnemies)
    ],
    [
        //TODO: FIX -> Need to update code to show endboss again, 
        //TODO: FIX -> code doenst match atm, thats why there is no endboss
        new Endboss()
    ],
    [
        //TODO: FIX -> Cloud isnt moving anymore, fix this
        new Cloud()
    ],
    [

        // ...generateFirstPlaygroundBGObjectGroupLayer(),
        ...generatePlaygroundBackgroundObjectGroups(numOfBackgroundObjectGroups)
        //! Hier kann man das evtl. mit einer for loop machen um das lvl variabel groß zu machen
        //! und damit hier nicht so viel code in dem array steht, das ist nicht clean
        
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