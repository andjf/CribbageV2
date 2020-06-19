/** @class Card representing a card. */
class Card {

    /**
    * Creates an instance of Card
    *
    * @constructor
    * @author: andjf
    * @param {string} c the string representation of the card ex. "5H"
    * @param {number} x the initial x position of the card (optional)
    * @param {number} y the initial y position of the card (optional)
    */
    constructor(c, x = 0, y = 0) {
        this.card = c;
        this.position = createVector(x, y);
        this.dimension = createVector(width / 10, width * 0.15);
        this.theta = 0;
        this.highlightPercent = 0;
        this.isHighlighted = false;
        this.tempHighlighted = false;
    }

    /**
    * Returns the value of the card according to the rules of Cribbage
    *
    * @return {number} the value of the card as if you were counting it in pegging [1, 10]
    */
    value() {
        let valueLiteral = this.card.substring(0, this.card.length == 2 ? 1 : 2);
        if (valueLiteral.toLowerCase().charAt(0) == "a") {
            return 1;
        }
        if (isNaN(valueLiteral)) {
            return 10;
        }
        return parseInt(valueLiteral);
    }

    /**
    * Returns the raw value of the card
    *
    * @return {number} the raw value of the card accounting for face cards [1, 13]
    */
    rawValue() {
        if (this.value() < 10) {
            return this.value();
        }
        switch (this.valueName().toLowerCase()) {
            case "jack":
                return 11;
            case "queen":
                return 12;
            case "king":
                return 13;
            default:
                return 10;
        }
    }

    /**
    * Returns the name of the card
    *
    * @return {string} the name of the card as a string ex. "Jack" or "4"
    */
    valueName() {
        if (this.value() > 1 && this.value() < 10) {
            return this.value().toString();
        }
        switch (this.card.toLowerCase().substring(0, this.card.length == 2 ? 1 : 2)) {
            case "a":
                return "Ace";
            case "j":
                return "Jack"
            case "q":
                return "Queen";
            case "k":
                return "King";
            case "1":
                return "Ace";
            case "10":
                return "10";
            default:
                return "Something went wrong..."
        }
    }

    /**
    * Returns the shortened name of the card
    *
    * @return {string} the shortened name of the card as a string ex. "J" or "10"
    */
    valueNameShort() {
        if (isNaN(this.valueName())) {
            return this.valueName().charAt(0);
        }
        return this.valueName();
    }

    /**
    * Returns the suit of the card
    *
    * @return {string} the suit of the card ex. "Spades"
    */
    suit() {
        switch (this.card.toLowerCase().substring(this.card.length == 2 ? 1 : 2).charAt(0)) {
            case "s":
                return "Spades";
            case "h":
                return "Hearts";
            case "d":
                return "Diamonds";
            case "c":
                return "Clubs";
            default:
                return "Something went wrong..."
        }
    }

    /**
    * Returns the suit symbol of the card
    *
    * @return {string} the suit symbol of the card ex. "♠"
    */
    suitShort() {
        switch (this.card.toLowerCase().substring(this.card.length == 2 ? 1 : 2).charAt(0)) {
            case "s":
                return "♠";
            case "h":
                return "♥";
            case "d":
                return "♦";
            case "c":
                return "♣";
            default:
                return "Something went wrong..."
        }
    }

    /**
    * Returns the card represented as a string
    *
    * @return {string} the card as a string ex. "Queen of Spades"
    */
    print() {
        return this.valueName() + " of " + this.suit();
    }

    /**
    * Returns the card represented as a shortened string
    *
    * @return {string} the card as a shortened string ex. "Q♠"
    */
    printShort() {
        return this.valueName() + this.suitShort();
    }
    
    /**
    * Updates the card based on its "highlighted" status
    *
    * @param {number} basicY The y position of the card if it was not highlighted
    * @param {number} amountMove The amount that the card should move if highlighted
    */
    update(basicY, amountMove) {
        if (this.isHighlighted || this.tempHighlighted) {
            this.highlightPercent += (1 - this.highlightPercent) * 0.1;
        } else {
            this.highlightPercent -= (this.highlightPercent) * 0.1;
        }
        //I don't think you need this next line, but I put it in as a safeguard
        this.highlightPercent = constrain(this.highlightPercent, 0, 1);
        this.position.y = basicY - (this.highlightPercent * amountMove);
    }

    /**
    * Returns if the mouse is currently over this card
    *
    * @return {boolean} True if the mouse is over the card, false if the mouse is not
    */
    mouseIsOverCard() {
        if (mouseX >= this.position.x - this.dimension.x / 2 && mouseX <= this.position.x + this.dimension.x / 2) {
            if (mouseY >= this.position.y - this.dimension.y / 2 && mouseY <= this.position.y + this.dimension.y / 2) {
                return true;
            }
        }
        return false;
    }

    /**
    * Shows the card according to its position, angle, highlighted status, and dimensions
    */
    show() {
        fill(255);
        rectMode(CENTER);
        push();
        translate(this.position.x, this.position.y);
        rotate(this.theta);
        if (this.isHighlighted) {
            stroke(255, 230, 43, 200);
            strokeWeight(width / 200);
        }
        rect(0, 0, this.dimension.x, this.dimension.y, this.dimension.x / 12);
        noStroke();
        fill(color(int((this.suitShort() == "♥" || this.suitShort() == "♦")) * 255, 0, 0));
        textAlign(CENTER, CENTER);
        textSize(this.dimension.x / 2);
        text(this.suitShort(), 0, 0);
        fill(0);
        textAlign(LEFT, TOP);
        textSize(this.dimension.x / 4);
        text(this.valueNameShort(), -this.dimension.x / 2 + this.dimension.x / 20, -this.dimension.y / 2 + this.dimension.x / 20);
        rotate(180);
        text(this.valueNameShort(), -this.dimension.x / 2 + this.dimension.x / 20, -this.dimension.y / 2 + this.dimension.x / 20);
        pop();
    }
}
