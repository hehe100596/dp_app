import React, { Component } from 'react';
import '../css/scoreboard.css';

class Scoreboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var scoreboardHeight = "calc(7vh + " + this.props.scoreboardHeight + ")";
        var scoreboardWidth = "40vw";
        var left = "calc(50vw - " + scoreboardWidth + " / 2)";

        return (
            <div className="Scoreboard" style={{height: scoreboardHeight, width: scoreboardWidth, left: left}}>
            </div>
        );
    }

}
 
export default Scoreboard;