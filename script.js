let plats=[];
let coins=[];
let jim;
let score=0;
let color;
let bg;
let csprite;
let sprite;
let g=0.2;
let d;
let gamestate="title";
let title;
let win;
let loss;

function preload(){
	bg=loadImage("https://cdn.glitch.com/f3153797-32fb-4ded-bb9d-20975e419671%2Fminimalist-rider-ghost-wallpaper-desktop-wallpapers.jpg?1511289421363");
	title=loadImage("https://cdn.glitch.com/f3153797-32fb-4ded-bb9d-20975e419671%2Fgame-dev-startscreen-01.png?1511628691331");
	win=loadImage("https://cdn.glitch.com/f3153797-32fb-4ded-bb9d-20975e419671%2Fws.png?1511629985411");
	loss=loadImage("https://cdn.glitch.com/f3153797-32fb-4ded-bb9d-20975e419671%2Fls.png?1513538635616");
	sprite=loadImage("https://cdn.glitch.com/f3153797-32fb-4ded-bb9d-20975e419671%2Fsprite.png?1512066872238");
	csprite=loadImage("https://cdn.glitch.com/f3153797-32fb-4ded-bb9d-20975e419671%2Fbitcoin%20cash.png?1513620274995")
}


function setup() {
	createCanvas((windowWidth-20),(windowHeight-20));
	let x=random(10,30);
	let y=random(0,15);
	for (let i=0; i<x; i++){
		plats[i]=new Platform(random(10,windowWidth-25),random(10,windowHeight-25),random(10,200),20,random(0,255),random(0,255),random(0,255));
		coins[i]=new coin((plats[i].x+(plats[i].w/2)),(plats[i].y-10));
	}
	jim=new Hero(0,0,20,50,random(10,25),20);
	console.log("up up down down left right left right b a start");
}

function draw(){
	if(gamestate=="title"){
		background(title);
	}
	else if(gamestate=="ingame"){
		background(bg);
		text("score: "+score,10,10);
		jim.move();
		jim.show();
		jim.checkX(windowWidth-20);
		jim.checkY(windowHeight-20);
		drawAll();
		coinsheck();
		if(score>=20){
			gamestate="win"
		}
		if (score<=-10) {
			gamestate="loss"
		}
	}
	else if(gamestate=="win"){
		background(win);
		score=0;
	}
	else if(gamestate=="loss"){
		background(loss);
		score=0;
	}
}

 function mousePressed(){
	if(gamestate=="title"){
		gamestate="ingame"
	}
	else if(gamestate=="win"){
		gamestate="title"
	}
	else if(gamestate=="loss"){
		gamestate="title"
	}
 }

function coinsheck(){
	for(let i=0; i<coins.length; i++){
		let d=dist(coins[i].x,coins[i].y,jim.x,jim.y)
		if(d<coins[i].r){
			coins.splice(i,1);
			score++;
		}
	}
}

function resetScreen(){
	let x=random(10,30);
	plats=[];
	coins=[];
	for (let i=0; i<x; i++){
			plats[i]=new Platform(random(10,windowWidth-25),random(10,windowHeight-25),random(10,200),20,random(0,255),random(0,255),random(0,255));
			coins[i]=new coin((plats[i].x+(plats[i].w/2)),(plats[i].y-10));
	}
}

function drawAll(){
	for(let i=0; i<plats.length; i++){
		plats[i].show();
	}
	for(let i=0;i<coins.length;i++){
		coins[i].show();
	}
}

class coin{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.r=25;
	}

	show(){
		image(csprite,this.x-15,this.y-16);
	}
}

class Platform{
	constructor(x,y,w,h,r,g,b){
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		this.r=r;
		this.g=g;
		this.b=b;
	}

	show(){
		//stroke(255);
		//strokeWeight(4);
		fill(this.r,this.g,this.b);
		rect(this.x, this.y, this.w, this.h)
	}

	contains(givenX,givenY){
		return givenX>this.x && givenX<this.x+this.w && givenY>this.y && givenY<this.y+this.h;
	}
}

class Hero{
	constructor(xv,yv,x,y,w,h){
		this.xv=xv;
		this.yv=yv;
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		color=(random(0,255),random(0,255),random(0,255));

	}

	move(){
		//basic movement
		if(keyIsDown(DOWN_ARROW)){
					this.y+=3;
		}
		//velocity stufs
		if(this.touchingPlats()==false){
			//hero in air
			if(keyIsDown(LEFT_ARROW)){
				this.x-=3;
			}

			if(keyIsDown(RIGHT_ARROW)){
				this.x+=3;
			}
			this.yv+=g;
			this.y+=this.yv;
			if(this.y>=windowHeight){
				this.yv=0;
			}
		}
		else{
			//hero on platform
			//left/right move on platform
			this.yv=0;
			this.y++;
			if(keyIsDown(LEFT_ARROW)){
				this.x-=6;
			}

			if(keyIsDown(RIGHT_ARROW)){
				this.x+=6;
			}
			//jump
			if(keyIsDown(UP_ARROW)||keyIsDown(32)){
				this.yv=(-7.5);
				this.y+=this.yv;
			}
		}
	}

	show(){

		image(sprite,this.x-12.5,this.y-25);
	}

	touchingPlats(){
		for(let i=0;i<plats.length;i++){
			if(plats[i].contains(this.x,this.y+25)){
				this.y=plats[i].y-25;//move hero to top of platform
				return true;
			}
		}
		return false;
	}

	checkY(h){
		if(this.y>=h){
			this.yv=0
			score--;
			this.y=0;
			resetScreen();
		}
	}

	checkX(w){
		if(this.x<=0){
			this.x=1;
		}

		else if(this.x>=w){
			this.x=1;
			score++;
			resetScreen();
		}
	}
}
