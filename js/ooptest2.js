// TODO: Find out a way to look over the icon array twice

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

     this.init = () => {
       this.createCardHTML(2);
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
       operator.cardsArray.forEach(function(card, index, thisArray) {
         card.element.dataset.number = thisArray.indexOf(card);
       });
     }

     this.stayFlipped = arrayParam => {
       for (let card of arrayParam) {
         // card.classList.add('matched');
         card.dataset.flippable = !card.dataset.flippable;
         // console.log(card.dataset.flippable);
       }
     }

     this.flipToFront = card => {
       for (let card of arrayParam) {
         card.classList.toggle('flipped');
       }
     }

     this.flipToBack = card => {
       let flippedCard = card.target;
       // console.log('Flipped card:',flippedCard);
       if (flippedCard.classList.contains('flipped')) {
         card.flipped = true;
         // console.log(card);
       }
     }
   };

   game.init();
   myObserver.observe(cardContainer, observerConstructor.config);

   // ============== GAME STATE OPERATOR =======================
   // ==========================================================
   function Operator() {
     this.cardsArray = [];
     this.flippedCards = 0;
     this.currentlyFlipped = [];
     // this.matched = false;

     this.stateOperator = mutation => {
        if (mutation.target.classList.contains('matched')) {
           console.log(`has the class matched`);
           return;
        } else {
           this.pushTocurrentlyFlipped(mutation);
        }

      //  (function pushTocurrentlyFlipped(mutation, flipped) {
      //    flipped.push(mutation.target);
      //    console.log(`Currently Flipped:`, flipped);
      //    // this.stateOperator();
      // })(mutation, this.currentlyFlipped);

       // If there are 2 cards currently selected
       if (this.currentlyFlipped.length === 2) {
         let matched = this.checkForMatch();

         // If the 2 cards currently selected match
         if (matched) {
           this.stayFlipped(matched);
         }
         // If the 2 cards currently selected DON'T match
         else {
           console.log(`They DON'T Match`);
         }
       }
     }

     this.pushTocurrentlyFlipped = mutation => {
       this.currentlyFlipped.push(mutation.target);
       // console.log(`Currently Flipped:`, this.currentlyFlipped);
    };

     this.checkForMatch = () => {
       return this.currentlyFlipped[0].isEqualNode(this.currentlyFlipped[1]);
     }

     this.stayFlipped = matchedPair => {
        console.log(this.currentlyFlipped);
        matchedPair.forEach(card => {
           card.classList.add('matched');
        });
        // console.log(`I stay flipped`);
     }
   }

   // ============== CARD STATE & CARD =========================
   // ==========================================================
   function CardState() {

     this.updateCardState = (paramCard) => {
       let domCard = paramCard.target.parentElement;
       let domCardNumber = parseInt(domCard.dataset.number);
       let objectCard = operator.cardsArray[domCard.dataset.number];
       // console.log(`paramMatched:`, paramMatched);

       // If element has class 'flipped', change its corresponding object's
       // flipped property to true & its flippable property to false
       if (paramCard.target.classList.contains('flipped')) {
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
   }

   function Card(element) {
     this.element = element;
     this.cardClasses = element.querySelector('.card-content').classList;
     this.flippable = true;
     this.flipped = false;
     this.matched = false;
   }

// ============== OBSERVER =========================
// =================================================
  function MyObserverConstructor() {
    this.config = {
      attributes: true,
      childList: false,
      subtree: true,
      attributeFilter: ['class']
    };

    this.callback = (mutationsList, observer) => {
      // game.checkForMatch(mutationsList);
      // game.flipToBack(mutationsList[0]);
      cardState.updateCardState(mutationsList[0]);
      operator.stateOperator(mutationsList[0]);
    }
  }

// ============== EVENT LISTENERS =========================
// =======================================================
   cardContainer.addEventListener('click', e => {
     if (operator.currentlyFlipped.length < 2) {
       if (e.target.classList.contains('card-face')) {
         let clickedCard = e.target;
         // if (!clickedCard.parentElement.classList.contains('flipped')) {
           // clickedCard.parentElement.classList.toggle('flipped');
         // }
         if (clickedCard.parentElement.dataset.flippable !== true) {
            clickedCard.parentElement.classList.toggle('flipped');
         }
       }
     }

   });
