let plats=[];
let jim;
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
	for (let i=0; i<x; i++){
		plats[i]=new Platform(random(10,windowWidth-25),random(10,windowHeight-25),random(10,200),20);
	}
	jim=new Hero(0,0,20,50,random(10,25),20);
	console.log("up up down down left right left right b a start");
}

function draw(){
	background(bg);
	jim.move();
	jim.show();
	jim.checkX(windowWidth-20);
	jim.checkY(windowHeight-20);
	drawAll();
}

function resetPlats(){
	let x=random(10,30);
	plats=[];
	for (let i=0; i<x; i++){
			plats[i]=new Platform(random(10,windowWidth-25),random(10,windowHeight-25),random(10,200),20);
	}
}

function drawAll(){
	for(let i=0; i<plats.length; i++){
		plats[i].show();
		plats[i].contains();
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
		fill(200,75,99);
		rect(this.x, this.y, this.w, this.h)
	}

	contains(givenX,givenY){
		return givenX>this.x && givenX<this.x+this.w && givenY>this.y && givenY<this.y+this.y+this.height;
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
		if(this.touchingPlats()==true){
			//hero on platform
			//left/right move on platform
			if(keyIsDown(LEFT_ARROW)){
				this.x-=6;
			}

			if(keyIsDown(RIGHT_ARROW)){
				this.x+=6;
			}
			//jump
			if(keyIsDown(UP_ARROW)||keyIsDown(32)){
				this.yv=(-5);
				this.y+=this.yv;
			}

			this.yv=0;
			this.y++;
			console.log("tp");
		}
	}

	show(){

		image(sprite,this.x-12.5,this.y-25);
		//ellipse(this.x, this.y, this.w, this.h);
	}

	touchingPlats(){
		for(let i=0;i<plats.length;i++){
			if(plats[i].contains(this.x,this.y+25)){
				this.y=plats[i].y-10;//move hero to top of platform
				return true;
			}
		}
		return false;
	}

	checkY(h){
		if(this.y>=h){
			//score--;
			this.y=0;
			resetPlats();
		}
	}

	checkX(w){
		if(this.x<=0){
			this.x=w;
			resetPlats();
		}

		else if(this.x>=w){
			this.x=0;
			resetPlats();
		}
	}
}