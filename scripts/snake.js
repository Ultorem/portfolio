import React, {
  useRef,
  useEffect
} from 'react';
import styles from '../styles/snake.module.css';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const SNAKE_SIZE = 10;
const FOOD_SIZE = 10;
const GAME_SPEED = 100;
const DIRECTION = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

export default function Snake() {
  const canvasRef = useRef(null);
  let context, snake, food, direction, score;

  useEffect(() => {
    context = canvasRef.current.getContext('2d');
    startGame();
  }, []);

  const startGame = () => {
    snake = {
      body: [{
          x: 10,
          y: 10
        },
        {
          x: 20,
          y: 10
        },
        {
          x: 30,
          y: 10
        },
      ],
    };
    food = {
      x: Math.floor(Math.random() * CANVAS_WIDTH),
      y: Math.floor(Math.random() * CANVAS_HEIGHT)
    };
    direction = DIRECTION.RIGHT;
    score = 0;

    setInterval(() => {
      moveSnake();
      draw();
    }, GAME_SPEED);

    document.addEventListener('keydown', handleKeyDown);
  };

  const moveSnake = () => {
    const head = {
      x: snake.body[0].x,
      y: snake.body[0].y
    };
    switch (direction) {
      case DIRECTION.LEFT:
        head.x -= SNAKE_SIZE;
        break;
      case DIRECTION.UP:
        head.y -= SNAKE_SIZE;
        break;
      case DIRECTION.RIGHT:
        head.x += SNAKE_SIZE;
        break;
      case DIRECTION.DOWN:
        head.y += SNAKE_SIZE;
        break;
    }

    if (isCollidingWithBody(head)) {
      endGame();
      return;
    }

    if (isCollidingWithFood(head)) {
      eatFood();
      score += 10;
      food = {
        x: Math.floor(Math.random() * CANVAS_WIDTH),
        y: Math.floor(Math.random() * CANVAS_HEIGHT)
      };
    } else {
      snake.body.pop();
    }

    snake.body.unshift(head);
  };

  const isCollidingWithBody = (head) => {
    return snake.body.some((part) => part.x === head.x && part.y === head.y);
  };

  const isCollidingWithFood = (head) => {
    return food.x === head.x && food.y === head.y;
  };

  const eatFood = () => {
    snake.body.push({
      x: food.x,
      y: food.y
    });
  };

  const endGame = () => {
    clearInterval();
    document.removeEventListener('keydown', handleKeyDown);
    alert(`Game Over! Your score is ${score}`);
    startGame();
  };

  const handleKeyDown = (event) => {
    const
    if (event.keyCode === DIRECTION.LEFT && direction !== DIRECTION.RIGHT) {
      direction = DIRECTION.LEFT;
    } else if (event.keyCode === DIRECTION.UP && direction !== DIRECTION.DOWN) {
      direction = DIRECTION.UP;
    } else if (event.keyCode === DIRECTION.RIGHT && direction !== DIRECTION.LEFT) {
      direction = DIRECTION.RIGHT;
    } else if (event.keyCode === DIRECTION.DOWN && direction !== DIRECTION.UP) {
      direction = DIRECTION.DOWN;
    }
  };
  const draw = () => {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawSnake();
    drawFood();
    drawScore();
  };

  const drawSnake = () => {
    context.fillStyle = 'green';
    snake.body.forEach((part) => {
      context.fillRect(part.x, part.y, SNAKE_SIZE, SNAKE_SIZE);
    });
  };

  const drawFood = () => {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE);
  };

  const drawScore = () => {
    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText(Score: $ {
      score
    }, 10, 25);
  };

  return ( <
    div className = {
      styles.container
    } >
    <
    canvas ref = {
      canvasRef
    }
    width = {
      CANVAS_WIDTH
    }
    height = {
      CANVAS_HEIGHT
    }
    /> <
    /div>
  );
}