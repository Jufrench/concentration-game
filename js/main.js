   const cardContainer = document.querySelector('.card-container');
   const cardLis = document.querySelectorAll('.card');
   const cardList = document.querySelector('.card-list');
   const observerConstructor = new MyObserverConstructor();
   const myObserver = new MutationObserver(observerConstructor.callback);
   const cardState = new CardState();
   const cardObject = new Card();
   const operator = new Operator();
   const game = new Concentration();

   function Concentration() {
     this.icons = ['fa-crow', 'fa-crow', 'fa-horse', 'fa-horse', 'fa-cat',
     'fa-cat',  'fa-otter', 'fa-otter', 'fa-hippo', 'fa-hippo', 'fa-fish',
     'fa-fish', 'fa-frog', 'fa-frog', 'fa-dragon', 'fa-dragon'];

     this.init = () => {
       this.createCardHTML(2);
       cardObject.addDataAttribute();
       cardObject.addIcons();
       this.shuffleCards(operator.cardsArray);
       this.addCardsToDom();
     }

     this.createCardHTML = amount => {
      amount = amount * 2;

      for (let i = 1; i <= amount; i++) {
          let cardLi = document.createElement('li');
          cardLi.classList.add('card');
          cardLi.innerHTML = `<div class="card-content" data-flippable="true"><div class="card-front card-face">Front</div><div class="card-back card-face"><i class="fas"></i></div></div>`;
          operator.pushToCardsArray(cardLi);
      }
     }

      this.shuffleCards = (theArray) => {
         var currentIndex = theArray.length, temporaryValue, randomIndex;

         while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = theArray[currentIndex];
            theArray[currentIndex] = theArray[randomIndex];
            theArray[randomIndex] = temporaryValue;
         }

         return theArray;
      }

      this.addCardsToDom = () => {
         const fragment = document.createDocumentFragment();
         for (card of operator.cardsArray) {
            fragment.appendChild(card.element);
         }
         cardList.appendChild(fragment);
      }

   };

   game.init();

   // ============== GAME STATE OPERATOR =================
   // ====================================================
   function Operator() {
     this.cardsArray = [];
     this.flippedCards = 0;
     this.currentlyFlipped = [];
     this.matches = 0;
     this.rating = 3;
     this.ready = true;
     this.timerStarted = false;
     this.domMoves = document.querySelector('.moves');
     this.movesCap = () => {
       return document.querySelector('.card-list').children.length * 2;
     }

     // GENERAL OPERATOR
     // ================
     this.gameOperator = mutation => {
       // If mutated card element doesn't have the class 'matched'
       if (!mutation.classList.contains('matched')) {
           this.pushTocurrentlyFlipped(mutation);
        }

       // If there are 2 cards currently selected
       if (this.currentlyFlipped.length === 2) {

         // If the 2 cards currently selected match each other
         if (this.checkForMatch()) {
           cardState.animateMatch(this.currentlyFlipped, 'heartBeat');
           cardState.stayFlipped(this.currentlyFlipped);
           this.increaseMatchCount();
           this.checkForWin();
         } else {
           // If the 2 cards currently selected DON'T match
           cardState.animateMatch(this.currentlyFlipped, 'shake');
           this.checkForWin();
           this.changeRating();
            setTimeout(() => {
               cardState.flipToBack();
               operator.clearCurrentlyFlipped();
            }, 2000);
         }
       }
      }

      this.pushToCardsArray = cardLi => {
         this.cardsArray.push(new Card(cardLi));
      }

      this.pushTocurrentlyFlipped = mutation => {
         this.currentlyFlipped.push(mutation);
      };

      // Checks if the 2 cards in 'currentlyFlipped' match
      this.checkForMatch = () => {
         return this.currentlyFlipped[0].isEqualNode(this.currentlyFlipped[1]);
      }

      this.clearCurrentlyFlipped = () => {
         this.currentlyFlipped = [];
      }

      this.increaseMatchCount = () => {
         this.matches++;
      }

      this.checkForWin = () => {
        let movesCap = this.movesCap();
        let moves = parseInt(this.domMoves.textContent);

        if (moves <= movesCap && this.matches === this.cardsArray.length / 2) {
          console.log('You Win!');
          this.startStopTimer('stop');
          document.querySelector('.modal-title').textContent = 'YOU WIN!';
          this.showModal();
        } else if (moves === movesCap && this.matches < this.cardsArray.length / 2) {
            console.log('You Lose!');
            this.startStopTimer('stop');
            document.querySelector('.modal-title').textContent = 'YOU LOSE, TRY AGAIN!';
            this.showModal();
        } else {
            console.log('Keep Going!');
            return;
        }
      }

      // CHANGE RATING
      this.changeRating = () => {
        let movesAmount = parseInt(this.domMoves.textContent);
        let domStars = document.querySelectorAll('.stars .fa-star');
        let movesCap = this.movesCap();
        if (movesCap / 2 === movesAmount || movesAmount === movesCap) {
          this.rating--;
        }

        if (this.rating >= 0) {
            domStars[this.rating - 1].classList.remove('fa');
        }
      }

      // TIMER
      this.startStopTimer = whatParam => {
        let count = 0;
        const timerFunction = () => {
          document.querySelector('.count').textContent = count.toFixed(2);
          count++;
        }
        let timer;

        if (whatParam === 'start') {
          timer = setInterval(timerFunction, 1000);
        } else {
          // Each declared timer returns a number ID. In this case its the integer 2.
          // Passing the ID to clearInterval stops the timer.
          clearInterval(2);
        }

      }

      this.countMoves = () => {
        this.domMoves.textContent++;
      }

      this.showModal = () => {
        let domTime = document.querySelector('.time');
        let rating = document.querySelector('.rating');
        domTime.textContent = document.querySelector('.count').textContent;
        rating.innerHTML = document.querySelector('.stars').outerHTML;
        setTimeout(() => {
          document.querySelector('.show-modal').click();
          this.playAgain();
        }, 2220);
      }

      this.playAgain = () => {
        let playDiv = document.querySelector('.play-div');
        let theModal = document.querySelector('#the-modal');
        playDiv.addEventListener('click', e => {
          if (e.target.classList.contains('btn-yes')) {
            let button = e.target;
            this.clearAll();
            console.log('you hit yes');
          } else if (e.target.classList.contains('btn-no')) {
            console.log('you hit no');
          } else {
            return;
          }
        });
      }

      this.clearAll = () => {
        console.log('inside clear all');
        document.querySelector('.card-list').innerHTML = '';
        this.matches = 0;
        this.cardsArray = [];
        game.init();
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
        // Disonnects observer because we don't want it to run when the class
        // 'flipped' is removed. Otherwise, it'll run again automatically, and infinitely
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

     this.animateMatch = (theArray, animation) => {
       myObserver.disconnect();
       if (animation === 'heartBeat') {
         setTimeout(() => {
           theArray.forEach(card => {
             card.parentElement.classList.add('animated', animation);
           });
         }, 700);

         setTimeout(() => {
           theArray.forEach(card => {
             card.parentElement.classList.remove('animated', animation);
           });
         }, 3000);
       }

       if (animation === 'shake') {
         setTimeout(() => {
           theArray.forEach(card => {
             card.parentElement.classList.add('animated', animation);
           });
         }, 1000);

         setTimeout(() => {
           theArray.forEach(card => {
             card.parentElement.classList.remove('animated', animation);
           });
         }, 3000);
       }
     }
   }

// ============== CARD ====================================
// ========================================================
  function Card(element) {
     this.element = element;
     this.flippable = true;
     this.flipped = false;
     this.matched = false;

     this.addDataAttribute = () => {
      operator.cardsArray.map((card, index) => card.element.dataset.number = index);
     }

     // Adds the fontawesome icon to the html element & to its corresponding card object
     this.addIcons = () => {
         operator.cardsArray.map((card, index) => {
            card.icon = game.icons[index];
            card.element.querySelector('.fas').classList.add(card.icon);
         });
     }
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
      console.log(`Observing...`);
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
      if (!e.target.classList.contains('flipped') && e.target.classList.contains('card-face')) {
         if (!operator.timerStarted) {
           operator.startStopTimer('start');
           operator.timerStarted = !game.timerStarted;
         }
         operator.countMoves();
      }

      myObserver.observe(cardContainer, observerConstructor.config);

      if (operator.currentlyFlipped.length < 2) {
        if (e.target.classList.contains('card-face')) {
          let clickedCard = e.target;

          if (clickedCard.parentElement.dataset.flippable !== true) {
            cardState.flipCard(clickedCard);
          }
        }
      }
   });

document.querySelector('.theButton').addEventListener('click', () => {
  document.querySelector('.show-modal').click();
});
