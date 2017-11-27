let plats=[];
let bob;
let jim;
let color;
var bg;

function setup() {
	createCanvas((windowWidth-20),(windowHeight-20));
	let x=100;
	let y=100;
	let w=200;
	let h=20;
	bob=new Platform(10,50,600,20);
	jim=new Hero(0,0,500,20,random(10,25),random(25,50));
	console.log("up up down down left right b a start");
	bg=loadImage("https://cdn.glitch.com/f3153797-32fb-4ded-bb9d-20975e419671%2Fminimalist-rider-ghost-wallpaper-desktop-wallpapers.jpg?1511289421363");
}

function draw(){
	background(bg);
	jim.move();
	jim.show();
	jim.checkX(windowWidth-20);
	jim.checkY(windowHeight-20);
	bob.show();
	bob.contains();
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
		return givenX>this.x && givenX<this.x+this.w && givenY>this.y && givenY<this.y+this.h;
	}
}

class Hero{
	constructor(a,b,x,y,w,h){
		this.a=a;
		this.b=b;
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		color=(random(0,255),random(0,255),random(0,255));

	}

	move(){
		if(keyIsDown(LEFT_ARROW)){
			this.x-=3;
		}

		if(keyIsDown(RIGHT_ARROW)){
					this.x+=3;
		}

		if(keyIsDown(DOWN_ARROW)){
					this.y+=3;
		}

		if(keyIsDown(UP_ARROW)){
					this.y-=5;
		}
		if(bob.contains(this.x,this.y)==false ){
			this.y+=5;
		}
	}

	show(){

		stroke(255);
		strokeWeight(1);
		fill(color);
		ellipse(this.x, this.y, this.w, this.h);
	}

	checkY(h){
		if(this.y>h){
			//score--;
			this.y=0;
		}
	}

	checkX(w){
		if(this.x<0){
			this.x+=5;
		}

		else if(this.x>w){
			this.x-=5
		}
	}
}