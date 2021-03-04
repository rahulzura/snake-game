import React from 'react';

import Cell from './cell';

const calcStartKey = (rowIndex, colsCount) => {
    return rowIndex === 0 ? 1 : (rowIndex * colsCount) + 1;
}

class Row extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startKey: calcStartKey(this.props.rowIndex, this.props.colsCount)
        }
    }

    render() {
        return (
            <div className='row'>
                {new Array(this.props.colsCount).fill().map((item, i) => <Cell key={i} cellNum={this.state.startKey + i}/>)}
            </div>
        );
    }
}

export default Row;