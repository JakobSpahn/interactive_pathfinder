function removeFromArray(arr, el) {
    for(var i = arr.length-1; i>= 0; i--) {
        if(arr[i]==el) {
            arr.splice(i,1);
        }
    }
}

function heuristic(a,b) {
    //Euclidean distance:
    //var d = dist(a.i,a.j,b.i,b.j);

    //Manthattan Distance
    var d = abs(a.i-b.i)+abs(a.j-b.j);
    return d;
}

function findPath(current) {
    path = [];
    var temp = current;
    path.push(temp)
    while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }
}


var cols = 25;
var rows = 25;
var grid = new Array(cols);

/*function randomBlocks(num) {
    var arr = [];
    for(var i = 0; i<num; i++) {
        var rand = Math.floor(Math.random()*cols-1)+1;
        arr.push(rand);
    }
    return arr;    
}*/

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path =[];

var canStart = false;
var startButton;
var reset = false;
var resetButton;





function Spot(i,j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    if(Math.random()<0.1) {
        this.wall = true;
    }

    this.show = function(color) {
        fill(color);
        if(this.wall) {
            fill(0);
        }
        noStroke();
        rect(this.i*w,this.j*h,w-1,h-1);
    }

    this.addNeighbors = function(grid) {
        var i = this.i;
        var j = this.j;
        if(i<cols-1) {
            this.neighbors.push(grid[i+1][j]);
        }
        if(i>0) {
            this.neighbors.push(grid[i-1][j]);
        }
        if(j<rows-1) {
            this.neighbors.push(grid[i][j+1]);
        }
        if(j>0) {
            this.neighbors.push(grid[i][j-1]);
        }   
    }

}

function setup() {
    var canvas = createCanvas(400, 400);
    console.log('A*');
    canvas.parent('canvas-holder');

    w = width/cols;
    h = height/rows;

    
    init_a_star();
    
    
    
}

document.addEventListener("DOMContentLoaded", function() {
    startButton = document.querySelector("#start");
    startButton.addEventListener("click",function() {
        
        canStart = true;
        
    });
    resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", function() {
        reset = true;
        loop();
    });
});




function draw() {
    a_star();
    if(reset) {
        reset_a_star();
        reset = false;
        
    }
    
    
        
}

function init_a_star() {
        
    for(var i = 0; i<cols; i++) {
        grid[i] = new Array(rows);
    }
    
    //Assign every el in grid to Object
    for(var i = 0; i<cols; i++) {
        for(var j = 0; j<rows; j++) {
            grid[i][j]=new Spot(i,j);
        }
    }

    //Add neighbors to every object
    for(var i = 0; i<cols; i++) {
        for(var j = 0; j<rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    start.wall = false;
    end = grid[cols-1][rows-1];
    end.wall = false;

    openSet.push(start);

    console.log(grid);
}

function reset_a_star() {
    grid = new Array(cols);
    openSet = [];
    closedSet = [];
    path = [];

    init_a_star();

}