let plats=[];
let coins=[];
let jim;
let score=0;
let color;
let bg;
let sprite;
let g=0.2;

function preload(){
	bg=loadImage("https://cdn.glitch.com/f3153797-32fb-4ded-bb9d-20975e419671%2Fminimalist-rider-ghost-wallpaper-desktop-wallpapers.jpg?1511289421363");
	sprite=loadImage("https://cdn.glitch.com/f3153797-32fb-4ded-bb9d-20975e419671%2Fsprite.png?1512066872238");
}


function setup() {
	createCanvas((windowWidth-20),(windowHeight-20));
	let x=random(10,30);
	let y=random(0,15);
	for (let i=1; i<x; i++){
		plats[i]=new Platform(random(10,windowWidth-25),random(10,windowHeight-25),random(10,windowWidth-60),20);
		coins[i]=new coin((plats[i].x+(plats[i].w/2)),(plats[i]-5));
	}
	jim=new Hero(0,0,20,50,random(10,25),20);
	console.log("up up down down left right left right b a start");
}

function draw(){
	background(bg);
	text("score: "+score,10,10);
	jim.move();
	jim.show();
	jim.checkX(windowWidth-20);
	jim.checkY(windowHeight-20);
	drawAll();
}

function resetScreen(){
	let x=random(10,30);
	plats=[];
	for (let i=0; i<x; i++){
			plats[i]=new Platform(random(10,windowWidth-25),random(10,windowHeight-25),random(10,200),20);
			coins[i]=new coin((plats[i].x+(platform.w/2)),(plats[i]-5));
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
	}

	show(){
		stroke(255);
		strokeWeight(2);
		fill(random(0,255),random(0,255),random(0,255));
		ellipse(this.x,this.y,5,5);
	}
}

class Platform{
	constructor(x,y,w,h){
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
	}

	show(){
		stroke(255);
		strokeWeight(4);
		fill(random(0,255),random(0,255),random(0,255));
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
			this.x=w;
			resetScreen();
		}

		else if(this.x>=w){
			this.x=0;
			score++;
			resetScreen();
		}
	}
}