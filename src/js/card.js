import React, { Component } from 'react';
import '../css/card.css';

class Card extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var cardHeight = "calc(7vh + " + this.props.cardHeight + ")";
        var cardWidth = "20vw";
        var left = "calc(50vw - " + cardWidth + " / 2)";
        
        return (
            <div className="Card" style={{height: cardHeight, width: cardWidth, left: left}}>
            </div>
        );
    }

}
 
export default Card;