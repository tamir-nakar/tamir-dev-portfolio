class Deck {

  constructor(){
    
    this.shuffle();
  }

  // public
  isMatch(card1, card2) {

    return card1.getAttribute('id') === card2.getAttribute('id');
  }

  flipCard(card, show, revealedCard) {

    const index = card.getAttribute('index');

    flipByIndex(index, show, revealedCard);
  }

  shuffle() {
    const randArr = [];

    CARDS_ARR.forEach(card => {

      let stop = false;
      while(!stop) {

        let rand = Math.floor(Math.random() * gameManager.numPairs + 1);

        if(!randArr[rand]) {

          randArr[rand] = 1;
          stop = true;
          card.setAttribute('id', rand);
        }

        else if(randArr[rand] === 1) {

          randArr[rand]++;
          stop = true;
          card.setAttribute('id', rand);
        }
      }
    })
  }
}

// private
function flipByIndex(index, show, revealedCard) {

  const chosenCard = CARDS_ARR[index];
  const cardId = chosenCard.getAttribute('id');

  newImg = show? `./images/${cardId}.png` : `./images/cover.png`;
  chosenCard.setAttribute('src', newImg);
  if(!show){
    chosenCard.setAttribute('active', true);
  }
  if(revealedCard) {
    gameManager.revealedCard = null;
  }
  gameManager.freezeGame = false;
}
