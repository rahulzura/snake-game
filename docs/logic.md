## Boundary
1. square grid
2. remember the boundary of the grid

## Snake
1. collection of cells that snake occupy
2. snake has a head (a cell at one end) and tail (the rest)
3. after each move, check if head bumped, move all the other c except head to the point before them
4. in case of eathing food, create a point there when the last of the tail moves out of that point

## Move
1. calculate the next location of head (next_head_loc)
2. if head bumped, snake dies
3. else
   1. the current is part of tail
   2. create new head at the (next_head_loc)
   3. if the last tail cell has food (food_cell), turn that into normal tail cell (tail_cell)
   4. else empty the last tail cell   