var canvas;
var ctx;
var scaleFactor;
var scaleLoop;
var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
var xform = svg.createSVGMatrix();
var strokeColor = "#ffffff";
var cls;
var startSide;
var tri;
var startX;
var startY;
var maxSplit = 8;
var zooming = false;
var lightMode = false;
var autoSplit = false;


function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
}
function clearCtx() {
	ctx.clearRect(0, 0, window.innerWidth*2, window.innerHeight*2);
}
class triangle{
    constructor(side, x, y) {
        this.side = side;
        this.x = x;
        this.y = y;
        this.h = this.side * (Math.sqrt(3)/2);
    }
    draw(){
        
        ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.h/2);
            ctx.lineTo(this.x + -this.side / 2, this.y + this.h / 2);
            ctx.lineTo(this.x + this.side / 2, this.y + this.h / 2);
            ctx.lineTo(this.x, this.y + -this.h / 2);
            ctx.stroke();
        ctx.closePath();
    }
}
class tris{
    constructor(side, x, y) {
        this.arr = [new triangle(side, x, y)];
        this.canvas = document.getElementById('triangles');
        this.splitCount = 0;
        this.simBottom = false;
    }

    async Split() {
        var zoomBtn = document.getElementById("zoom");
        if (zoomBtn == undefined && !zooming)
            createBtn(cls, "Zoom", "window.tri.zoom()", document.getElementById("btn-center"), "zoom");
        if (this.splitCount >= maxSplit) return;
        this.split();
        this.draw();
        if (autoSplit && !zooming) {
            if (this.splitCount < maxSplit) {
                await sleep(500);
                await this.Split();
            }
            else{
                zooming = true;
                await this.zoom();

		zooming = false;
            }
        }
        else {
            return;
        }
    }
    async split() {
        var temp = [];
        for (var i = 0; i < this.arr.length; i++) {
            temp[i*3] = this.arr[i];
        }
        this.arr = temp;
        for (var i = 0; i < this.arr.length; i+=3) {
            this.arr[i+1] = new triangle(this.arr[i].side/2, this.arr[i].x + (this.arr[i].side/4), this.arr[i].y + (this.arr[i].h/4));
            this.arr[i+2] = new triangle(this.arr[i].side/2, this.arr[i].x, this.arr[i].y - (this.arr[i].h/4));
            this.arr[i] = new triangle(this.arr[i].side/2, this.arr[i].x - (this.arr[i].side/4), this.arr[i].y  + (this.arr[i].h/4));
        }
        this.splitCount++;
    }
    async zoom() {
        var zoomBtn = document.getElementById("zoom");
        zoomBtn.remove();
        for (var i = 0; i < scaleLoop * this.splitCount; i++) {
            await this.zoomOnNext();
        }
        for (var i = 0; i < scaleLoop * this.splitCount; i++) {
            this.zoomOnTopTri(-2);
        }
        this.simBottom = true;
        this.arr = [new triangle(startSide, startX, startY)]
        this.splitCount = 0;
        this.draw();
        if (zoomBtn == undefined)
            createBtn(cls, "Zoom", "window.tri.zoom()", document.getElementById("btn-div"), "zoom");
    }

    async zoomOnNext() {
        for (var i = 0; i < scaleLoop; i++) {
            this.zoomOnTopTri(2);
            this.draw();
            await sleep(0.3*scaleLoop);
        }
        for (var i = 0; i < scaleLoop; i++) {
            this.zoomOnTopTri(-2);
        }
        var side = startSide;
        var h = side * (Math.sqrt(3)/2);
        var x = startX;
        var y = startY;
        if (this.splitCount != 0)
        this.simBottom = true;
        this.arr = [new triangle(side, x, y)]
        var temp = this.splitCount;
        this.splitCount=0;
        for (var i = 0; i < (temp - 1) + (1 * autoSplit); i++) {
        this.split();
        }
        this.draw();
    }
    async zoomInAmmount(ammount) {
        for (var i = 0; i < scaleLoop * (this.splitCount-ammount); i++) {
            this.zoomOnTopTri(2);
            this.draw();
        await sleep(0.15*scaleLoop);
        }
        for (var i = 0; i < scaleLoop * (this.splitCount-ammount); i++) {
            this.zoomOnTopTri(-2);
        }
        var side = startSide;
        var h = side * (Math.sqrt(3)/2);
        var x = startX;
        var y = startY;
        if (this.splitCount != 0)
        this.simBottom = true;
        this.arr = [new triangle(side, x, y)]
        this.splitCount=0;
        for (var i = 0; i < ammount; i++) {
        this.split();
        }
        return;
    }

