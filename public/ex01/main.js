
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

var lights;
var firstaid;
var firstaidGroup;
var busGroup;
var bus;
var emitters;
var rain;
var platforms;
var player;
var cursors;
var carGroup;
var car;
var stars;
var umbrellas;
var score = 0;
var scoreText;
var button;
var mytime=0;
var total=0;
var signs;
var shops;


var startState = {
   preload: function(){
      game.load.image('city','static/ex01/city2.png');
      game.load.image('startbutton','static/ex01/startbutton.png');
   },
   create: function(){
      //배경 추가
      game.add.sprite(0, 0, 'city');
      //게임 제목 추가
      game.add.button(game.world.centerX-130,310,'startbutton',clickStart);
  function clickStart(){
         game.state.start('main');
      }

   },
};



var mainState = {


   preload:function(){
      game.load.image('city','static/ex01/city.png');
      game.load.image('ground','static/ex01/platform.png');
      game.load.image('star', 'static/ex01/star.png');
      game.load.image('umbrella','static/ex01/umbrella.png');
			game.load.image('rain', 'static/ex01/rain.png');
			game.load.image('firstaid','static/ex01/rain.png');
  		game.load.image('car','static/ex01/car.png');
			game.load.image('sign','static/ex01/sign.png');
			game.load.image('bus','static/ex01/bus.png');
			game.load.image('shop','static/ex01/shop.png');
			game.load.image('light','static/ex01/light.png');
			game.load.spritesheet('teacher','static/ex01/teacher.png',40.5,130);
      game.load.audio('deadS',['static/ex01/dead.mp3','static/ex01/dead.ogg']);
      game.load.audio('coinS',['static/ex01/coin.mp3','static/ex01/coin.ogg']);
      game.load.audio('gamemusic','static/ex01/gamemusic.wav');

   },


create: function () {

   game.world.setBounds(-50,0,1400,600);
   //물리작용 주기
   game.physics.startSystem(Phaser.Physics.ARCADE);

   //배경 추가
   game.add.sprite(0, 0, 'city');

   //효과음 추가
   deadSound = game.add.audio('deadS');
   coinMusic = game.add.audio('coinS');

   //배경음 추가
   music = game.add.audio('gamemusic',1,true);
   music.play('',0,1,true);

   //platforms 그룹 생성
   platforms = game.add.group();
   platforms.enableBody = true;
 	 platforms.createMultiple(8,'ground');



   this.timer = game.time.events.add(0,addfirstledge);
   this.timer = game.time.events.add(0,addSecondLedge);

   //타이머 랜덤숫자 생성
   function randNumber(){
      i = Math.floor((Math.random() * (1+2000-999)) + 999);
      return i;
   }

   this.timer = this.game.time.events.loop(1600,addLS,this);

   function addfirstledge(){
      var ledge1 = platforms.getFirstDead();

      ledge1.reset(200,game.world.height - 20);

      //렛지의 속도를 조절하는거 근데 이거 만지면 자꾸 에러가난다
      ledge1.body.velocity.x = -200;

      ledge1.body.immovable = true;

      //화면에서 더이상 렛지가 보이지 않을때 삭제
      ledge1.checkWorldBounds = true;
      ledge1.outOfBoundsKill = true;

   }

   //second ledge 추가 함수
   function addSecondLedge(){
      var ledge2 = platforms.getFirstDead();
      ledge2.reset(600,game.world.height - 20);

      ledge2.body.velocity.x = -200;

      ledge2.body.immovable = true;

      //화면에서 더이상 렛지가 보이지 않을 때 삭제
      ledge2.checkWorldBounds = true;
      ledge2.outOfBoundsKill = true;

   }

   function addLedge(){
      var ledgeX = this.game.rnd.integerInRange(800,1400);
      var ledge = platforms.getFirstDead();
      ledge.reset(ledgeX,game.world.height - 20);
      //렛지의 속도를 조절한다
      ledge.body.velocity.x = -200;

      ledge.body.immovable = true;

  		//화면에서 더이상 렛지가 보이지 않을 때 삭제
      ledge.checkWorldBounds = true;
      ledge.outOfBoundsKill = true;

   }



   //메인 캐릭터 추가


		  firstaidGroup = game.add.group();
			firstaidGroup.enableBody=true;
			firstaidGroup.createMultiple(100,'firstaid');


			firstaidGroup = this.add.group();
			firstaidGroup.enableBody = true;
			firstaidGroup.physicsBodyType = Phaser.Physics.ARCADE;
			firstaidGroup.createMultiple(50, 'firstaid');
			firstaidGroup.setAll('anchor.x', 0.5);
			firstaidGroup.setAll('anchor.y', 0.5);
			firstaidGroup.setAll('outOfBoundsKill', true);
			firstaidGroup.setAll('checkWorldBounds', true);
			this.nextfirstaidAt = 0;
			this.firstaidDelay = 1000;



   function addstar(){
	      var starNum = this.game.rnd.integerInRange(2,8);
	      var starX = this.game.rnd.integerInRange(800,1400);
	      var starY = this.game.rnd.integerInRange(game.world.height - 220,game.world.height - 350);
	      for(var i = 1;i < starNum; i++){
	         var star = stars.create(i*50+starX,starY,'star');
	         star.body.velocity.x = -200;
	         star.body.immoveable = true;
	         star.checkWorldBounds = true;
	         star.outOfBoundsKill = true;
					 star.body.gravity.y = 110;

      }

   }
			 shops =  game.add.group();
			 shops.enableBody = true;
			 shops.createMultiple(5,'shop');

			 signs =  game.add.group();
			 signs.enableBody = true;
			 signs.createMultiple(5,'sign');

			 carGroup = game.add.group();
		   carGroup.enableBody = true;
		   carGroup.createMultiple(10,'car');

			 busGroup = game.add.group();
		   busGroup.enableBody = true;
		   busGroup.createMultiple(10,'bus');

			 lights =  game.add.group();
		   lights.enableBody = true;
		   lights.createMultiple(5,'light');

		   stars = game.add.group();
		   stars.enableBody = true;

		   umbrellas =  game.add.group();
		   umbrellas.enableBody = true;
		   umbrellas.createMultiple(5,'umbrella');

	 player = game.add.sprite(32,game.world.height - 400,'teacher');



   //캐릭터에게 물리규칙을 적용한다
		   game.physics.arcade.enable(player);
       player.body.bounce.y = 0.2;
		   player.body.gravity.y = 500;



   //캐릭터의 왼쪽 오른쪽 이미지
			 player.animations.add('left',[12,13,14,15,16,17],10,true);
			 player.animations.add('right',[18,19,20,21,22,23],10,true);

   function addLS(){
	      addLedge();
	      addstar();
	      pickOne();
	      }

   //배경 비
			 var emitters = game.add.emitter(game.world.centerX, 100, 5);
			 //비양조절

			 emitters.width = game.world.width;


			 emitters.makeParticles('rain');

			 emitters.minParticleScale = 0.4;
			 emitters.maxParticleScale = 0.5;
       game.physics.arcade.enable('rain');
			 emitters.setYSpeed(300, 500);
			 emitters.setXSpeed(-10, 10);

			 emitters.minRotation = 0;
			 emitters.maxRotation = 0;

			 emitters.start(false, 1000, 2, 0);



   //this is function to deciced 1-5 car,6-8 nothing,9-10 items
   function pickOne(){
	      gamenumber = this.game.rnd.integerInRange(1,10);
      //car come owow



      //아이템
      if(gamenumber == 9){
         var umbrellaX = this.game.rnd.integerInRange(800,1400);
         umbrella = umbrellas.getFirstDead();
         umbrella.reset(umbrellaX,game.world.height - 300)
         game.physics.arcade.enable(umbrella);
         umbrella.body.gravity.y= 500;
         umbrella.checkWorldBounds = true;
         umbrella.outOfBoundsKill = true;
			 }
		 if(gamenumber == 5){
				 var signX = this.game.rnd.integerInRange(800,1400);
				 sign = signs.getFirstDead();
				 sign.reset(signX,game.world.height - 300)
				 game.physics.arcade.enable(sign);
				 sign.body.gravity.y= 500;
				 sign.checkWorldBounds = true;
				 sign.outOfBoundsKill = true;
		   }
	   if(gamenumber == 4){
         var shopX = this.game.rnd.integerInRange(800,1400);
         shop = shops.getFirstDead();
         shop.reset(shopX,game.world.height - 300)
         game.physics.arcade.enable(shop);
         shop.body.gravity.y= 500;
         shop.checkWorldBounds = true;
         shop.outOfBoundsKill = true;
      }
		 if(gamenumber == 3){
				 var busX = this.game.rnd.integerInRange(800,1400);
				 bus = busGroup.getFirstDead();
				 bus.reset(busX,game.world.height - 300);




		 //player.body.collideWorldBounds = true;

		 //left and right image
				 bus.body.bounce.y = 0.2;
				 bus.body.gravity.y = 500;
				 bus.animations.add('left',[0,1],10,true);
				 bus.body.velocity.x = -50;
				 bus.animations.play('left');
				 bus.body.immoveable = true;
				 bus.checkWorldBounds = true;
				 bus.outOfBoundsKill = true;
		 }

		 if(gamenumber == 7){
				 var lightX = this.game.rnd.integerInRange(800,1400);
				 light = lights.getFirstDead();
				 light.reset(lightX,game.world.height - 300)
				 game.physics.arcade.enable(light);
				 light.body.gravity.y= 500;
				 light.checkWorldBounds = true;
				 light.outOfBoundsKill = true;
		}

	   if(gamenumber == 1,2){
				 var carX = this.game.rnd.integerInRange(800,1400);
				 car = carGroup.getFirstDead();
				 car.reset(carX,game.world.height - 300);



				 car.body.bounce.y = 0.2;
				 car.body.gravity.y = 500;
				 car.animations.add('left',[0,1],10,true);
				 car.body.velocity.x = -50;
				 car.animations.play('left');
				 car.body.immoveable = true;
				 car.checkWorldBounds = true;
				 car.outOfBoundsKill = true;
			}

   }



   // 스코어
  	scoreText = game.add.text(124, 61, '0', { fontSize: '32px', fill: '#000' });
    cursors = game.input.keyboard.createCursorKeys();

},

update:function() {


	 if (this.nextfirstaidAt < this.time.now && firstaidGroup.countDead() > 0) {
				this.nextfirstaidAt = this.time.now + this.firstaidDelay;
				var firstaid = firstaidGroup.getFirstDead(false);
				// spawn at a random location top of the screen
				firstaid.reset(this.rnd.integerInRange(20, 1000), 0);
				// also randomize the speed
				firstaid.body.velocity.y = this.rnd.integerInRange(40, 100);
				firstaid.play('firstaid'); }


   // 플레이어가 세계안에 있지 않다면 죽음->리스타트를 불러온다
   if (player.inWorld == false){
        deadSound.play();
      	music.stop();
      	game.state.start("end");

   }


   //플레이어를 렛지위에 있게 한다
	 game.physics.arcade.collide(signs,platforms);
	 game.physics.arcade.collide(shops,platforms);
	 game.physics.arcade.collide(player,platforms);
   game.physics.arcade.collide(stars,platforms);
   game.physics.arcade.overlap(player,stars,collectStar,null,this);
   game.physics.arcade.collide(player,firstaidGroup,raindropkill,null,this);
   game.physics.arcade.collide(carGroup,platforms);
   game.physics.arcade.collide(player,carGroup,killplayer,null,this);
	 game.physics.arcade.collide(busGroup,platforms);
   game.physics.arcade.collide(player,busGroup,killplayer3,null,this);
	 game.physics.arcade.overlap(lights,player);
   game.physics.arcade.collide(lights,platforms);
   game.physics.arcade.collide(umbrellas,platforms);
   game.physics.arcade.overlap(player,umbrellas,umbrellaCollect);


   player.body.velocity.x = 0;



   if(cursors.left.isDown){
      //왼쪽으로 이동
      player.body.velocity.x=-200;
      player.animations.play('left');
   }


   if(cursors.right.isDown){
		  //오른쪽으로 이동
      player.body.velocity.x = 170;
      player.animations.play('right');
   }


   //땅에 닿아야지만 점프할 수 있게
   if(cursors.up.isDown && player.body.touching.down){

      player.body.velocity.y = -400;
   }


   if(score > 1000){
      platforms.setAll('body.velocity.x',-300);
   }

   if(score > 2000){
      platforms.setAll('body.velocity.x',-400);
   }


   function collectStar (player, star) {

      //코인배경음 재생
      coinMusic.play();
       //스크린에서 별을 지운다
      star.kill();

      //스코어 추가,갱신
      score += 10;
      scoreText.text = '' + score;

      }


   function raindropkill (player,firstaid){


			player.kill();
			deadSound.play();
			music.stop();
			game.state.start("end")


  }

   //플레이어와 몬스터에 대한 함수
   function killplayer(player,car){
		  //몬스터 바디의 위를 터치하면 = 몬스터가 죽는다,스코어+25
      if(car.body.touching.up){
         car.kill();
         score += 25;
         scoreText.text = '' + score;
      }
      else{
			//아니라면 플레이어가 죽는다
		     deadSound.play();
		     music.stop();
		     game.state.start("end")
      }

   }

	 function killplayer3(player,bus){

	       if(bus.body.touching.up){
	          bus.kill();
	          score += 25;
	          scoreText.text = score;
	       }
	       else{
			      deadSound.play();
			      music.stop();
			      game.state.start("end")
	       }

	    }



   function umbrellaCollect(player,umbrellas){
      coinMusic.play();
      umbrellas.kill();
      //스코어 +100
      score += 100;
      scoreText.text = '' + score;

			timers = game.time.events.loop(4000, reSize, this);


			player.animations.add('left',[0,1,2,3,4,5],10,true);
	 	  player.animations.add('right',[6,7,8,9,10,11],10,true);




   }


	 function reSize() {

		game.time.events.remove(timers);

	  player.animations.add('left',[12,13,14,15,16,17],10,true);
	  player.animations.add('right',[18,19,20,21,22,23],10,true);

	    }


   },
};



//gameover state called 'end'
var endState ={
   preload: function(){
   game.load.image('gameover','static/ex01/gameover.jpg');
   //*********image too large need to small it find how
   game.load.image('retry','static/ex01/retry.png');
   game.load.audio('deadM','static/ex01/deadmusic.wav');
   },
   create: function(){
   //add background
	 game.add.sprite(0, 0, 'gameover');
   //add retry button
   button=game.add.button(270,410,'retry',clickAction);
   //show game over

   //show the score you get
   game.add.text(335, 350, scoreText.text, { fontSize: '32px', fill: '#000' });

   //add sound
   deadMusic = game.add.audio('deadM');
   deadMusic.play();
   function clickAction (){
   score = 0
   deadMusic.stop();
   game.state.start('main');
      }
   }

};

game.state.add('start',startState);
game.state.add('main',mainState);
game.state.add('end',endState);
game.state.start('start');
