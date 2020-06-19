let choseNumberOfPlayersButtons;
let choseNumberOfPlayerButtonPadding;
let numberOfPlayers;
let numberOfCardsPerPlayer;
let phase;
let phaseStartFrame;
let deck;
let hand;

let confirmButton;
let valueButtons;
let suitButtons;
let currentEditIndex;

let canRedo;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width, height);
  angleMode(DEGREES);
  // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    
  // }
  deck = new Deck(true);
  hand = new Deck(false);
  phaseStartFrame = new Array(4).fill(-1);
  phase = 0;

  canRedo = false;

  currentEditIndex = -1;

  phaseStartFrame[phase] = frameCount;
  choseNumberOfPlayerButtonPadding = width * 0.01;
  choseNumberOfPlayersButtons = createChosePlayersButtonsArray();
}

function createConfirmButton() {
  let toReturn = createButton("Confirm");
  let boarderThickness = width / 1000;
  toReturn.position(choseNumberOfPlayerButtonPadding, choseNumberOfPlayerButtonPadding);
  toReturn.style("width", (width - (choseNumberOfPlayerButtonPadding * 2)).toString() + "px");
  toReturn.style("height", ((height / 6) - choseNumberOfPlayerButtonPadding * 2).toString() + "px");
  toReturn.style("background-color", color(51));
  toReturn.style("border", boarderThickness.toString() + "px solid white");
  toReturn.style("color", "white");
  toReturn.style("font-size", (((height / 6) - choseNumberOfPlayerButtonPadding * 2) * 0.6).toString() + "px");
  toReturn.style("text-align", "center");
  toReturn.style("border-radius", (((height / 6) - choseNumberOfPlayerButtonPadding * 2) * 0.1).toString() + "px");
  toReturn.class("chosePlayerButton");
  toReturn.mousePressed(confirmCards);
  return toReturn;
}

function confirmCards() {

  for(let i = 0; i < hand.cards.length; i++) {
    hand.cards[i].isHighlighted = false;
  }

  let indexArrayOfBestDiscards = HandDecider.bestDiscards(hand);
  for(let i = 0; i < indexArrayOfBestDiscards.length; i++) {
    hand.cards[indexArrayOfBestDiscards[i]].isHighlighted = true;
  }

  advancePhase();
}

function createValueButtonsArray() {
  let toReturn = [];
  let boarderThickness = width / 1000;
  let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let buttonWidth = width / values.length;
  for(let i = 0; i < values.length; i++) {
    toReturn.push(createButton(values[i]));
    let currentButton = toReturn[toReturn.length - 1];
    currentButton.position(map(i, 0, values.length - 1, 0, width - buttonWidth), height / 6);
    currentButton.style("width", (buttonWidth).toString() + "px");
    currentButton.style("height", (height / 6).toString() + "px");
    currentButton.style("background-color", color(51));
    currentButton.style("border", boarderThickness.toString() + "px solid white");
    currentButton.style("color", "white");
    currentButton.style("font-size", ((height / 6) * 0.5).toString() + "px");
    currentButton.style("text-align", "center");
    currentButton.class("chosePlayerButton");
    currentButton.mousePressed(updateHighlightedCardValue);
  }
  return toReturn;
}

function updateHighlightedCardValue() {
  if(currentEditIndex != -1) {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let indexOfValue = floor(mouseX / (width / values.length));
    hand.cards[currentEditIndex] = new Card(values[indexOfValue] + hand.cards[currentEditIndex].suit().charAt(0), hand.cards[currentEditIndex].position.x, hand.cards[currentEditIndex].position.y);
    hand.cards[currentEditIndex].isHighlighted = true;
  }
}

function createSuitButtonsArray() {
  let toReturn = [];
  let boarderThickness = width / 1000;
  let suits = ["♠", "♥", "♣", "♦"];
  let buttonWidth = width / suits.length;
  for(let i = 0; i < suits.length; i++) {
    toReturn.push(createButton(suits[i]));
    let currentButton = toReturn[toReturn.length - 1];
    currentButton.position(map(i, 0, suits.length - 1, 0, width - buttonWidth), height / 3);
    currentButton.style("width", (buttonWidth).toString() + "px");
    currentButton.style("height", (height / 6).toString() + "px");
    currentButton.style("background-color", color(51));
    currentButton.style("border", boarderThickness.toString() + "px solid white");
    currentButton.style("color", color(int(i % 2 == 1) * 255, 0, 0));
    currentButton.style("font-size", ((height / 6) * 0.5).toString() + "px");
    currentButton.style("text-align", "center");
    currentButton.class("chosePlayerButton");
    currentButton.mousePressed(updateHighlightedCardSuit);
  }
  return toReturn;
}

