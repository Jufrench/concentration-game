const cardContainer = document.querySelector('.card-container');
const game = new Concentration();
const observerConstructor = new MyObserverConstructor();
const myObserver = new MutationObserver(observerConstructor.callback);

function Concentration() {
  this.cardsArray = [];
  this.flippedCards = 0;
  this.currentSelected = [];

  this.init = () => {
    this.createCardHTML(4);
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

  this.checkIfMatch = (cardTarget) => {
    if (this.currentSelected.length === 2) {
      console.log(this.currentSelected);
    }
    // watch.observer.observe(watch.cardList, watch.config);
    // console.log('check if i match');
    // console.log(theTwoCards);
    // if (this.currentSelected < 2) {
    //   this.currentSelected.push(cardTarget);
    //   console.log('currently selected:', this.currentSelected);
    // }
    // if (this.currentSelected.length === 2) {
    //   console.log('2 cards currently selected');
    // }
    // for (mutation of cardTarget) {
    //   console.log(mutation);
    //   console.log(mutation.type);
    // }
    // console.log(cardTarget);
  }
};
game.init();
myObserver.observe(cardContainer, observerConstructor.config);
// ========= cleaning this ============
// let config = {attributes: true, childList: true, subtree: true};
// let mutationOb = new MutationObserver(mCallback);
//
// function mCallback(mutations) {
//   console.log(mutations);
// }
//
// mutationOb.observe(cardContainer, config);
//
// cardContainer.addEventListener('click', function(e){
//   // console.log(e.target);
//   if (e.target.classList.contains('card-face')) {
//     e.target.parentElement.classList.toggle('flipped');
//   }
// });
// ========= end of cleaning this ============
// mutationOb.observe(cardContainer, config);

// button.addEventListener('click', function() {
//   container.classList.toggle('test-class');
// });

function MyObserverConstructor() {
  // this.observer = new MutationObserver(this.callback);
  this.config = {attributes: true, childList: true, subtree: true};

  this.callback = (mutationsList, observer) => {
    console.log(mutationsList);
  }

  this.test = function() {
    console.log('yo');
  }
  // this.cardList = document.querySelector('.card-list');
  // this.config = {attributes: true, childList: false, subtree: true};
  //
  // this.callback = (mutationsList) => {
    // console.log(mutationsList);

    // if (game.currentSelected < 2) {
    //     game.checkIfMatch(mutationsList[0].target);
    //     for (mutation of mutationsList) {
    //       game.checkIfMatch(mutation.target.parentElement);
    //
    //     }
    // }
    // return mutationsList[0].target;
    // game.checkIfMatch(mutationsList.target.parentElement);
    // game.checkIfMatch(mutationsList);
    // console.log(mutationsList);
    // game.checkIfMatch(mutation.type);
  // }

  // this.observer = new MutationObserver(this.callback);
}

function Card(number) {
  this.name = `card${number}`;
  this.number = number;
  this.flipped = false;

  this.flip = function() {
    this.flipped = !this.flipped;
    console.log(this.classList);
  };

  this.showMe = () => {
    console.log(`I'm number: ${this.number}`);
  };
}

cardContainer.addEventListener('click', e => {
  // if (game.flippedCards < 2) {
    if (e.target.classList.contains('card-face')) {
      e.target.parentElement.classList.toggle('flipped');
      // console.log(game.flippedCards);
      // game.flippedCards++;
    }

});
