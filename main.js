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
		
		game.score = 0;
		scoreLabel = new Label("Score: ");
		scoreLabel.addEventListener('enterframe', function(){
			this.text = "Score:"+game.score;
		});
        scoreLabel.x = 550;
		scoreLabel.color = "black";
		game.rootScene.addChild(scoreLabel);
		
        //create fish
        var fish = new Sprite(63, 47);
        fish.image = game.assets['Assets/Fish.png'];
        fish.x = 320;
        fish.y = 320;
        fish.frame = 0;

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


		function getRandomInt (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
        //create enemy fish
        var enemy = enchant.Class.create(enchant.Sprite,{
            initialize:function(){
                enchant.Sprite.call(this, 63, 47);
                this.image = game.assets['Assets/Fish.png'];
				this.x = getRandomInt(-300,-25);
				this.y = Math.floor(Math.random() * 640) - 23;
				this.frame = Math.floor(Math.random() * 7) + 1;
				this.scale(Math.random() * 2.5)
				
				this.addEventListener(Event.ENTER_FRAME, function() {
					if (this.intersect(fish)){
						game.score += 1;
						fish.scale (1.01, 1.01);
						game.rootScene.removeChild(this);
						//this.x = -160;
						//this.y = Math.floor(Math.random() * 640) - 23;
						//this.frame = Math.floor(Math.random() * 7) + 1; 
						//game.rootScene.addChild(this);
						new enemy();
					} else if (this.x < 700){
						this.x += 15;
					} else {
						this.x = getRandomInt(-300, -25);
						this.y = Math.floor(Math.random() * 640) - 23;
					}
				});
                game.rootScene.addChild(this);
            }  
        });
        
		enemy1 = new enemy();
		enemy2 = new enemy();
		enemy3 = new enemy();

        fish.addEventListener(Event.ENTER_FRAME, function() {
			if(fish.x > 640-63){
				fish.x = 640-63;
			}
			else if(fish.x < 0){
				fish.x = 0;
			}
			else if(fish.y < 0){
				fish.y = 0;
			}
			else if(fish.y > 640-47/2){
				fish.y = 640 - 47;
			}
			
		});
        
        window.addEventListener("mousemove", function(e) {
            fish.x = e.pageX;
            fish.y = e.pageY;
        });
        
    };    
    game.start();
    
};