function updateHighlightedCardSuit() {
  if(currentEditIndex != -1) {
    let suits = ["S", "H", "C", "D"];
    let indexofSuit = floor(mouseX / (width / suits.length));
    let card = hand.cards[currentEditIndex].valueName().substring(0, (hand.cards[currentEditIndex].card.length == 3) ? (2) : (1)) + suits[indexofSuit];
    hand.cards[currentEditIndex] = new Card(card, hand.cards[currentEditIndex].position.x, hand.cards[currentEditIndex].position.y);
    hand.cards[currentEditIndex].isHighlighted = true;
  }
}

function createChosePlayersButtonsArray() {
  let toReturn = [];
  let boarderThickness = width / 100;
  for(let i = 0; i < 2; i++) {
    toReturn.push(createButton((i + 2).toString()));
    let currentButton = toReturn[toReturn.length - 1];
    currentButton.position(choseNumberOfPlayerButtonPadding + (i * width / 2), (height / 6) + choseNumberOfPlayerButtonPadding);
    currentButton.style("width", (width / 2 - (choseNumberOfPlayerButtonPadding * 2)).toString() + "px");
    currentButton.style("height", ((5 * height / 6) - choseNumberOfPlayerButtonPadding * 2).toString() + "px");
    currentButton.style("background-color", color(51));
    currentButton.style("border", boarderThickness.toString() + "px solid white");
    currentButton.style("color", "white");
    currentButton.style("font-size", ((width / 2 - (choseNumberOfPlayerButtonPadding * 2)) / 5).toString() + "px");
    currentButton.style("text-align", "center");
    currentButton.style("border-radius", "7%");
    currentButton.class("chosePlayerButton");
  }
  toReturn[0].mousePressed(notifyTwoPlayers);
  toReturn[1].mousePressed(notifyThreePlayers);
  return toReturn;
}

function notifyTwoPlayers() {
  choseNumberOfPlayers(2);
  for(let i = 0; i < choseNumberOfPlayersButtons.length; i++) {
    choseNumberOfPlayersButtons[i].hide();
  }
}

function notifyThreePlayers() {
  choseNumberOfPlayers(3);
  for(let i = 0; i < choseNumberOfPlayersButtons.length; i++) {
    choseNumberOfPlayersButtons[i].hide();
  }
}

function choseNumberOfPlayers(n) {
  numberOfPlayers = n;
  numberOfCardsPerPlayer = numberOfPlayers == 2 ? (6) : (5);
  for(let i = 0; i < numberOfCardsPerPlayer; i++) {
    deck.dealRandomCardTo(hand);
  }
  let amountThatCardWillOccupy = (numberOfCardsPerPlayer * hand.cards[0].dimension.x) + ((numberOfCardsPerPlayer - 1) * (hand.cards[0].dimension.x) / 2);
  let startingXForCards = (width - amountThatCardWillOccupy) / 2;
  for(let i = 0; i < hand.cards.length; i++) {
    hand.cards[i].position.x = map(i, 0, hand.cards.length - 1, startingXForCards, startingXForCards + amountThatCardWillOccupy);
    hand.cards[i].position.y = 0;
  }
  advancePhase();
}

function advancePhase() {
  if(phase == 2) {
    confirmButton.hide();
    for(let i = 0; i < valueButtons.length; i++) {
      valueButtons[i].hide();
    }
    for(let i = 0; i < suitButtons.length; i++) {
      suitButtons[i].hide();
    }
  }
  phase++;
  phaseStartFrame[phase - 1] = -1;
}

function retractPhase() {
  for(let i = 0; i < hand.cards.length; i++) {
    hand.cards[i].isHighlighted = false
  }
  currentEditIndex = -1;
  // currentEditIndex = floor(Math.random() * hand.cards.length);
  // hand.cards[currentEditIndex].isHighlighted = true;
  canRedo = false;
  if(phase == 3) {
    confirmButton.show();
    for(let i = 0; i < valueButtons.length; i++) {
      valueButtons[i].show();
    }
    for(let i = 0; i < suitButtons.length; i++) {
      suitButtons[i].show();
    }
  }
  phase--;
  phaseStartFrame[phase + 1] = -1;
}

