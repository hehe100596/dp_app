import React, { Component } from 'react';
import '../css/game.css';
import Gameboard from './gameboard.js';
import Scoreboard from './scoreboard.js';
import Card from './card.js';

class Game extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        backgroundColor: "#006600",
        gameboardSize: 20,
        gamesquareHeight: "5vh",
        gamesquareWidth: "3vw"
	};
    
    changeColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        };
		this.setState({
			backgroundColor: color
		});
    }

    exitGame = () => {
        window.location.reload(false);
    }

    render() {
        if (!this.props.start) {
            return null;
        }    
        else {
            return (
                <div className="Game" style={{backgroundColor: this.state.backgroundColor}}>
                    <div class="game-btn" style={{position: "fixed", top: "1.5vh", left: "6vw"}}>
                        <button type="button">BTN1</button>
                    </div>
                    <div class="game-btn" style={{position: "fixed", top: "1.5vh", left: "14vw"}}>
                        <button type="button">BTN2</button>
                    </div>
                    <div class="game-btn" style={{position: "fixed", top: "1.5vh", right: "14vw"}}>
                        <button type="button">BTN3</button>
                    </div>
                    <div class="game-btn" style={{position: "fixed", top: "1.5vh", right: "6vw"}}>
                        <button type="button">BTN4</button>
                    </div>
                    <div class="game-btn" style={{position: "fixed", bottom: "1.5vh", left: "2.5vw"}}>
                        <button onClick={this.changeColor} type="button" style={{width: "10vw"}}>COLOR BACKGROUND</button>
                    </div>
                    <div class="game-btn" style={{position: "fixed", bottom: "1.5vh", right: "2.5vw"}}>
                        <button onClick={this.exitGame} type="button" style={{width: "10vw"}}>EXIT GAME</button>
                    </div>
                    <Gameboard
                        gamesquareHeight = {this.state.gamesquareHeight}
                        gamesquareWidth = {this.state.gamesquareWidth}
				    />
                    <Card
                        cardHeight = {this.state.gamesquareHeight}
				    />
                    <Scoreboard
                        scoreboardHeight = {this.state.gamesquareHeight}
				    />
                </div>
            );
        }
    }

}
 
export default Game;