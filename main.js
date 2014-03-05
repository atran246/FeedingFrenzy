//Define Variables for fish direction and speed
var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var speed = 10;

//define variables for enemy fish y position and scale
var newenemyY;
var s;

//Get a Random Integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Get the absolute value of a number	
function abs(x) {
    if (x > 0) {
        return x;
    } else if (x < 0) {
        return -x;
    } else {
        return 0;
    };
}

enchant();

window.onload = function () {
    var game = new Core(750, 420);
    game.fps = 16;
    game.preload('Assets/winner.jpg', 'Assets/loser.jpg', 'Assets/Ocean.jpg',
        'Assets/Fish.png', 'Assets/map0.gif');

    game.onload = function () {
        //Create the background
        var bg = new Sprite(750, 420);
        bg.image = game.assets['Assets/Ocean.jpg'];
        game.rootScene.addChild(bg);

        //Add a score and a label to display the score	
        game.score = 0;
        scoreLabel = new Label("Score: ");
        scoreLabel.addEventListener('enterframe', function () {
            this.text = "Score:" + game.score;
        });
        scoreLabel.x = 550;
        scoreLabel.color = "black";
        game.rootScene.addChild(scoreLabel);

        //Create new images for when the player wins or loses	
        var loser = new Sprite(750, 420);
        loser.image = game.assets['Assets/loser.jpg'];

        var winner = new Sprite(750, 420);
        winner.image = game.assets['Assets/winner.jpg'];

        //create the player fish
        var fish = new Sprite(63, 47);
        fish.image = game.assets['Assets/Fish.png'];
        fish.x = 320;
        fish.y = 320;
        fish.frame = 0;
        fish.scaleX = 1;
        fish.dir = DIR_RIGHT;
        game.rootScene.addChild(fish);



        //create enemy fish class
        var enemy = enchant.Class.create(enchant.Sprite, {
            initialize: function (x, s) {
                enchant.Sprite.call(this, 63, 47);
                this.image = game.assets['Assets/Fish.png'];
                this.x = x;
                this.y = Math.floor(Math.random() * 420) - 47;
                this.frame = Math.floor(Math.random() * 7) + 1;
                this.scale((Math.random() * 2) * abs(fish.scaleX));
                this.scaleX *= s;

                this.addEventListener(Event.ENTER_FRAME, function () {
                    //detect collision with the player
                    if (this.intersectStrict(fish)) {
                        if (abs(fish.scaleX) > abs(this.scaleX)) {
                            game.score += 1;
                            fish.scale(1.01, 1.01);
                            game.rootScene.removeChild(this);
                        } else if (abs(fish.scaleX) < abs(this.scaleX)) {
                            game.rootScene.removeChild(fish);
                            //if the player loses display the losing background and stop the game
                            game.rootScene.addChild(loser);
                            enchant.Core.stop();
                        }
                        //move the other fish depending on their direction
                    } else if (this.scaleX > 0 && this.x < 800) {
                        this.x += speed;
                    } else if (this.scaleX < 0 && this.x > -100) {
                        this.x -= speed;
                    } else {
                        game.rootScene.removeChild(this);
                    }
                });
                game.rootScene.addChild(this);
            }
        });

        //define a function to randomly spawn enemies	
        function spawnEnemy() {
            r = getRandomInt(1, 25);
            if (r === 1) {
                newenemyY = getRandomInt(-300, -25);
                s = 1;
                new enemy(newenemyY, s);
            } else if (r === 2) {
                newenemyY = getRandomInt(800, 1050);
                s = -1;
                new enemy(newenemyY, s);
            }
        }

        //create marker for player fish to follow
        var marker = new Sprite(5, 5);
        marker.image = game.assets['Assets/map0.gif'];
        marker.x = 320;
        marker.y = 320;
        marker.frame = 29;
        game.rootScene.addChild(marker);


        //add an Event listener for the player fish
        fish.addEventListener(Event.ENTER_FRAME, function () {
            if (game.score >= 25) {
                //display the winner background if the player eats 25 enemies and stop the game
                game.rootScene.addChild(winner);
                enchant.Core.stop();
            };

            //detect collision with outer walls of the game
            if (fish.x > 750 - 63) {
                fish.x = 750 - 63;
            } else if (fish.x < 0) {
                fish.x = 0;
            };

            if (fish.y > 420 - 47) {
                fish.y = 420 - 47;
            } else if (fish.y < 0) {
                fish.y = 0;
            };

            //move the player fish to the marker
            if ((abs(fish.y - marker.y)) < speed) {
                fish.y = marker.y;
            } else if (fish.y > marker.y) {
                fish.y -= speed;
            } else if (fish.y < marker.y) {
                fish.y += speed;
            };

            if ((abs(fish.x - marker.x)) < speed) {
                fish.x = marker.x;
            } else if (fish.x > marker.x) {
                if (fish.dir === DIR_RIGHT) {
                    fish.scaleX *= -1;
                    fish.dir = DIR_LEFT;
                };
                fish.x -= speed;
            } else if (fish.x < marker.x) {
                if (fish.dir === DIR_LEFT) {
                    fish.scaleX *= -1;
                    fish.dir = DIR_RIGHT;
                };
                fish.x += speed;
            };

            //spawn enemies while the player fish is in the scene
            spawnEnemy();
        });

        //move the marker to the position of the cursor on the page	
        window.addEventListener("mousemove", function (e) {
            marker.x = e.pageX;
            marker.y = e.pageY;
        });

    };
    game.start();

};