function draw() {
  always();
  switch(phase) {
    case 0:
      phaseZero();
      break;
    case 1:
      phaseOne();
      break;
    case 2:
      phaseTwo();
      break;
    case 3:
      phaseThree();
      break;
    default:
      throw "UNKNOWN PHASE";
      break;
  }
}

function always() {
  if(phaseStartFrame[phase] == -1) {
    phaseStartFrame[phase] = frameCount;
  }
  background(51);
}

function smoothTransition(startValue, endValue, duration, variable) {
  if(variable < 0) {
    return startValue;
  }
  if(variable > duration) {
    return endValue;
  }
  let first = (startValue - endValue) / (2);
  angleMode(RADIANS);
  let second = cos((variable) / ((duration) / (PI)));
  angleMode(DEGREES);
  let third = (startValue + endValue) / (2);
  return first * second + third
}

function phaseZero() {
  let message = "How Many Players?";
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
  let tempSize = (height / 6) * 0.75;
  textSize(tempSize);
  while(textWidth(message) > width - choseNumberOfPlayerButtonPadding * 2) {
    tempSize -= 1;
    textSize(tempSize);
  }
  text(message, width / 2, height / 12);
}

function phaseOne() {
  let framesElapsed = frameCount - phaseStartFrame[phase];
  let animationDuration = 60;
  for(let i = 0; i < hand.cards.length; i++) {
    if(hand.cards[i].mouseIsOverCard()) {
      hand.cards[i].tempHighlighted = true;
    } else {
      hand.cards[i].tempHighlighted = false;
    }
  }
  hand.show();
  hand.update(smoothTransition(0, height - hand.cards[0].dimension.y / 2, animationDuration, framesElapsed), min(((height - hand.cards[0].dimension.y) - height / 2), hand.cards[0].dimension.y * 0.50));
  if(smoothTransition(0, height - hand.cards[0].dimension.y / 2, animationDuration, framesElapsed) == height - hand.cards[0].dimension.y / 2) {
    advancePhase();
    currentEditIndex = int(Math.random() * hand.cards.length);
    hand.cards[currentEditIndex].isHighlighted = true;
    confirmButton = createConfirmButton();
    valueButtons = createValueButtonsArray();
    suitButtons = createSuitButtonsArray();
  }
}

function phaseTwo() {
  for(let i = 0; i < hand.cards.length; i++) {
    if(hand.cards[i].mouseIsOverCard()) {
      hand.cards[i].tempHighlighted = true;
    } else {
      hand.cards[i].tempHighlighted = false;
    }
  }
  hand.show();
  hand.update(height - hand.cards[0].dimension.y / 2, min(((height - hand.cards[0].dimension.y) - height / 2), hand.cards[0].dimension.y * 0.50));
}

function phaseThree() {
  hand.show();
  let start = height - hand.cards[0].dimension.y / 2;
  let end = height / 2;
  let x = frameCount - phaseStartFrame[phase];
  let duration = 30;
  hand.update(smoothTransition(start, end, duration, x), min(((height - hand.cards[0].dimension.y) - height / 2), hand.cards[0].dimension.y * 0.50));
  if(smoothTransition(start, end, duration, x) == end) {
    canRedo = true;
  }
  textSize(height / 40);
  textAlign(CENTER, BOTTOM);
  text("Click anywhere to redo", width / 2, height - choseNumberOfPlayerButtonPadding);
}

function mousePressed() {

  if(phase == 2 && mouseY >= height / 2) {
    currentEditIndex = -1;
    for(let i = 0; i < hand.cards.length; i++) {
      hand.cards[i].isHighlighted = hand.cards[i].mouseIsOverCard();
      if(hand.cards[i].isHighlighted) {
        currentEditIndex = i;
      }
    }
  }

}

function mouseClicked() {
  if(canRedo) {
    retractPhase();
  }
}

