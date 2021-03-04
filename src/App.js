import React from 'react';

import Grid from './components/grid';

import './App.css';

const ROWS = 20;
const COLS = 20;
const INTERVAL = 1000/4;

const notAllowedDirection = {
  'up': new Array(COLS).fill('').map((item, i) => i + 1),
  'left': new Array(ROWS).fill('').map((item, i) => COLS * i + 1), // COLS * i is basically the previous row's last cell
  'down': new Array(COLS).fill('').map((item, i) => (ROWS - 1) * COLS + 1 + i), // (ROWS - 1) * COLS is the second last rows last column
  'right': new Array(ROWS).fill('').map((item, i) => (i+1) * COLS) // Last cell of each row
}

const getRandNum = (start, end) => {
  let rand = Math.random() * end;
  while (rand < start) {
    rand = (rand + rand) % end;
  }
  rand = parseInt(rand);
  return rand;
}

const calcFoodCell = (snake, start, end) => {
  const snakeSet = new Set(snake);
  let randNum = getRandNum(start, end);
  while (snakeSet.has(randNum)) {
    randNum = getRandNum(start, end);
  }

  return randNum;
}

const updater = (state, props, moveDirection) => {
  const nextHead = calcNextHeadCell(state.snake[state.snake.length - 1], state.direction);
  if (!nextHead || state.snakenextHead) return {isDead: true};
  
  const snakeWithoutLastCell = state.snake.slice(1);
  if (snakeWithoutLastCell.includes(nextHead)) return {isDead: true};

  let snake;
  let food;
  
  
  if (nextHead === state.food) {
    snake = [...state.snake, nextHead];
    food = calcFoodCell(snake, 0, ROWS*COLS);
  } else {
    snake = [...snakeWithoutLastCell, nextHead ];
    food = state.food;
  }
  return {snake, food, direction: !moveDirection ? state.direction : moveDirection };
}

const s = [32, 33, 34, 35, 36, 37];

function calcNextHeadCell(current, direction) {
  // dead condition
  const died = notAllowedDirection[direction].includes(current);

  if (died) {
    return false;
  }

  if (direction === 'right') {
    return current + 1;
  } else if (direction === 'left') {
    return current - 1;
  } else if (direction === 'up') {
    return current - COLS;
  } else {
    return current + COLS;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      snake: s,
      direction: 'right',
      food: calcFoodCell(s, 0, ROWS*COLS),
      isDead: false
    }
    
    this.moveDirection = null;
    this.move = this.move.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  move(direction) {
    if (this.moveDirection) { // can't set move if already set
      return;
    }

    const oppDirection = [
      ['left', 'right'],
      ['up', 'down']
    ];
    
    for (let i = 0; i < oppDirection.length; ++i) {
      const pair = oppDirection[i];
      if (pair.includes(direction) && pair.includes(this.state.direction))
        return;
    }
    this.moveDirection = direction; // will again be set null after the snake takes one cell in this direction by the setInterval
  }

  handleKeyPress(e) {
    const keyCodeDirectionMap = new Map([
      ['ArrowLeft', 'left'],
      ['ArrowUp', 'up'],
      ['ArrowRight', 'right'],
      ['ArrowDown', 'down']
    ]);

    const direction = keyCodeDirectionMap.get(e.code);
    if (direction) {
      this.move(direction);
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState((state, props) => updater(state, props, this.moveDirection));
      this.moveDirection = null; // the player can make a new move now
    }, INTERVAL)

    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  render() {
    return (
      <div className="App">
      {
        this.state.isDead ? 
          <h2>You died</h2> :
          <>
            <Grid tabIndex="0" onKeyDown={this.handleKeyPress} rowsCount={ROWS} colsCount={COLS} snake={this.state.snake} food={this.state.food}/>
            <button onClick={() => this.move('left')}>move left</button>
            <button onClick={() => this.move('right')}>move right</button>
            <button onClick={() => this.move('up')}>move up</button>
            <button onClick={() => this.move('down')}>move down</button>
        </>
      }
    </div>
    );
  }
}

export default App;
