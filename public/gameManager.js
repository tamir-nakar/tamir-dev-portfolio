class GameManager {

  constructor (numPairs) {

    this.revealedCard = null; // the (possibly) revealed card in the board
    this.numPairs = numPairs || 9;
    this.pairsCount = numPairs || 9;
    this.freezeGame = false;
  }

  handleCardReveal(card) {

    if(card.getAttribute('active') === 'true') {

      if(this.revealedCard) { // this is the second of the pair

        if(deck.isMatch(this.revealedCard, card)) { // match

          this.revealedCard.setAttribute('active', false);
          card.setAttribute('active', false);
          this.revealedCard = null;
          this.pairsCount--;
          this.checkIfWin();
        }

        else { // no match

          this.freezeGame = true;
          setTimeout(()=>{deck.flipCard(card, !SHOW)},500); // will unfreez
          setTimeout(()=>{deck.flipCard(this.revealedCard,!SHOW, REVEALD_CARD)},500);
          console.log('no match');
        }
      }

      else {
         // this is the first card reveald of the pair
        this.revealedCard = card;
        this.revealedCard.setAttribute('active', false);
      }
    }
  }

  checkIfWin() {

    if(this.pairsCount === 0) {

      setTimeout(()=>{alert('YOU WIN!')}, 200);
      setTimeout(()=>{this.resetGame()},300);
    }
  }

  resetGame() {

    CARDS_ARR.forEach(card => deck.flipCard(card, !SHOW));
    deck.shuffle();
    this.pairsCount = 9;
  }
}
