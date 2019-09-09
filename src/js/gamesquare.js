import React, { Component } from 'react';
import '../css/gamesquare.css';

class Gamesquare extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Gamesquare" style={{height: this.props.gamesquareHeight, width: this.props.gamesquareWidth}}>
            </div>
        );
    }

}
 
export default Gamesquare;