import React, { Component } from 'react';
import '../css/gameboard.css';
import Gamesquare from './gamesquare.js';

class Gameboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Gameboard">
                <Gamesquare
                    gamesquareHeight = {this.props.gamesquareHeight}
                    gamesquareWidth = {this.props.gamesquareWidth}
				/>
            </div>
        );
    }

}
 
export default Gameboard;