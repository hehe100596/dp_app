import React, { Component } from 'react';
import logo from './dice.png';
import './App.css';
import { subscribeToTimer } from './api.js';

class App extends Component {

	constructor(props) {
		super(props);
		this.offset = 0;
		subscribeToTimer(this.offset, (err, timestamp) => this.setState({ 
			timestamp
		}));
	}

	state = {
		timestamp: '---'
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
	
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Pokus o prvú aplikáciu úpravou <code>src/App.js</code> a <code>src/App.css</code>.
						<br />
						Najnovšie bol pridaný i jednoduchý ukazateľ aktuálneho času: <i>{this.state.timestamp}</i>
						<br /><br />
						Zmena časovej zóny:
						<br />
						<button onClick={this.timeZonePlus} type="button">+</button> <button onClick={this.timeZoneMinus} type="button">-</button>
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
			</div>
		);
	};
}

export default App;
