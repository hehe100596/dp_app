import React, { Component } from 'react';
import logo from '../img/dice.png';
import '../css/app.css';
import { subscribeToTimer } from './api.js';
import Game from './game.js';

class App extends Component {

	constructor(props) {
		super(props);
		this.offset = 0;
		subscribeToTimer(this.offset, (err, timestamp) => this.setState({ 
			timestamp
		}));
	}

	state = {
		timestamp: '---',
		displayGame: false
	};
	
	timeZonePlus = () => {
		this.offset++;
		subscribeToTimer(this.offset, (err, timestamp) => this.setState({ 
			timestamp
		}));
	};
	
	timeZoneMinus = () => {
		this.offset--;
		subscribeToTimer(this.offset, (err, timestamp) => this.setState({ 
			timestamp
		}));
	};

	displayGame = () => {
		this.setState({
			displayGame: !this.state.displayGame
		});
	}
	
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						<br />
						Prototyp hry:
						<br /><br />
						<div class="game-btn">
							<button onClick={this.displayGame} type="button">START</button>
						</div>
						<br /><br />
						Ukazateľ aktuálneho času na ilustráciu komunikácie so serverom:
						<br />
						<i>{this.state.timestamp}</i>
						<br /><br />
						Zmena časovej zóny:
						<br />
						<div class="timer-btn">
							<button onClick={this.timeZonePlus} type="button">+</button> <button onClick={this.timeZoneMinus} type="button">-</button>
						</div>
						<br />
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Ďalšie informácie k React...
					</a>
				</header>
				<Game 
					start = {this.state.displayGame}
				/>
			</div>
		);
	};
}

export default App;
