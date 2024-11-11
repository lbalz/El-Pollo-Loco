const level_1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ],
    [
        new Cloud()
    ],
    [
        //! Hier kann man das evtl. mit einer for loop machen um das lvl variabel groß zu machen
        //! und damit hier nicht so viel code in dem array steht, das ist nicht clean
        new BackgroundObject('../img/5_background/layers/air.png', -1079 * 2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', -1079 * 2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', -1079 * 2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', -1079 * 2),
        new BackgroundObject('../img/5_background/layers/air.png', -1079),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -1079),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -1079),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -1079),
        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/air.png', 1079),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 1079),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 1079),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 1079),
        new BackgroundObject('../img/5_background/layers/air.png', 1079 * 2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 1079 * 2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 1079 * 2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 1079 * 2),
    ]
);