    async zoomOnTopTri(exp){
        var factor = Math.pow(scaleFactor,exp);
        var x = this.arr[this.arr.length-1].x;
        var y = this.arr[this.arr.length-1].y - ((this.arr[this.arr.length-1].side * (Math.sqrt(3)/2))/2);
        var pt = ctx.transformedPoint(x,y);
        ctx.translate(pt.x,pt.y);
        ctx.scale(factor,factor);
        ctx.translate(-pt.x,-pt.y);
        ctx.lineWidth /= factor;
        
    }
    draw() {
        clearCtx();
        if (this.simBottom) {
            var side = startSide;
            var h = side * (Math.sqrt(3)/2);
            var x = startX;
            var y = startY;
            var tempX = x - side/2;
            var tempY = y  + h;
            ctx.beginPath();
            ctx.moveTo(tempX, tempY - h/2);
            ctx.lineTo(tempX - (side/2), tempY + h / 2);
            ctx.lineTo(tempX + (side/2), tempY + h / 2);
            ctx.lineTo(tempX, tempY + -h / 2);
            ctx.stroke();
            ctx.closePath();
            var tempX = x + side/2;
            var tempY = y + h;
            ctx.beginPath();
            ctx.moveTo(tempX, tempY - h/2);
            ctx.lineTo(tempX - side/2, tempY + h / 2);
            ctx.lineTo(tempX + side/2, tempY + h / 2);
            ctx.lineTo(tempX, tempY + -h / 2);
            ctx.stroke();
            ctx.closePath();
        }
        for (var i = 0; i < this.arr.length; i++) {
            this.arr[i].draw();
        } 
    }
}
function load() {
    scaleFactor = 1.0085;
    scaleLoop = 40;
    document.querySelector("#triangles").width = window.innerWidth;
    document.querySelector("#triangles").height = window.innerHeight-(window.innerHeight/10);
    canvas = document.getElementById('triangles');
    ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = "#ffffff";
    if (canvas.width > canvas.height) {
    	startSide = canvas.height * (Math.sqrt(3)/2) * 1.25;
    } else {
	startSide = canvas.width;
    }
    startX = canvas.width/2;
    startY = canvas.height/2;
    var pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }

}
    function start() {
        if (tri === undefined) {
        tri = new tris(startSide, startX, startY);
        tri.draw();
        if (lightMode)
        cls = "btn btn-outline-dark align-middle";
        else 
        cls = "btn btn-outline-light align-middle";
        createBtn(cls, "Advance", "window.tri.Split()", document.getElementById("btn-center"), "advance");
        createBtn(cls, "Zoom", "window.tri.zoom()", document.getElementById("btn-center"), "zoom");
        document.querySelector('#Start').setAttribute("value", "Reset");
        document.querySelector('#Start').setAttribute("onclick", "reset()");
	if (autoSplit) {
	    tri.Split();	
	}
        }
    }
    function reset() {
        if (tri != undefined) {
            tri = new tris(startSide, canvas.width/2, canvas.height/2);
            clearCtx();
            tri.draw();
        } 
    }
    function createBtn(cls, text, click, div, id) {
        var button = document.createElement("input");
        button.id = id;
        button.type = "button";
        button.setAttribute("onclick", click);
        button.classList = cls;
	    button.value = text;
	    div.appendChild(button);
    }
    function toggleLight() {
        lightMode = !lightMode;
        var color;
        var mode;
        if (lightMode) {
            cls = "btn btn-outline-dark align-middle";
            ctx.strokeStyle = "#000000";
            color = "white";
            mode = "Dark";
        }
        else { 
            cls = "btn btn-outline-light align-middle";
            color = "gray";
            ctx.strokeStyle = "#ffffff";
            mode = "Light";
        }
            document.querySelector("body").setAttribute("style", "background-color: " + color + ";");
            document.querySelector("#Start").classList = cls;
            document.querySelector("#light").classList = cls;
            document.querySelector('#light').value = mode + " Mode";
            document.querySelector('#auto').classList = cls;
            document.querySelector("#advance").classList = cls;
            document.querySelector("#zoom").classList = cls;
            tri.draw();
    }
    function toggleAuto() {
        autoSplit = !autoSplit;
        var onoff;
        if (autoSplit) {
            onoff = "On";
            try {
		tri.Split();
	    }
	    catch {
	    }
        } else 
            onoff = "Off";
        
        document.querySelector('#auto').value = "Auto Split " + onoff;
    }
