import React from 'react';

import Cell from './cell';

class Grid extends React.Component {
    constructor(props) {
        super(props);
    }
    
    getHeadCell = () => {
        return this.props.snake[this.props.snake.length - 1];
    }

    render() {
        return (
            <div className="grid" style={{gridTemplateColumns: `repeat(${this.props.colsCount}, 1fr)`}}>
                {new Array(this.props.rowsCount * this.props.colsCount).fill().map((item, i) => <Cell 
                    key={i} 
                    cellNum={i+1} 
                    isSnake={this.props.snake.includes(i+1)} 
                    isHead={this.getHeadCell() === i+1}
                    isFood={this.props.food === i+1}
                />)}
            </div>
        );
    }
}

export default Grid;