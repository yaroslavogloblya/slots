
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