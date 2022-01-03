
// pulling the canvas data from the HTML file
var canvas = document.getElementById('snake');
var context = canvas.getContext('2d');

// instance variables
var scale = (canvas.width + canvas.height)/80;
var snake = {
    dx: 0.5 * canvas.width - scale,
    dy: 0.5 * canvas.width - scale,
    vx: scale,
    vy: 0,
    cells: [],
    size: 5
};
var apple = {
    dx: 0.25 * canvas.width - scale,
    dy: 0.75 * canvas.width - scale,
}
var count = 0;
document.getElementById("count").innerHTML = count;

// functions that produce random integers
function randomIntWidth() {
    return Math.floor(Math.random() * (canvas.width/scale)) * scale;
}
function randomIntHeight() {
    return Math.floor(Math.random() * (canvas.height/scale)) * scale;
}

// function that animates the game
function loop() {
    // resets the canvas
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // updates the coordinates of the snake
    snake.dx += snake.vx;
    snake.dy += snake.vy;

    // wraps the snake position at the boundaries
    if (snake.dx >= canvas.width) {
        snake.dx = 0;
    }
    else if (snake.dx < 0) {
        snake.dx = canvas.width - scale;
    }
    if (snake.dy >= canvas.height) {
        snake.dy = 0;
    }
    else if (snake.dy < 0) {
        snake.dy = canvas.height - scale;
    }

    // updates the cells of the snake
    snake.cells.unshift({dx: snake.dx, dy: snake.dy});
    if (snake.cells.length > snake.size) {
        snake.cells.pop();
    }

    // draws the apple
    context.fillStyle = 'crimson';
    context.fillRect(apple.dx, apple.dy, scale - 1, scale - 1);

    // draws the snake
    context.fillStyle = 'lime';
    snake.cells.forEach(function(cell, index) {
        // draws that cell
        context.fillRect(cell.dx, cell.dy, scale - 1, scale - 1);

        // checks to see if snake has eaten the apple
        if (cell.dx === apple.dx && cell.dy === apple.dy) {
            snake.size++;
            count++;
            document.getElementById("count").innerHTML = count;
            apple.dx = randomIntWidth();
            apple.dy = randomIntHeight();
        }  

        // checks to see if the snake ran into itself
        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.dx === snake.cells[i].dx && cell.dy === snake.cells[i].dy) {
                // resets the count
                count = 0;
                document.getElementById("count").innerHTML = count;

                // resets the snake
                snake.dx = 0.5 * canvas.width - scale;
                snake.dy = 0.5 * canvas.width - scale;
                snake.vx = scale;
                snake.vy = 0;
                snake.cells = [];
                snake.size = 5; 

                // resets the apple
                apple.dx = 0.25 * canvas.width - scale;
                apple.dy = 0.75 * canvas.width - scale;
            }
        }
    }); 

    // slows the game to 20fps
    setTimeout(loop, 50);
}

// tracks when one of the arrow keys is pressed 
document.addEventListener('keydown', function(key) {
    if ((key.which === 37 || key.which === 65) && snake.vx === 0) {
        snake.vx = -scale;
        snake.vy = 0;
    }
    else if ((key.which === 38 || key.which === 87) && snake.vy === 0) {
        snake.vx = 0;
        snake.vy = -scale;
    }
    else if ((key.which === 39 || key.which === 68) && snake.vx === 0) {
        snake.vx = scale;
        snake.vy = 0;
    }
    else if ((key.which === 40 || key.which === 83) && snake.vy === 0) {
        snake.vx = 0;
        snake.vy = scale;
    }
});

// prevents the arrow keys from scrolling the page
document.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// initial call of the loop function
requestAnimationFrame(loop);
