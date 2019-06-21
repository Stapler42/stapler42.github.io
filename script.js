  //Set constants for the game: pace of game, styling game zone and features
    function wrapper(){
      //I want to put location.reload up hree, and then call it under endgame, but it isn't working?

    const speed = 50;
    const CANVAS_BORDER_COLOR = 'blue';
    const CANVAS_BACKGROUND_COLOR = "black";
    const SNAKE_COLOR = 'white';
    const SNAKE_BORDER_COLOR = 'red';
    const FOOD_COLOR = 'pink';
    const FOOD_BORDER_COLOR = 'darkpink';
    function playAgain(){
      document.getElementById("button").addEventListener("click", location.reload());
    };

    

    let snake = [
      {x: 300, y: 300},
      {x: 290, y: 300},
      {x: 280, y: 300},
      {x: 270, y: 300},
      {x: 260, y: 300}
    ]
//Starting features

    
    let score = 0;
    // Food x-coordinate
    let foodX;
    // Food y-coordinate
    let foodY;
    // Horizontal velocity
    let dx = 10;
    // Vertical velocity
    let dy = 0;

//contextualize canvas so we can draw with JS
    const gameCanvas = document.getElementById("gameCanvas");
    const ctx = gameCanvas.getContext("2d");

 //main runs the whole game
    main();
    placeFood();
    document.addEventListener("keydown", changeDirection);


//this function constantly refreshes and executes necessary game tasks
    function main() {

      if (endGame()) { window.location.reload(); };

      setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();

        // Call game again
        main();
      }, speed)
    }

//clears board of where the snake was
    function clearCanvas() {

      ctx.fillStyle = CANVAS_BACKGROUND_COLOR;

      ctx.strokestyle = CANVAS_BORDER_COLOR;

      ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
      ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    }

   //food
    function drawFood() {
      ctx.fillStyle = FOOD_COLOR;
      ctx.strokestyle = FOOD_BORDER_COLOR;
      ctx.fillRect(foodX, foodY, 10, 10);
      ctx.strokeRect(foodX, foodY, 10, 10);
    }


    function moveSnake() {
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
 
      snake.unshift(head);

      const ateFood = snake[0].x === foodX && snake[0].y === foodY;
      if (ateFood) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        placeFood();
      } else {
        snake.pop();
      }
    }

//endgame criteria
    function endGame() {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
          {return true;
          }
      }

      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > gameCanvas.width - 10;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > gameCanvas.height - 10;

      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
    
    }

 //food placement
    function randomTen(min, max) {
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }

    function placeFood() {
      foodX = randomTen(0, gameCanvas.width - 10);
      
      foodY = randomTen(0, gameCanvas.height - 10);

      
      snake.forEach(function overlap(part) {
        const overlap = part.x == foodX && part.y == foodY;
        if (overlap) placeFood();
      });
    }

//snake starts here
    function drawSnake() {

      snake.forEach(drawSnakePart)
    }


    function drawSnakePart(snakePart) {

      ctx.fillStyle = SNAKE_COLOR;
      ctx.strokestyle = SNAKE_BORDER_COLOR;
      ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }


    function changeDirection(event) {
      const LEFT_KEY = 37;
       const UP_KEY = 38;
      const RIGHT_KEY = 39;
      const DOWN_KEY = 40;

      if (changingDirection) return;
      changingDirection = true;

      const keyPressed = event.keyCode;

      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;

      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }
}
wrapper();