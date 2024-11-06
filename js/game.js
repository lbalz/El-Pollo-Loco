let canvas;
let world;

// drawImage(img, x, y, width, height)

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log(world.character, world.enemies);

    // character.src = '../img/2_character_pepe/2_walk/W-21.png'
    // ctx.drawImage(character, 50, 20, 50, 150);
}