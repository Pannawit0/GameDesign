let PlayerSprite, PlayerIdle, PlayerBlock, PlayerDie, PlayerParry, PlayerRun;
let ScoreText, PointText;
let Arrows;
let PlayerHitbox;

let AnimPlaying;
let Alive = true;
let Parrying = false;
let Finished = false;

// Game Config
let Arrow_Amount = 20;
let Parry_Frame = 10;
let Arrow_Rate = 30;
let Block_Point = 25;
let Parry_Point = 100;

function setup(){
	new Canvas(393, 197, 'pixelated');

	let BG = new Sprite(50,25,480,300,'n');
	BG.img = 'Images/Background.png';
	BG.scale = 2.25;

	PlayerIdle = loadAnimation('Images/Idle.png', { frameSize: [32, 32], frames: 4 });
    PlayerIdle.frameDelay = 10;

	PlayerBlock = loadAnimation('Images/Block.png', { frameSize: [32, 32], frames: 2 });
    PlayerBlock.frameDelay = 20;

	PlayerDie = loadAnimation('Images/Die.png', { frameSize: [32, 32], frames: 11 });
    PlayerDie.frameDelay = 8;

	PlayerParry = loadAnimation('Images/Parry.png', { frameSize: [48, 48], frames: 7 });
    PlayerParry.frameDelay = 3;

	PlayerRun = loadAnimation('Images/Run.png', { frameSize: [32, 32], frames: 6 });
    PlayerRun.frameDelay = 7;

	PlayerSprite = new Sprite(100,100,100,100,'k');

    PlayerSprite.x = 125;
    PlayerSprite.y = 123;
	PlayerSprite.scale = 1.8;

	PlayerHitbox = new Sprite(120,120,12,50, 'n');
	PlayerHitbox.visible = false;

	Arrows = new Group();
	Arrows.img = 'Images/Arrow.png';
	Arrows.collider = 'k'
	Arrows.x = 400;
	Arrows.y = () => random(110,123);
	Arrows.scale = 1.75;

	PlayerHitbox.overlaps(Arrows, Process);	
	
	ScoreText = new Sprite(115,85,.1,.1, 'n');
	ScoreText.text = 'Score :';
	ScoreText.textColor = 'White';

	PointText = new Sprite(146,85,.1,.1, 'n'); 
	PointText.text = '0';
	PointText.textColor = 'White';
}

function Process(PlayerHitbox, Arrow) {
	if (Alive == true){
		if (mouse.pressing() && mouse.left > Parry_Frame) { //Block
			Arrow.vel.x = 0;
			Arrow.visible = false;

			PointText.text = int(PointText.text) + Block_Point;

		} else if (mouse.pressing()) { // Parry
			Arrow.visible = false;
			Arrow.vel.x = 0;

			PlayerSprite.addAnimation("Parry", PlayerParry);
			PlayerSprite.animation.play();
	
			PlayerSprite.scale = 1.9;
			PlayerSprite.y = 126;
			
			Parrying = true;
	
			PointText.text = int(PointText.text) + Parry_Point;

		} else if (!mouse.pressing()) { // Nothing (Die)
			Alive = false;
	
			Arrow.visible = false;
			Arrow.vel.x = 0;

			PlayerSprite.addAnimation("Die", PlayerDie);
			PlayerSprite.animation.play();
		}
	}
}

function Anim_Idle(){
	PlayerSprite.addAnimation("Idle", PlayerIdle);
	PlayerSprite.animation.play();
	AnimPlaying = 'Idle';
	PlayerSprite.scale = 1.8;
	PlayerSprite.y = 123;
}

function Anim_Block(){
	AnimPlaying = 'Block';
	PlayerSprite.addAnimation("Block", PlayerBlock);
	PlayerSprite.animation.play();
	PlayerSprite.scale = 2;
	PlayerSprite.y = 119;
}

function Center_Scoreboard(){
	ScoreText.moveTo(190,ScoreText.y, 1.25);
	PointText.moveTo(221,PointText.y, 1.25);
}

function draw(){
	background('gray');

	if (Alive == true){
		if (!mouse.pressing() && AnimPlaying != 'Idle'&& Parrying != true) { // Idle Anim
			Anim_Idle();
		}

		if (frameCount % 30 == 0 && Arrows.length < Arrow_Amount) { // Arrow Loop
			let Arrow =  new Arrows.Sprite();
			Arrow.vel.x = -(random(3,5));
			
		} else if (Arrows.length == Arrow_Amount){
			Finished = true;		
		}
	
		if (Finished == true && frameCount == (Arrow_Rate * Arrow_Amount) + Arrow_Rate * 5){ // Outro
			PlayerSprite.addAnimation("Run", PlayerRun);
			PlayerSprite.animation.play();

			PlayerSprite.scale = 1.8;
			PlayerSprite.y = 123;
			PlayerSprite.vel.x = 4;
					
			Center_Scoreboard();
		}

		if (mouse.released() && Parrying == true) {
			AnimPlaying = 'Parry';
		}
	
		if (mouse.pressing() && AnimPlaying != 'Block' && AnimPlaying != 'Parry' && Finished != true) { // Block Anim
			Anim_Block();
		
		} else if (mouse.pressing() && AnimPlaying == 'Parry' && Finished != true) { 
			Parrying = false;	
			Anim_Block();			
	
		} else if (Parrying == true && PlayerSprite.animation.frame == '6'){ 
			PlayerSprite.animation.stop();
			Parrying = false;
			
			Anim_Block();
		}	

	} else if (Alive == false && PlayerDie.frame == '10') { 
		PlayerDie.stop();

		Center_Scoreboard();
	}	
}