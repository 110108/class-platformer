let plats=[];
let bob;
let jim;

function setup() {
	createCanvas(1000,600);
	let x=100;
	let y=100;
	let w=200;
	let h=20;
	bob=new Platform(10,50,600,20);
	jim=new Hero(0,0,500,20,10,50)
	console.log("setup run");
}

function draw(){
	background(0);
	bob.show();
	jim.move();
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
		this.a=a;
		this.b=b;
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
	}

	move(){
		if(keyIsDown(LEFT_ARROW)){
			this.x-=1;
		}

		if(keyIsDown(RIGHT_ARROW)){
					this.x+=1;
		}

		if(keyIsDown(DOWN_ARROW)){
					this.y+=1;
		}

		if(keyIsDown(UP_ARROW)){
					this.y-=1;
		}
	}

	show(){
		stroke(255);
		strokeWeight(4);
		fill(200,150,255);
		ellipse(this.x, this.y, this.w, this.h);
	}
}

