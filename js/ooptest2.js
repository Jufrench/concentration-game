   const cardContainer = document.querySelector('.card-container');
   const cardLis = document.querySelectorAll('.card');
   const cardList = document.querySelector('.card-list');
   const game = new Concentration();
   const operator = new Operator();
   const observerConstructor = new MyObserverConstructor();
   const myObserver = new MutationObserver(observerConstructor.callback);
   const cardState = new CardState();

   function Concentration() {
     this.icons = ['fa-crow', 'fa-crow', 'fa-horse', 'fa-horse', 'fa-cat',
     'fa-cat',  'fa-otter', 'fa-otter', 'fa-hippo', 'fa-hippo', 'fa-fish',
     'fa-fish', 'fa-frog', 'fa-frog', 'fa-dragon', 'fa-dragon'];

     this.domMoves = document.querySelector('.moves');
     this.movesCount = 0;

     this.init = () => {
       this.createCardHTML(4);
     }

     this.createCardHTML = amount => {
       amount = amount * 2;
       let fragment = document.createDocumentFragment();
       let tempLength = fragment.childNodes.length * 2;

       for (let i = 1; i <= amount; i++) {
          let card = document.createElement('li');
          card.classList.add('card');
          card.innerHTML = `<div class="card-content" data-flippable="true"><div class="card-front card-face">Front</div><div class="card-back card-face"><i class="fas"></i></div></div>`;
          fragment.appendChild(card);
       }

       for (let i = 0; i < fragment.childNodes.length; i++) {
         fragment.childNodes[i].querySelector('.fas').classList.add(this.icons[i]);
       }

       document.querySelector('.card-list').appendChild(fragment);
       this.loadCardsArray();
     }

     this.loadCardsArray = () => {
        for (cardElement of cardList.querySelectorAll('.card')) {
           operator.cardsArray.push(new Card(cardElement));
        }

        console.log(operator.cardsArray);
        this.addDataAttribute();
     }

     this.addDataAttribute = () => {
       operator.cardsArray.forEach((card, index, thisArray) => {
         card.element.dataset.number = thisArray.indexOf(card);
       });
     }

     this.flipToBack = card => {
       let flippedCard = card.target;
       // console.log('Flipped card:',flippedCard);
       if (flippedCard.classList.contains('flipped')) {
         card.flipped = true;
         // console.log(card);
       }
     }

     this.startTimer = () => {
       let count = 0;
       setInterval(() => {
         document.querySelector('.count').textContent = count.toFixed(2);
         count++;
       }, 1000);
     }

     this.countMoves = () => {
       domMoves.insertAdjacentText('beforeend', domMoves);
       this.movesCount++;
     }
   };

   game.init();

   // ============== GAME STATE OPERATOR =================
   // ====================================================
   function Operator() {
     this.cardsArray = [];
     this.flippedCards = 0;
     this.currentlyFlipped = [];

     this.gameOperator = mutation => {
       // If mutated card element doesn't have the class 'matched'
       if (!mutation.classList.contains('matched')) {
           this.pushTocurrentlyFlipped(mutation);
        }

       // If there are 2 cards currently selected
       if (this.currentlyFlipped.length === 2) {
         console.log(`currentlyFlipped`, this.currentlyFlipped);
         // If the 2 cards currently selected match each other
         if (this.checkForMatch()) {
           console.log(`They Match!!!`);
           cardState.stayFlipped(this.currentlyFlipped);
         } else {
           // If the 2 cards currently selected DON'T match
            console.log(`They DON'T Match`);
            setTimeout(() => {
               console.log('Flipping to backside');
               cardState.flipToBack();
               operator.clearCurrentlyFlipped();
            }, 2000);
         }
       }
     }

      this.pushTocurrentlyFlipped = mutation => {
        this.currentlyFlipped.push(mutation);
      };

      // Checks if the 2 cards in 'currentlyFlipped' match
     this.checkForMatch = () => {
        console.log(this.currentlyFlipped[0].isEqualNode(this.currentlyFlipped[1]));
       return this.currentlyFlipped[0].isEqualNode(this.currentlyFlipped[1]);
     }

     this.clearCurrentlyFlipped = () => {
       this.currentlyFlipped = [];
     }
   }

// ========= CARD STATE ====================================
// =========================================================
   function CardState() {

     this.updateCardState = (paramCard) => {
       let domCard = paramCard.parentElement;
       let cardContent = domCard.childNodes[0];
       let domCardNumber = parseInt(domCard.dataset.number);
       let objectCard = operator.cardsArray[domCardNumber];

       // If element has class 'flipped', change corresponding object's
       // flipped property to true & 'flippable' property to false
       if (cardContent.classList.contains('flipped')) {
          objectCard.flipped = !objectCard.flipped;
          objectCard.flippable = !objectCard.flippable;
       } else {
           objectCard.flipped = !objectCard.flipped;
           objectCard.flippable = !objectCard.flippable;
       }

       operator.cardsArray.map((item, index) => {
         if (domCardNumber === index) {
           operator.cardsArray
         }
       });
     }

     this.linkToCardObject = element => {
       console.log(operator.cardsArray[operator.cardsArray.indexOf(element)]);
     }

     this.flipCard = clickedCard => {
        clickedCard.parentElement.classList.toggle('flipped');
     }

     this.flipToBack = () => {
        // Disonnects observer because we don't want it to run when the class 'flipped' is removed. Otherwise, it'll run again automatically, and infinitely
        myObserver.disconnect();
        operator.currentlyFlipped.forEach(card => {
           card.classList.toggle('flipped');
        });
     }

     this.stayFlipped = matchedPair => {
        matchedPair.forEach(card => {
           card.classList.add('matched');
        });
        operator.clearCurrentlyFlipped();
     }
   }

// ============== CARD ====================================
// ========================================================
   function Card(element) {
     this.element = element;
     this.cardClasses = element.querySelector('.card-content').classList;
     this.flippable = true;
     this.flipped = false;
     this.matched = false;
   }

// ============== OBSERVER ==================================
// ==========================================================
  function MyObserverConstructor() {
    this.config = {
      attributes: true,
      childList: false,
      subtree: true,
      attributeFilter: ['class']
    };

    this.callback = (mutationsList, observer) => {
      mutationsList.forEach(mutation => {
        if (!mutation.target.classList.contains('matched')) {
          cardState.updateCardState(mutation.target);
          operator.gameOperator(mutation.target);
        }
      });
    }
  }

// ============== EVENT LISTENERS =============================
// ============================================================
   cardContainer.addEventListener('click', e => {
     game.startTimer();
     game.countMoves();
      myObserver.observe(cardContainer, observerConstructor.config);
      console.log(`Observing...`);
     if (operator.currentlyFlipped.length < 2) {
       if (e.target.classList.contains('card-face')) {
         let clickedCard = e.target;
         // if (!clickedCard.parentElement.classList.contains('flipped')) {
           // clickedCard.parentElement.classList.toggle('flipped');
         // }
         if (clickedCard.parentElement.dataset.flippable !== true) {
            cardState.flipCard(clickedCard);
         }
       }
     }
   });
