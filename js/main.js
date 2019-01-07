window.onload = function() {
	reconfigGal()
	photoGal.init() // starts everything
}

pixelFunc = function (x) {
	return ''.concat(Math.round(x), 'px');
}

reconfigGal = function() {
	console.log('reconfigGal');
	photoGal.config();
}

var photoGal = {

	O : [], N : 0, S : 0, imgArr : 1, xMove : 0, yMove : 0, newX : 0, newY : 0, newW : 0, newH : 0,
  curX : .1, curY : .1, zoom : 1, x : 0, y : 0, z : 1, xt : 0, yt : 0, zt : 0,

	config : function () {
		this.newX = window.innerWidth / 2;
		this.newY = window.innerHeight / 2;
	},

	init : function () {

		// edit the query selector below if you want to select another type of element
    // you can also add more - ex : querySelectorAll('img, video, h1')

		// put all the images into an array
    this.imgArr = document.querySelectorAll('img')
		this.N = this.imgArr.length;
    for (var i = 0; i < this.N; i++) this.O[i] = new this.addImage(i);
    
    this.run();

	},

	run : function () {

		// four lines below this determine how much and how quickly the gallery adjusts
		photoGal.curX += (photoGal.xMove - photoGal.curX) * .005;
		photoGal.curY += (photoGal.yMove - photoGal.curY) * .005;
		photoGal.x += (photoGal.xt - photoGal.x)   * .05;
		photoGal.y += (photoGal.yt - photoGal.y)   * .05;

		var i = photoGal.N;
		while (i--) photoGal.O[i].adjust();  // i never decrements rn
		setTimeout(photoGal.run, 10);
	},

	addImage : function (n) {

		this.n = n;
		this.obj = photoGal.imgArr[n]; // each image obj

		var thisImg = document.getElementById( this.obj.id )

		// get the current position of the image
			style = window.getComputedStyle(thisImg)
			imgTop = style.getPropertyValue('top')
			imgLeft = style.getPropertyValue('left')
			imgZ = style.getPropertyValue('z-index')
			
		this.x = parseFloat(imgLeft)
		this.y = parseFloat(imgTop)
    this.z = parseFloat(imgZ);
		this.w = photoGal.imgArr[n].width;
    this.h = photoGal.imgArr[n].height;
    
		if(!photoGal.imgArr[n].width) { // set width for elements that aren't images
		// I used it for videos previously
      this.w = thisImg.offsetWidth
      this.h = thisImg.offsetHeight

    }

		this.obs = this.obj.style;
		this.obj.parent = this;
		this.obj.ondrag = function() { return false }
		this.F = false;
		this.CF = 100;
		this.sto = [];

		this.adjust = function() { // this always adjusts rn
			
			var f = 700 + this.z - photoGal.z;

			if (f > 0) {
				var
					d = 1000 / f;
					X = photoGal.newW * 5 + ( (this.x - photoGal.x - photoGal.curX) * d);
					Y = photoGal.newH * 5 + ( (this.y - photoGal.y - photoGal.curY) * d);
          W = d * this.w;
          H = d * this.h;
				this.obs.left = pixelFunc( X - W );
				this.obs.top  = pixelFunc( Y - H );
				this.obs.width = pixelFunc(W);
        this.obs.height = pixelFunc(H);

				if ((photoGal.zt - photoGal.z) < 20) {
					if (! this.F) {
					this.F = true;
					this.CF = Math.random() * 200;
					}
				} else {
					this.F = false;
				}
				} else {
					this.x = parseFloat(imgLeft)
					this.y = parseFloat(imgTop)
					this.z = Math.round(n * (120 / photoGal.N));
					this.oxs.zIndex = this.obs.zIndex = Math.round(10000 - this.z);
				}
      }

		this.cto = function() {
			var i = this.txt.length;
			while (i--) clearTimeout(this.sto[i]);
		}

	} // end of obj function

} // end of photoGal

document.onmousemove = function(e) {

	if (window.event){
		// var i = photoGal.N;
		// photoGal.O[i].adjust();
		e = window.event;
	photoGal.xMove = (e.x || e.clientX) - photoGal.newX - photoGal.newW * 2;
	photoGal.yMove = (e.y || e.clientY) - photoGal.newY - photoGal.newH * 2;
	}

}

// window.onresize = reconfigGal;
