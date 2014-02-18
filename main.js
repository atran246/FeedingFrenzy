var DIR_LEFT = 0;
var DIR_RIGHT = 1;

enchant();

window.onload = function() {
    var game = new Core(640, 640);
    game.fps = 16;
    game.preload('Assets/map0.gif', 'Assets/Fish.png');

    game.onload = function() {
        var bg = new Sprite(640,640);
        var maptip = game.assets['Assets/map0.gif'];
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
        fish.image = game.assets['Assets/Fish.png'];
        fish.x = 320;
        fish.y = 320;
        fish.frame = 1;

        fish.toX = 320;
        fish.toY = 320;
        game.rootScene.addChild(fish);


        /* fish.addEventListener(Event.ENTER_FRAME, function() {
            if (fish.y > fish.toY) {
                move_towards_point(e.pageX, e.pageY,5);
            } else if (fish.y < fish.toY) {
                move_towards_point(e.pageX, mouse_y,5);
                };
            
			if (fish.x > fish.toX) {
                fish.dir = DIR_LEFT;
                move_towards_point(e.pageX, e.pageY,5);
            } else if (fish.x < fish.toX) {
                fish.dir = DIR_RIGHT;
                move_towards_point(e.pageX, e.pageY,5);
                };
           
            //if (fish.x == fish.toX && fish.y == fish.toY) fish.age = 1;
            //fish.frame = fish.anim[fish.dir + (fish.age % 4)];
        }); */


        //create enemy fish
        Enemy = Class.create(Sprite,{
            initialize:function(){
                Sprite.call(this, 63, 47);
                this.image = game.assets['Assets/Fish.png'];
				this.x = 0;
				this.y = Math.floor(Math.random() * 640) - 23;
                game.rootScene.addChild(this);
            }  
        });
        
        enemy = new Enemy();
        enemy.frame = 7;
		

        
        enemy.addEventListener(Event.ENTER_FRAME, function() {
            if (enemy.intersect(fish)){
                game.rootScene.removeChild(enemy);
                enemy.x = -160;
                enemy.y = Math.floor(Math.random() * 640) - 23;
                game.rootScene.addChild(enemy);
            } else if (enemy.x < 700){
                enemy.x += 15;
            } else {
                enemy.x = -20;
				enemy.y = Math.floor(Math.random() * 640) - 23;
            }
            });
        
        
        window.addEventListener("mousemove", function(e) {
            fish.x = e.pageX;
            fish.y = e.pageY;
        });
        
    };    
    game.start();
    
};