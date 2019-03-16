const SHOW = true;
const REVEALD_CARD = true;

class GameManager {

  constructor (numPairs) {

    this.revealedCard = null;
    this.numPairs = numPairs || 9;
    this.pairsCount = numPairs || 9;
  }

  handleCardReveal(card) {
    if(card.getAttribute('active') === 'true') {
      if(this.revealedCard) { // this is the second of the pair
        if(isMatch(this.revealedCard, card)) { // match
          this.revealedCard.setAttribute('active', false);
          card.setAttribute('active', false);
          this.revealedCard = null;
          this.pairsCount--;
          if(this.pairsCount === 0) {
            setTimeout(()=>{alert('YOU WIN!')}, 200);
            setTimeout(()=>{this.resetGame()},300);
          }
          console.log(`MATCH: COUNT IS NOW ${this.pairsCount}` );
        }
        else { // no match

          setTimeout(()=>{flipCard(card, !SHOW)},500);
          setTimeout(()=>{flipCard(this.revealedCard,!SHOW, REVEALD_CARD)},500);
          console.log('no match');
        }
      }
      else { // this is the first card reveald of the pair
        this.revealedCard = card;
        this.revealedCard.setAttribute('active', false);

      }
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

gameManager = new GameManager();
gameManager.shuffle();
// events --!

document.querySelectorAll('.card').forEach((card, index) => card.addEventListener('click', () => {
  flipCard(card, SHOW);
}))

// flip when clicked
document.querySelectorAll('.card').forEach((card, index) => card.addEventListener('click', () => {
  gameManager.handleCardReveal(card);
}))

// mouseenter
document.querySelectorAll('.card').forEach((card, index) => card.addEventListener('mouseenter', () => {
  if(card.getAttribute('active') === 'true') {
    card.classList.toggle('hovered');
  }
}))

// mouseout
document.querySelectorAll('.card').forEach((card, index) => card.addEventListener('mouseout', () => {
  if(card.getAttribute('active') === 'true') {
    card.classList.toggle('hovered');
  }
}))

// functions --!

isMatch = (card1, card2) => {

  return card1.getAttribute('id') === card2.getAttribute('id');
}

flipByIndex = (index, show, revealedCard) => {
  const cardsArr = document.querySelectorAll('.card');
  const chosenCard = cardsArr[index];
  const cardId = chosenCard.getAttribute('id');

  newImg = show? `./images/${cardId}.png` : `./images/cover.png`;
  chosenCard.setAttribute('src', newImg);
  if(!show){
    chosenCard.setAttribute('active', true);
  }
  if(revealedCard) {
    gameManager.revealedCard = null;
  }

}

flipCard = (card, show, revealedCard) => {

  const index = card.getAttribute('index');
  flipByIndex(index, show, revealedCard);
}

getCardIdByIndex = (index) => {

  const cardsArr = document.querySelectorAll('.card');
  const chosenCard = cardsArr[index];

  return chosenCard.getAttribute('id');
}

