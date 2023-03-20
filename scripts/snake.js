var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Set the initial snake size, color, and position
var snakeSize = 10;
var snakeColor = "#000";
var snake = [{x: 10, y: 10}];

// Set the initial food size, color, and position
var foodSize = 10;
var foodColor = "#f00";
var food = {x: 0, y: 0};

// Set the initial direction of the snake
var direction = "right";

// Add perplexity to the game
var perplexity = 0.05;

// Add burstiness to the game
var burstiness = 0.1;

// Listen for keyboard events to update the direction of the snake
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.code === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.code === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.code === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

// Start the game loop
var gameLoop = setInterval(function() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the snake
  var head;
  if (direction === "up") {
    head = {x: snake[0].x, y: snake[0].y - 1};
  } else if (direction === "down") {
    head = {x: snake[0].x, y: snake[0].y + 1};
  } else if (direction === "left") {
    head = {x: snake[0].x - 1, y: snake[0].y};
  } else if (direction === "right") {
    head = {x: snake[0].x + 1, y: snake[0].y};
  }

  // Add perplexity to the snake's movement
  if (Math.random() < perplexity) {
    var newDirection = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
    if (newDirection === "up" && direction !== "down") {
      direction = newDirection;
    } else if (newDirection === "down" && direction !== "up") {
      direction = newDirection;
    } else if (newDirection === "left" && direction !== "right") {
      direction = newDirection;
    } else if (newDirection === "right" && direction !== "left") {
      direction = newDirection;
    }
  }

  // Add burstiness to the snake's speed
  var speed = 100;
  if (Math.random()< burstiness) {
speed /= 2;
}
clearInterval(gameLoop);
gameLoop = setInterval(function() {
// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);
// Move the snake
var head;
if (direction === "up") {
  head = {x: snake[0].x, y: snake[0].y - 1};
} else if (direction === "down") {
  head = {x: snake[0].x, y: snake[0].y + 1};
} else if (direction === "left") {
  head = {x: snake[0].x - 1, y: snake[0].y};
} else if (direction === "right") {
  head = {x: snake[0].x + 1, y: snake[0].y};
}

// Add perplexity to the snake's movement
if (Math.random() < perplexity) {
  var newDirection = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
  if (newDirection === "up" && direction !== "down") {
    direction = newDirection;
  } else if (newDirection === "down" && direction !== "up") {
    direction = newDirection;
  } else if (newDirection === "left" && direction !== "right") {
    direction = newDirection;
  } else if (newDirection === "right" && direction !== "left") {
    direction = newDirection;
  }
}

// Add burstiness to the snake's speed
if (Math.random() < burstiness) {
  speed /= 2;
}

// Check for collision with the wall
if (head.x < 0 || head.x >= canvas.width / snakeSize || head.y < 0 || head.y >= canvas.height / snakeSize) {
  clearInterval(gameLoop);
  alert("Game over!");
  return;
}

// Check for collision with the food
if (head.x === food.x && head.y === food.y) {
  snake.push({x: head.x, y: head.y});
  do {
    food.x = Math.floor(Math.random() * canvas.width / foodSize);
    food.y = Math.floor(Math.random() * canvas.height / foodSize);
  } while (snake.some(function(segment) {
    return segment.x === food.x && segment.y === food.y;
  }));
} else {
  snake.pop();
  snake.unshift(head);
}

// Draw the food
ctx.fillStyle = foodColor;
ctx.fillRect(food.x * foodSize, food.y * foodSize, foodSize, foodSize);

// Draw the snake
snake.forEach(function(segment) {
  ctx.fillStyle = snakeColor;
  ctx.fillRect(segment.x * snakeSize, segment.y * snakeSize, snakeSize, snakeSize);
});

// Check for collision with the snake's body
for (var i = 1; i < snake.length; i++) {
  if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
    clearInterval(gameLoop);
    alert("Game over!");
    return;
  }
}
}, speed);
});