class HandDecider {
  static bestDiscards(hand) {
    let c = [...hand.cards];

    if(c.length == 5) {
      console.log("Recognized 5 cards in hand");

      let scoresForEachCard = new Array(c.length);
      for(let i = 0; i < scoresForEachCard.length; i++) {
        scoresForEachCard[i] = 0;
      }

      let restOfCards = new Deck(true);
      for(let i = 0; i < c.length; i++) {
        restOfCards.removeCard(c[i]);
      }

      for(let i = 0; i < c.length; i++) {
        let handWithoutCard = new Deck(false);
        for(let add = 0; add < c.length; add++) {
          handWithoutCard.addCard(c[add]);
        }
        handWithoutCard.removeCard(c[i]);
        for(let j = 0; j < restOfCards.cards.length; j++) {
          scoresForEachCard[i] += HandScorer.score(restOfCards.cards[j], handWithoutCard);
          handWithoutCard.removeCard(restOfCards.cards[j]);
        }
      }
      return [scoresForEachCard.indexOf(Math.max(...scoresForEachCard))];

    } else {

      let scoresForEachPair = new Array(15);
      for(let i = 0; i < scoresForEachPair.length; i++) {
        scoresForEachPair[i] = 0;
      }

      let restOfCards = new Deck(true);
      for(let i = 0; i < c.length; i++) {
        restOfCards.removeCard(c[i]);
      }

      let manualCounter = 0;
      for(let first = 0; first < c.length - 1; first++) {
        for(let second = first + 1; second < c.length; second++) {

          let handWithoutCards = new Deck(false);
          for(let j = 0; j < c.length; j++) {
            handWithoutCards.addCard(c[j]);
          }
          handWithoutCards.removeCard(c[first]);
          handWithoutCards.removeCard(c[second]);

          for(let i = 0; i < restOfCards.cards.length; i++) {
            scoresForEachPair[manualCounter] += HandScorer.score(restOfCards.cards[i], handWithoutCards);
            handWithoutCards.removeCard(restOfCards.cards[i]);
          }
          manualCounter++;

        }
      }

      let indexOfMaximum = scoresForEachPair.indexOf(Math.max(...scoresForEachPair));
      manualCounter = 0;
      for(let first = 0; first < c.length - 1; first++) {
        for(let second = first + 1; second < c.length; second++) {
          if(manualCounter == indexOfMaximum) {
            return [first, second];
          }
          manualCounter++;
        }
      }
      console.log("YOU DO NOT WANT TO SEE THIS");
    }
  }
}

class HandScorer {

  static score(draw, hand) {
    if(hand.cards.length != 4) {
      throw "There is not 5 cards in hand. Cannot score... (first)"
    }

    let total = 0;
    total += this.pointsFromKnobs(draw, hand);

    hand.addCard(draw);
    hand = this.sortedCardsFromArray(hand);

    if(hand.cards.length != 5) {
      throw "There is not 5 cards in hand. Cannot score... (second)"
    }

    total += this.pointsFromPairs(hand);
    total += this.pointsFromFifteens(hand); 
    total += this.pointsFromFlush(hand);
    total += this.pointsFromRuns(hand);

    if(false) {
      console.log("Points From Pairs: " + this.pointsFromPairs(hand));
      console.log("Points From 15s: " + this.pointsFromFifteens(hand));
      console.log("Points From Flush: " + this.pointsFromFlush(hand));
      console.log("Points From Runs: " + this.pointsFromRuns(hand));
      console.log("Hand: " + hand.printShort());
      console.log("Points: " + total); 
    }

    return total;
  }

  //  This works!
  static sortedCardsFromArray(hand) {
    let toReturn = [];

    for(let current = 0; current < hand.cards.length; current++) {
      if(toReturn.length == 0) {
        toReturn.push(hand.cards[current]);
      } else {
        let i = 0;
        while(i < toReturn.length && hand.cards[current].rawValue() > toReturn[i].rawValue()) {
          i++;
        }
        toReturn.splice(i, 0, hand.cards[current]);
      }
    }
    let sorted = new Deck(false);
    for(let i = 0; i < toReturn.length; i++) {
      sorted.addCard(toReturn[i]);
    }
    return sorted;
  }

