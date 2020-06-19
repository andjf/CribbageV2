/** @class Deck representing a deck of cards. */
class Deck {

    /**
    * Creates an instance of Deck
    *
    * @constructor
    * @author: andjf
    * @param {boolean} shouldStartFull If true, the deck will start as a standard Deck, otherwise it will start empty (optional).
    */
    constructor(shouldStartFull = false) {
        this.cards = new Array(0);
        if (shouldStartFull) {
            let suits = ["S", "H", "C", "D"];
            let extra = ["J", "Q", "K"];
            for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
                this.cards.push(new Card("A" + suits[suitIndex]));
                for (let value = 2; value <= 10; value++) {
                    this.cards.push(new Card(value.toString() + suits[suitIndex]));
                }
                for (let faceCardIndex = 0; faceCardIndex < extra.length; faceCardIndex++) {
                    this.cards.push(new Card(extra[faceCardIndex] + suits[suitIndex]));
                }
            }
        }
    }

    /**
    * Shuffles all of the cards in the deck
    */
    shuffle() {
        for (var i = this.cards.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    /**
    * Deals a random card from the deck to a different deck
    * This will remove the card from this deck and add it to the other deck
    *
    * @param {Deck} otherDeck The deck that this deck should deal a card to
    */
    dealRandomCardTo(otherDeck) {
        this.shuffle();
        otherDeck.cards.push(this.cards.pop());
    }

    /**
    * Adds a specified card to this deck
    *
    * @param {Card} cardToAdd The card that should be added to this deck
    */
    addCard(cardToAdd) {
        this.cards.push(cardToAdd);
    }

    /**
    * Removes a card from this deck
    *
    * @param {Card} cardToRemove The card to remove from the deck
    * @return {Card} The card that was removed if the card was removed successfully, otherwise throws an error.
    */
    removeCard(cardToRemove) {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].card.toLowerCase() == cardToRemove.card.toLowerCase()) {
                return this.cards.splice(i, 1);
            }
        }
        throw "Cannot Remove Card. Card Not Found.";
    }

    /**
    * Shows all of the cards in this deck
    */
    show() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].show();
        }
    }

    /**
    * Updates all of the cards in this deck
    */
    update(y, amountMove) {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].update(y, amountMove);
        }
    }

    /**
    * Prints out this deck in an array style (["5 of Hearts", ..., "Queen of Spades"])
    *
    * @return {string} The string representation of this deck
    */
    print() {
        let toReturn = "[";
        for (let i = 0; i < this.cards.length - 1; i++) {
            toReturn += this.cards[i].print() + ", ";
        }
        return toReturn + this.cards[this.cards.length - 1].print() + "]";
    }

    /**
    * Prints out this deck in an array style according the the cards printShort function
    *
    * @return {string} The abridged string representation of this deck
    */
    printShort() {
        let toReturn = "[";
        for (let i = 0; i < this.cards.length - 1; i++) {
            toReturn += this.cards[i].printShort() + ", ";
        }
        return toReturn + this.cards[this.cards.length - 1].printShort() + "]";
    }

}
