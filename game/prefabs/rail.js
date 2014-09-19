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
