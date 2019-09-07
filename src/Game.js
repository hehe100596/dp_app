import React, { Component } from 'react';
import './Game.css';

class Game extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        backgroundColor: "#006600"
	};
    
    changeColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
		this.setState({
			backgroundColor: color
		});
    }

    exitGame = () => {
        window.location.reload(false);
    }

    render () {
        if (!this.props.start) {
            return null;
        }
    
        else {
            return (
                <div className="Game">
                    <header className="App-header" style={{backgroundColor: this.state.backgroundColor}}>
                        <div class="game-btn">
                            <button onClick={this.changeColor} type="button">COLOR</button>
                        </div>
                        <br />
                        <div class="game-btn">
                            <button onClick={this.exitGame} type="button">EXIT</button>
                        </div>
                    </header>
                </div>
            )
        }
    }

}
 
export default Game;