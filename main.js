var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP = 2;
var DIR_DOWN = 3;

enchant();

window.onload = function() {
    var game = new Core(640, 640);
    game.fps = 16;
    game.preload('http://enchantjs.com/assets/images/map0.gif', 'Fish.png');

    game.onload = function() {
        var bg = new Sprite(640, 640);
        var maptip = game.assets['http://enchantjs.com/assets/images/map0.gif'];
        var image = new Surface(640, 640);

        for (var j = 0; j < 640; j += 16) {
            for (var i = 0; i < 640; i += 16) {
                image.draw(maptip, 16, 0, 16, 16, i, j, 16, 16);
                // maptip: the preloaded image asset used as the source image
                // 0, 0: coordinates of upper left corner of the source clipping
                // 16, 16: width and height of the source clipping
                // i, j: coorinates of upper left corner of the destination
                // 16, 16: width and height of the destination
            }
        }

        bg.image = image;
        game.rootScene.addChild(bg);

        //create fish
        var fish = new Sprite(63, 47);
        fish.image = game.assets['Fish.png'];
        fish.x = 320 - 16;
        fish.y = 320 - 16;
        fish.frame = 1;

        fish.toX = fish.x;
        fish.toY = fish.y;
        game.rootScene.addChild(fish);


        fish.addEventListener(Event.ENTER_FRAME, function() {
            if (fish.y > fish.toY) {
                fish.dir = DIR_UP;
                if (Math.abs(fish.y - fish.toY) < 6) {
                    fish.y = fish.toY;
                } else {
                    fish.y -= 6;
                }
            } else if (fish.y < fish.toY) {
                fish.dir = DIR_DOWN;
                if (Math.abs(fish.y - fish.toY) < 6) {
                    fish.y = fish.toY;
                } else {
                    fish.y += 6;
                }
            }
            if (fish.x > fish.toX) {
                fish.dir = DIR_LEFT;
                if (Math.abs(fish.x - fish.toX) < 6) {
                    fish.x = fish.toX;
                } else {
                    fish.x -= 6;
                }
            } else if (fish.x < fish.toX) {
                fish.dir = DIR_RIGHT;
                if (Math.abs(fish.x - fish.toX) < 6) {
                    fish.x = fish.toX;
                } else {
                    fish.x += 6;
                }
            }

            if (fish.x == fish.toX && fish.y == fish.toY) fish.age = 1;
            //fish.frame = fish.anim[fish.dir * 4 + (fish.age % 4)];
        });


        bg.addEventListener(Event.TOUCH_END, function(e) {
            fish.toX = e.x - 16;
            fish.toY = e.y - 16;
        });

        bg.addEventListener(Event.TOUCH_MOVE, function(e) {
            fish.toX = e.x - 16;
            fish.toY = e.y - 16;
        });
    };
    game.start();
};