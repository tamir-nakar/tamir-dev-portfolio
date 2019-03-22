const SHOW = true;
const REVEALD_CARD = true;

gameManager = new GameManager();
gameManager.shuffle();

// events --!
document.querySelectorAll('.card').forEach((card, index) => card.addEventListener('click', () => {
  if(!gameManager.freezeGame) flipCard(card, SHOW);
}))

// flip when clicked
document.querySelectorAll('.card').forEach((card, index) => card.addEventListener('click', () => {
  if(!gameManager.freezeGame) gameManager.handleCardReveal(card);
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
  gameManager.freezeGame = false;
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

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
