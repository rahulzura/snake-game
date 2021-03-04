import React from 'react';

const getBackgroundColor = (isHead, isSnake, isFood) => {
    if (isHead) {
        return 'green';
    } else if (isSnake) {
        return 'white';
    } else if (isFood) {
        return 'red';
    } else {
        return null;
    }
}

class Cell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cell" style={{backgroundColor: getBackgroundColor(this.props.isHead, this.props.isSnake, this.props.isFood)}}></div>
        )
    }
}

export default Cell;