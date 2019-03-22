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

        if(isMatch(this.revealedCard, card)) { // match

          this.revealedCard.setAttribute('active', false);
          card.setAttribute('active', false);
          this.revealedCard = null;
          this.pairsCount--;
          this.checkIfWin();
        }

        else { // no match

          this.freezeGame = true;
          setTimeout(()=>{flipCard(card, !SHOW)},500); // will unfreez
          setTimeout(()=>{flipCard(this.revealedCard,!SHOW, REVEALD_CARD)},500);
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

  shuffle() {

    const cardsArr = document.querySelectorAll('.card');
    const randArr = [];

    cardsArr.forEach(card => {
      stop = false;
      while(!stop) {
        let rand = Math.floor(Math.random() * this.numPairs + 1);
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

  resetGame() {

    const cardsArr = document.querySelectorAll('.card');
    cardsArr.forEach(card => flipCard(card, !SHOW));
    this.shuffle();
    this.pairsCount = 9;
  }

}
