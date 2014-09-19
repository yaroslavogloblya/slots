(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'slots');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":3,"./states/gameover":4,"./states/menu":5,"./states/play":6,"./states/preload":7}],2:[function(require,module,exports){
'use strict';



var Rail = function(game, x, y, l, t) {
   
   this.speed = 1;
   this.accelerate = 0.1;
   this.col=13;
   this.counter=0;
   this.loops = l;
   this.target = t;
   
   
    
   Phaser.Sprite.call(this, game, x, y);
   this.image1 = this.game.add.sprite(x,250, 'icons');
   this.image2 = this.game.add.sprite(x,150, 'icons');
   this.image3 = this.game.add.sprite(x, 50, 'icons');
   this.image1.frame = 0;
   this.image2.frame = 1;
   this.image3.frame = 2;
};

Rail.prototype = Object.create(Phaser.Sprite.prototype);
Rail.prototype.constructor = Rail;
Rail.prototype.finished = function(){
  if(this.speed==0){
    return true;
  } else {
    return false;
  }
}


Rail.prototype.update = function() {
  this.speed += this.accelerate;
  if (this.speed > 10){ 
    this.accelerate=0;
    this.speed = 10;
  }
  this.image1.y += this.speed;
  this.image2.y += this.speed;
  this.image3.y += this.speed;
    
  if (this.image1.y >350){
    this.image1.y=50;
    this.image1.frame+=3;
    if (this.image1.frame>this.col){
      this.counter++;
      this.image1.frame=this.image1.frame % this.col;
    }
  }
    
  if (this.image2.y > 350){
    this.image2.y=50;
    this.image2.frame+=3;
    if (this.image2.frame>this.col){
      this.counter++;
      this.image2.frame=this.image2.frame % this.col;
    }
  }
    
  if (this.image3.y > 350){
    this.image3.y=50;
    this.image3.frame+=3;
    if (this.image3.frame>this.col){
      this.counter++;
      this.image3.frame=this.image3.frame % this.col;
    }
  }   

  if (this.counter==3*this.loops){
    
    if(this.image1.frame==this.target){
      if (this.image1.y==250){
        this.speed=0;
        this.accelerate=0;
      }
    }
    if(this.image2.frame==this.target){
      if (this.image2.y==250){
        this.speed=0;
        this.accelerate=0;
      }
    }
   if(this.image3.frame==this.target){
      if (this.image3.y==250){
        this.speed=0;
        this.accelerate=0;
      }
    }
  } 
};


module.exports = Rail;

},{}],3:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],4:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],5:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],6:[function(require,module,exports){

  'use strict';

var Rail = require('../prefabs/rail');  

  function Play() {}
  Play.prototype = {
    create: function() {


       this.rails = new Array();
       this.numbAr= new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
       this.maxRand=1;
       this.maxCons=1;
       var prev=0;
       var count=0;
       for (var i=0; i<6; i++){
           var randpic=Math.floor(Math.random() * 13);
           this.rails[i] = new Rail(this.game, i*100+50, 100,Math.floor((Math.random() * 5)+1) ,randpic );
           this.numbAr[randpic]++;
           if(this.numbAr[randpic]>this.maxRand){
            this.maxRand=this.numbAr[randpic];
           }
           if (randpic==prev){
            count++;
           } else {
            if (this.maxCons<count){
              this.maxCons=count;
            }
            count=1;
            prev=randpic;
           }
           this.game.add.existing(this.rails[i]);
       }

       this.tr=13; 
       this.game.add.image(0, 0,'top');
       this.game.add.image(0, 350,'top');
       this.button= this.game.add.button(550, 100, 'resetbutton',actionOnClick , this, 0, 0, 0);
       this.score1Text = this.game.add.text(50, 400,"Максимальное количество одинаковых элементов: "+this.maxRand, { font: '20px Arial', fill: '#ffffff', align: 'lesft'});
       this.score2Text = this.game.add.text(50, 430,"Максимальное количество одинаковых элементов, что идут подряд: "+this.maxCons, { font: '20px Arial', fill: '#ffffff', align: 'lesft'});
       this.score1Text.anchor.setTo(0.5, 0.5);
       this.score1Text.anchor.setTo(0, 0);

    },
    update: function() {
      /*попытка вызвать внутреннюю функцию проверки завершения прокрутки
      this.trueCount=0;
      for(i=0;i<6;i++){
        if(this.rail[i].finished){this.trueCount++;}
      }
      */
    }

    
  };
function actionOnClick(){
  this.game.state.start('play')
}

  module.exports = Play;
},{"../prefabs/rail":2}],7:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.spritesheet('resetbutton', 'assets/resetButton.png', 197, 115);
    this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.spritesheet('icons', 'assets/icons.png', 98, 98, 18);
    this.load.image('top', 'assets/bg.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])