  static pointsFromRuns(hand) {
    let total = 0;

    let shouldCheckIndex = [];

    for(let i = 0; i < hand.cards.length; i++) {
      //don't check the last two because there is no 
      //possible way those can be a run of 3 or more
      shouldCheckIndex.push(i < hand.cards.length - 2);
    }

    for(let currentCardIndex = 0; currentCardIndex < hand.cards.length; shouldCheckIndex[currentCardIndex] = false, currentCardIndex++) {
      if(shouldCheckIndex[currentCardIndex]) {

        let currentCardValue = hand.cards[currentCardIndex].rawValue();
        let currentStreak = 1;

        //think of this as a "not checked" list
        let bufferIndexArray = []
        for(let fillBuffer = 0; fillBuffer < hand.cards.length; fillBuffer++) {
            bufferIndexArray.push(true);
        }
        let duplicateMultiplier = 1;
        let valueOfFirstDuplicate = -1;
        let multipleDuplicates = false;
        for(let futureCardIndex = currentCardIndex + 1; futureCardIndex < hand.cards.length + 1; futureCardIndex++) {
          if(futureCardIndex < hand.cards.length && hand.cards[futureCardIndex].rawValue() == currentCardValue) {
            duplicateMultiplier++;
            if(valueOfFirstDuplicate != -1 && valueOfFirstDuplicate != currentCardValue) {
              multipleDuplicates = true;
            }
            valueOfFirstDuplicate = currentCardValue;
            continue;
          }
          if(futureCardIndex < hand.cards.length && hand.cards[futureCardIndex].rawValue() == currentCardValue + 1) {
            currentStreak++;
            currentCardValue++;
            bufferIndexArray[futureCardIndex] = false;
          } else {
            if(currentStreak >= 3) {
              total += (currentStreak * (duplicateMultiplier + int(multipleDuplicates)));
              for(let b = 0; b < bufferIndexArray.length; b++) {
                if(shouldCheckIndex[b] && !bufferIndexArray[b]) {
                  shouldCheckIndex[b] = false;
                }
              }
            } else {
              currentStreak = 0;
            }
            break;
          }
        }
        
      }
    }

    return total;
  }

  static pointsFromFlush(hand) {
    let suitOfFlush = hand.cards[0].suit().toLowerCase();
    for(let i = 1; i < hand.cards.length; i++) {
      if(hand.cards[i].suit().toLowerCase() != suitOfFlush) {
        return 0;
      }
    }
    return hand.cards.length;
  }

  static numbersBetweenWithout(start, end, without) {
    let toReturn = [];
    let current = start;
    while(current <= end) {
      if(current != without) {
        toReturn.push(current);
      }
      current++;
    }
    return toReturn;
  }

  static createFifteensPossibleCombos() {
    let toReturn = [];
    for(let i = 0; i <= 4; i++) {
      toReturn.push(this.numbersBetweenWithout(0, 4, i));
    }
    for(let first = 0; first <= 3; first++) {
      for(let second = first + 1; second <= 4; second++) {
        toReturn.push([first, second]);
      }
    }
    for(let first = 0; first <= 2; first++) {
      for(let second = first + 1; second <= 3; second++) {
        for(let third = second + 1; third <= 4; third++) {
          toReturn.push([first, second, third]);
        }
      }
    }
    return toReturn;
  }

  static pointsFromFifteens(hand) {
    let total = 0;
    let indexesOfPossibleFifteens = this.createFifteensPossibleCombos();
    for(let i = 0; i < indexesOfPossibleFifteens.length; i++) {
      let currentSetArray = indexesOfPossibleFifteens[i];
      let currentSum = 0;
      for(let j = 0; j < currentSetArray.length; j++) {
        currentSum += hand.cards[currentSetArray[j]].value();
        if(currentSum > 15) {
          break;
        }
      }
      total += int(currentSum == 15) * 2;
    }
    return total;
  }

  static pointsFromKnobs(draw, hand) {
    for(let i = 0; i < hand.cards.length; i++) {
      if(hand.cards[i].valueName().toLowerCase() == "jack") {
        if(hand.cards[i].suit().toLowerCase() == draw.suit().toLowerCase()) {
          return 1;
        }
      }
    }
    return 0;
  }

  static pointsFromPairs(hand) {
    let total = 0;
    for(let first = 0; first < hand.cards.length - 1; first++) {
      for(let second = first + 1; second < hand.cards.length; second++) {
        if(hand.cards[first].valueName() == hand.cards[second].valueName()) {
          total += 2;
        }
      }
    }
    return total;
  }
}
