let plats=[];
let bob;
let jim;

function setup() {
	createCanvas(1000,600);
	let x=100;
	let y=100;
	let w=200;
	let h=20;
	let bob=new platform(x,y,w,h);
	let jim=new hero(0,0,500,20,10,50)
	console.log("setup run");
}

function draw(){
	background(0);
	bob.show();
	jim.show();
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
}

class Hero{
	constructor(a,b,x,y,w,h){
		this.a=xvelocity;
		this.b=yvelocity;
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
	}

	show(){
		stroke(255);
		strokeWeight(4);
		fill(20,275,199);
		ellipse(this.x, this.y this.w, this.h);
	}
}

