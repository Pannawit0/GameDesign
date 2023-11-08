
let ball3, lamp;

function setup() {
	new Canvas(800, 2000);
	world.gravity.y = 8;
	
	// Ball
	let BallGroup = new Group();
	BallGroup.diameter = 50;
	BallGroup.collider = "d"
	BallGroup.color = ('white');

	let ball1 = new BallGroup.Sprite();
	ball1.x = 150;
	ball1.y = 0;

	let ball2 = new BallGroup.Sprite();
	ball2.y = 565;
	ball2.x = 435;

	ball3 = new BallGroup.Sprite();
	ball3.y = 1375;
	ball3.x = 125;

	// Blocks
	let BlockGroup = new Group();
	BlockGroup.width = 200;
	BlockGroup.height = 20;
	BlockGroup.collider = "s";
	BlockGroup.color = ('white');

	let boundary_left = new BlockGroup.Sprite();
	boundary_left.width = 2000;
	boundary_left.x = -10;
	boundary_left.y = 1000;
	boundary_left.rotation = 90;

	let boundary_right = new BlockGroup.Sprite();
	boundary_right.width = 2000;
	boundary_right.x = 810;
	boundary_right.y = 1000;
	boundary_right.rotation = 90;

	let block1 = new BlockGroup.Sprite();
	block1.x = 200;
	block1.y = 200;
	block1.rotation = 25;

	let block2 = new BlockGroup.Sprite();
	block2.x = 400;
	block2.y = 375;
	block2.rotation = -25;

	let block3 = new BlockGroup.Sprite();
	block3.width = 330;
	block3.x = 275;
	block3.y = 600;

	let block4 = new BlockGroup.Sprite();
	block4.width = 150;
	block4.x = 50;
	block4.y = 750;
	block4.rotation = 20;

	let platform3 = new BlockGroup.Sprite();
	platform3.width = 800;
	platform3.x = 100;
	platform3.y = 1700;

	let block5 = new BlockGroup.Sprite();
	block5.width = 150;
	block5.x = 750;
	block5.y = 1000;
	block5.rotation = -20;

	let block6 = new BlockGroup.Sprite();
	block6.width = 150;
	block6.x = 50;
	block6.y = 1500;
	block6.rotation = 20;

	let block7 = new BlockGroup.Sprite();
	block7.width = 20;
	block7.x = 500;
	block7.y = 1380;

	let platform1 = new BlockGroup.Sprite();
	platform1.width = 800;
	platform1.x = 100;
	platform1.y = 1000;

	let platform2 = new BlockGroup.Sprite();
	platform2.width = 400;
	platform2.x = 310;
	platform2.y = 1400;

	// Dominos
	let DominoGroup = new Group();
	DominoGroup.width = 10;
	DominoGroup.height = 50;
	DominoGroup.y = 565;
	DominoGroup.x = 160;
	DominoGroup.collider = "d";
	DominoGroup.color = ('white');

	while (DominoGroup.length < 5) {
		let domino = new DominoGroup.Sprite();
		domino.x = domino.x + (DominoGroup.length * 40);
	}

	let DominoGroup2 = new Group();
	DominoGroup2.width = 10;
	DominoGroup2.height = 50;
	DominoGroup2.y = 565;
	DominoGroup2.x = 160;
	DominoGroup2.collider = "d";
	DominoGroup2.color = ('white');

	while (DominoGroup2.length < 6) {
		let domino = new DominoGroup2.Sprite();
		domino.y = 1375;
		domino.x = 400;
		domino.x = domino.x - (DominoGroup2.length * 40);
	}

	// Lamp
	lamp = new BlockGroup.Sprite();
	lamp.width = 50;
	lamp.height = 50;
	lamp.x = 475;
	lamp.y = 1665;
	lamp.color = ('grey');
}

function draw() {
	background('black');

	// Detect Collision
	if (ball3.collides(lamp)) {
		lamp.color = 'yellow';
	}
}
