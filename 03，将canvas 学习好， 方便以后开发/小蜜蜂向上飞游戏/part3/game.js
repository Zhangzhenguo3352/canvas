var width = 320, 
	height = 500,
	gLoop,
	c = document.getElementById('c'), 
	ctx = c.getContext('2d');
			
	c.width = width;
	c.height = height;


var clear = function(){
	ctx.fillStyle = '#d0e7f9';
	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();
}

var howManyCircles = 10, circles = [];

for (var i = 0; i < howManyCircles; i++) 
	circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);

var DrawCircles = function(){
	for (var i = 0; i < howManyCircles; i++) {
		ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
		ctx.beginPath();
		ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
};

var MoveCircles = function(e){
	for (var i = 0; i < howManyCircles; i++) {
		if (circles[i][1] - circles[i][2] > height) {
			circles[i][0] = Math.random() * width;
			circles[i][2] = Math.random() * 100;
			circles[i][1] = 0 - circles[i][2];
			circles[i][3] = Math.random() / 2;
		}
		else {
			circles[i][1] += e;
		}
	}
};

var player = new (function(){
	var that = this;
	that.image = new Image();

	that.image.src = "angel.png"
	that.width = 65;
	that.height = 95;
	that.frames = 1;
	that.actualFrame = 0;
	that.X = 0;
	that.Y = 0;	
	
	/*
	 * Part 3 - jumping
	 */
	that.isJumping = false;
	that.isFalling = false;
	that.jumpSpeed = 0;
	that.fallSpeed = 0;
	
    that.jump = function() {
		if (!that.isJumping && !that.isFalling) {
			that.fallSpeed = 0;
			that.isJumping = true;
			that.jumpSpeed = 17;
		}
	}
	
	that.checkJump = function() {
		that.setPosition(that.X, that.Y - that.jumpSpeed);
		that.jumpSpeed--;
		if (that.jumpSpeed == 0) {
			that.isJumping = false;
			that.isFalling = true;
			that.fallSpeed = 1;
		}
	
	}
	
	that.fallStop = function(){
		that.isFalling = false;
		that.fallSpeed = 0;
		that.jump();	
	}
	
	that.checkFall = function(){
		if (that.Y < height - that.height) {
			that.setPosition(that.X, that.Y + that.fallSpeed);
			that.fallSpeed++;
		} else {
			that.fallStop();
		}
	}
	
	that.moveLeft = function(){
		if (that.X > 0) {
			that.setPosition(that.X - 5, that.Y);
		}
	}
	
	that.moveRight = function(){
		if (that.X + that.width < width) {
			that.setPosition(that.X + 5, that.Y);
		}
	}

	/*
	 * end of part 3
	 */
	
	that.setPosition = function(x, y){
		that.X = x;
		that.Y = y;
	}
	
	that.interval = 0;
	that.draw = function(){
		try {
			ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
		} 
		catch (e) {
		};
		
		if (that.interval == 4 ) {
			if (that.actualFrame == that.frames) {
				that.actualFrame = 0;
			}
			else {
				that.actualFrame++;
			}
			that.interval = 0;
		}
		that.interval++;		
	}
})();


player.setPosition(~~((width-player.width)/2), ~~((height - player.height)/2));
player.jump();

document.onmousemove = function(e){
	if (player.X + c.offsetLeft > e.pageX) {
		player.moveLeft();
	} else if (player.X + c.offsetLeft < e.pageX) {
		player.moveRight();
	}
	
}
	
var GameLoop = function(){
	clear();
	MoveCircles(5);
	DrawCircles();
	/*
	 * part 3
	 */
		if (player.isJumping) 
			player.checkJump();
		if (player.isFalling) 
			player.checkFall();
    /*
     * end of part 3
     */
	player.draw();
	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
