function a_star() {
    if(openSet.length>0&&canStart) {
        //keep going

        var winner = 0;
        for (var i = 0; i<openSet.length; i++) {
            if(openSet[i].f<openSet[winner].f) {
                winner = i;
                //find the smallest f in openSet
            }
        }
        
        var current = openSet[winner];

        if (openSet[winner] === end) {
            //Find the Path
            noLoop();
            console.log("DONE!");

            //return;
        }

        removeFromArray(openSet,current);
        closedSet.push(current);

        var neighbors = current.neighbors;
        for(var i = 0; i<neighbors.length; i++) {
            var neighbor = neighbors[i];

            if(!closedSet.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g+1;

                if(openSet.includes(neighbor)) {
                    if(tempG>=neighbor.g) {
                        
                    } else {
                        neighbor.g = tempG;
                    }
                } else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                } 

                neighbor.h = heuristic(neighbor,end);
                neighbor.f = neighbor.g+neighbor.h;
                neighbor.previous = current;
            }
            
        }
    } else {
        //no solution
    }



    background(0);

    

    for(var i = 0; i<cols; i++) {
        for(var j = 0; j<rows; j++) {
            grid[i][j].show(color(255));
             
        }
    }
    end.show(color(123,104,283));

    if(canStart) {
        for(var i = 0; i<closedSet.length; i++) {
            if(closedSet[i]!==end) {
                closedSet[i].show(color(255,0,0));
            }
        }
    
        for(var i = 0; i<openSet.length; i++) {
            openSet[i].show(color(0,255,0));
        }
    
        findPath(current);
    
        for(var i = 0; i<path.length; i++) {
            path[i].show(color(0,0,255));
        }
    }
}
