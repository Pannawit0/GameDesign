let Bird;
let BirdSprite;
let Burger;

function setup() {
	new Canvas(480, 300, 'pixelated');
	world.gravity.y = 8;

    let BG = new Sprite(100,100,480,300,'n');
    BG.img = 'Images1/Background.jpg';
    BG.scale = .5

    Bird = loadAnimation(
        'Images1/Bird1.png',
        'Images1/Bird2.png',
        'Images1/Bird3.png',
        'Images1/Bird4.png',
        'Images1/Bird5.png',
    );
    
    Bird.frameDelay = 4;

    BirdSprite = new Sprite(100,100,100,100,'k')
    BirdSprite.addAnimation("fly", Bird);
    BirdSprite.x = 240;
    BirdSprite.y = 150;

    
    Burger = new Sprite(100,100,100,100,'n');
    Burger.img = 'Images1/Transparent.png';
    Burger.scale = 1
}

function draw() {
	background(135, 206, 235);    
   
    let Mode = true;

    BirdSprite.animation.play();
    Burger.moveTowards(mouse.x,mouse.y, 1);  

    if (kb.pressing('space')){
        Mode = !Mode
        Burger.img = 'Images1/Burger.png';
    }

    if (kb.released('space')){
        Burger.img = 'Images1/Transparent.png';
    }

    if (Mode == true && sqrt(((mouse.x - BirdSprite.x)^2) + (mouse.y - BirdSprite.y)^2) < 5) {
        BirdSprite.moveTo(random(50,400),random(50,250), 6);      
    } else if (Mode != true){
         BirdSprite.moveTowards(mouse.pos, 0.05);  
    }

    if (BirdSprite.x - mouse.x < 0){

        if (Mode == true){
            BirdSprite.scale.x = 1;
        } else{
            BirdSprite.scale.x = -1;
        }

    } else {
        
        if (Mode == true){
            BirdSprite.scale.x = -1;
        } else{
            BirdSprite.scale.x = 1;
        }

    }
}