class GameManager {

	constructor(numPairs) {

		this._deck = new Deck(numPairs);
		this._scoreBoard = new ScoreBoard();
		this._stopWatch = new StopWatch();
		this._remainingPairs = numPairs || 9;
		this._freezeGame = false;
		this._isGameStarted = false;
		this._matchSignal = document.querySelector('#matchSignal');
	}

	loadBestScore() {

		this._scoreBoard.handleLocalScore();
	}

	handleCardReveal(card) {

		if (!this._isGameStarted) {

			this._stopWatch.start();
			this._isGameStarted = true;
		}

		if (this._deck.isActiveCard(card)) {

			//setTimeout(this._deck.flipCard(card, SHOW),0);
			this._deck.flipCard(card, SHOW);

			if (this._deck.getRevealedCard) { // this is the second of the pair
				if (this._deck.isMatch(this._deck.getRevealedCard, card)) { // match

					this._deck.makeCardInactive(this._deck.getRevealedCard);
					this._deck.makeCardInactive(card);
					this._remainingPairs--;
					setTimeout(() => _showMatchSignal.call(this), 200);
					this._deck.hideAPair(this._deck.getRevealedCard, card, 1000);
					this._deck.setRevealedCard = null;
					this.checkIfWin();

				} else { // no match

					this._freezeGame = true;
					this._deck.blinkAPair(card, this._deck.getRevealedCard, 1500);
					setTimeout(() => { this._deck.flipCard(card, !SHOW) }, 1500);
					setTimeout(() => {

						this._deck.flipCard(this._deck.getRevealedCard, !SHOW, REVEALD_CARD);
						this._freezeGame = false
					}, 1600);
				}
			} else {
				// this is the first card reveald of the pair
				this._deck.setRevealedCard = card;
				this._deck.getRevealedCard.setAttribute('active', false);
			}
		}
	}

	checkIfWin() {

		if (this._remainingPairs === 0) {

			setTimeout(() => { alert('Congratulations, YOU WIN!') }, 200);
			setTimeout(() => { this.resetGame() }, 300);
		}
	}

	hideAllMenus() {
		_hideAllMenus.call(this);
	}

	async resetGame(isInvokedFromMenu = null) {

		this._isGameStarted = false;
		this._stopWatch.reset();
		this._deck.unhideAllCards();
		if (!isInvokedFromMenu) { // game Ended

			let score = this._stopWatch.getLastRun(); // must be invoked after stopWatch.reset()
			this._scoreBoard.handleLocalScore(score);
			let isScoreAddedToTable = await this._scoreBoard.drawAsync(score);
		}
		//this._stopWatch.zerofy();
		this._deck.clearRevealedCard();
		this._deck.flipBackAllCards();
		setTimeout(() => {

			for (let a in [1, 2, 3]) {
				this._deck.shuffle()
			}
		}, 250);
		this._remainingPairs = this._deck.getNumPairs;
	}

	async OnSubmitClickedAsync() {

		const score = this._stopWatch.getLastRun();
		this._scoreBoard.validateAndSubmitAsync(score);
	}

	async showScoreBoardAsync(score = null) {

		_hideAllMenus.call(this);
		await this._scoreBoard.drawAsync(score);
	}

	showDeckSettings() {

		UserDataManager.isMobile()
			? document.querySelector('#customizeButonTd').style.display = 'none'
			: document.querySelector('#customizeButonTd').style.display = 'block'
		_hideAllMenus.call(this);
		document.querySelector('#deckSettings').style.display = 'block';
	}

	showAboutPage() {

		_hideAllMenus.call(this);
		document.querySelector('#about').style.display = 'block';
	}

	async showCreateDeck() {

		let customizedImages = null;

		_hideAllMenus.call(this);
		if (customizedImages = UserDataManager.getCustomizedDeck()) {

			fillImageHolders(customizedImages);
		}
		document.querySelector('#customize').style.display = 'block';
	}

	hideScoreBoard() {

		this._scoreBoard.hide();
	}

	hideAboutPage() {

		document.querySelector('#about').style.display = 'none';
	}

	hideDeckSettings() {

		document.querySelector('#deckSettings').style.display = 'none';
	}

	hideCreateDeck() {

		document.querySelector('#customize').style.display = 'none';
		this.showDeckSettings();
	}

	setDeckName(deckName) {
		this._deck.setDeckName = deckName;
		gameManager.resetGame(RESET_FROM_MENU)
	}

	changeDeck(deckName) {

		this._deck.changeDeck(deckName);
		this.resetGame(RESET_FROM_MENU);
		_hideAllMenus.call(this);

	}

	getCardList() {

		return this._deck.getCardList();
	}

	loadScoreboardInBackgroundAsync() {

		this._scoreBoard.fetchScoresInBackgroundAsync();
	}
}

// private --!

function _showMatchSignal() {

	this._matchSignal.style.display = 'block';
	setTimeout(() => this._matchSignal.style.display = 'none', 750);
}

function _hideAllMenus() {

	document.querySelector('#customize').style.display = 'none';
	document.querySelector('#deckSettings').style.display = 'none';
	document.querySelector('#about').style.display = 'none';

	this._scoreBoard.hide();
}
