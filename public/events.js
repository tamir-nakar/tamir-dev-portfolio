
CARDS_ARR.forEach((card, index) => card.addEventListener('click', () => {
  if(!gameManager.freezeGame) deck.flipCard(card, SHOW);
}))

// flip when clicked
CARDS_ARR.forEach((card, index) => card.addEventListener('click', () => {
  if(!gameManager.freezeGame) gameManager.handleCardReveal(card);
}))

// mouseenter
CARDS_ARR.forEach((card, index) => card.addEventListener('mouseenter', () => {
  if(card.getAttribute('active') === 'true') {
    card.classList.toggle('hovered');
  }
}))

// mouseout
CARDS_ARR.forEach((card, index) => card.addEventListener('mouseout', () => {
  if(card.getAttribute('active') === 'true') {
    card.classList.toggle('hovered');
  }
}))
