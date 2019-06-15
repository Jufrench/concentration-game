const cardContainer = document.querySelector('.card-container');

function Concentration() {
  this.cardsArray = [];
  this.flippedCards = 0;
  this.currentSelected = [];

  this.generateCards = amount => {
    for (let i = 1; i <= amount; i++) {
      this.cardsArray.push(new Card(i));
    }

    console.log(this.cardsArray);
    this.createCardHTML(this.cardsArray.length);
    this.addElementAsCardProperty();
  }

  this.addElementAsCardProperty = () => {
    const cardList = document.querySelector('.card-list');
    for (let i = 1; i < cardList.childNodes.length; i++) {
      this.cardsArray[i - 1].element = cardList.childNodes[i];
    }
    console.log('Card List Array!');
    console.log('================');
    for (let i = 0; i < this.cardsArray.length; i++) {
        console.log(this.cardsArray[i].element);
        console.log(this.cardsArray[i].element.classList);
    }
  }

  this.createCardHTML = amount => {
    let fragment = document.createDocumentFragment();

    for (let i = 1; i <= amount; i++) {
      let card = document.createElement('li');
      card.classList.add('card');
      card.setAttribute('data-number', i);

      let cardContent = document.createElement('div');
      cardContent.classList.add('card-content');

      let cardFront = document.createElement('div');
      cardFront.textContent = 'Front';
      cardFront.classList.add('card-front', 'card-face');

      let cardBack = document.createElement('div');
      cardBack.textContent = 'Back';
      cardBack.classList.add('card-back', 'card-face');

      cardContent.appendChild(cardFront);
      cardContent.appendChild(cardBack);
      card.appendChild(cardContent);
      fragment.appendChild(card);
    }

    document.querySelector('.card-list').appendChild(fragment);
  }
};

const game = new Concentration();

function Card(number) {
  this.name = `card${number}`;
  this.number = number;
  this.flipped = false;
  // this.element = element;

  this.flip = function() {
    this.flipped = !this.flipped;
    console.log(this.classList);
  };

  this.showMe = () => {
    console.log(`I'm number: ${this.number}`);
  };
}

(function eventListeners() {
  document.querySelector('.card-container').addEventListener('click', e => {
    // if (game.flippedCards < 2) {
      if (e.target.classList.contains('card-face')) {
        e.target.parentElement.classList.toggle('flipped');
        console.log(game.flippedCards);
        game.flippedCards++;
      }
    // } else {
    //   console.log('you done');
    // }
  });
})();
