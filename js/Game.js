var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
    create: function() {

        //  A simple background for our game
        this.game.add.sprite(0, 0, 'sky');


        this.planets = this.game.add.group();
        this.planet = this.planets.create(200, 300, 'planet');
        this.planet.anchor.setTo(0.5);

        this.planet2 = this.planets.create(500, 400, 'planet');
        this.planet2.anchor.setTo(0.5);

        this.ship = this.game.add.sprite(700, 500, 'ship');
        this.game.physics.arcade.enable(this.ship);
        this.ship.immovable = true;
        this.ship.body.moves = false;
        this.ship.body.setSize(70, 100, 23, 37);
        this.ship.anchor.setTo(0.5);

        this.player = this.game.add.sprite(100, 100, 'player');
        //this.player.frame = 1; 
        this.player.anchor.setTo(0.5);

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);
        //this.game.camera.setSize(this.game.world.width, this.game.world.height);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0;
        this.player.body.velocity.y = 0;// + this.game.rnd.integerInRange(0, 50);
        this.player.body.velocity.x = 0;// + this.game.rnd.integerInRange(0, 50);
        this.player.anchor.setTo(0.5);
        this.player.body.collideWorldBounds = false;
        this.player.scale.setTo(0.3);

        this.player.animations.add('swim', [1,2], 10, true);
        this.player.animations.play('swim');

        //  The score
        this.instruction = 'Send the spaceman to his spaceship!\nHold mouse to set speed - and release button to release the space man';
        this.scoreText = this.game.add.text(16, 16, this.instruction, { fontSize: '16px', fill: '#f88' });
        //this.scoreText.visible = false;
        this.speedX = 0;
        this.speedY = 0;

        //  Our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.timer = 0;
        this.state = 1;

        this.showDebug = false; 

        if (this.showDebug) {
        // add a new graphics object at the center of the worldvar 
        this.circles = this.game.add.graphics(this.planet.x, this.planet.y);
        // add first 1px wide unfilled red circle with a radius of 50 at the center (0, 0) of the graphics 
        this.circles.lineStyle(1, 0xff0000);
        this.circles.drawCircle(0, 0, 100);
        // add the second 1px wide unfilled green circle with a radius of 100
        this.circles.lineStyle(1, 0x00ff00);
        this.circles.drawCircle(0, 0, 200);
        // and finally add the third 1px wide unfilled blue circle with a radius of 150
        this.circles.lineStyle(1, 0x0000ff);
        this.circles.drawCircle(0, 0, 300);
        }
    },

    update: function() {
//        this.circles.drawCircle(this.player.x - this.planet.x, this.player.y - this.planet.y, 1);
        this.timer++;
        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(this.player, this.planets);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.game.physics.arcade.overlap(this.player, this.ship, this.win, null, this);

        this.speedX = this.game.input.x - 400;

        this.speedY = this.game.input.y - 300;
        this.speedY ++;
        this.scoreText.text = this.instruction
        + "\n" + "                                     Horizontal speed: " + this.speedX
        + "\n" + "                                     Vertical speed: " + this.speedY; 

    if (this.game.input.mousePointer.isDown && this.state == 1) {
        this.state++;
    }

    if (this.game.input.mousePointer.isUp && this.state == 2) {
        this.state++;
        this.player.body.velocity.x = this.speedX;
        this.player.body.velocity.y = this.speedY;
    }
        var GRAVITATIONAL_CONSTANT = 150; /* this depends on what feels right for your game */;
this.planet.mass = 100; /* this depends on what feels right for your game */;
this.planet2.mass = 100; /* this depends on what feels right for your game */;

//for each (var projectile in projectiles) {    
    projectile = this.player;
    this.planets.forEach(function(planet) {
    //    planet = this.planet;
    if (this.distanceBetweenTwoPoints(this.player, planet) < 220) {
    
        var dx = planet.x - projectile.x;        
        var dy = planet.y - projectile.y;        
        var distanceSquared = dx * dx + dy * dy;        
        var distance = Math.sqrt(distanceSquared);        
        var acceleration = GRAVITATIONAL_CONSTANT * planet.mass / distanceSquared;        
        console.log(acceleration * (dx / distance));
        this.player.body.velocity.x += acceleration * (dx / distance);        
        this.player.body.velocity.y += acceleration * (dy / distance);    
    }
    }, this);    


    },


    win: function() {
        this.scoreText.text = "You win!";
        this.scoreText.visible = true;
        this.game.paused = true;
    },


    render: function() {

        if (this.showDebug) {
            this.game.debug.body(this.star);
            this.game.debug.body(this.player);
        }
    },

    distanceBetweenTwoPoints: function(a, b) {
        var xs = b.x - a.x;
        xs = xs * xs;

        var ys = b.y - a.y;
        ys = ys * ys;

        return Math.sqrt(xs + ys);
    },
};