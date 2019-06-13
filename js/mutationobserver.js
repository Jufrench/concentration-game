// let callback = (mutationsList, observer) => {
//     for (let i = 1; i < mutationsList.childNodes.length; i++) {
//         if (i.type === 'childNodes') {
//             console.log('An LI element was added');
//         } else if (i.type === 'classList') {
//             console.log('An was added to an LI');
//         }
//     }
// };
// =============================================
// let callback = (mutationsList, observer) => {
//     for (let i = 1; i < mutationsList.length; i++) {
//       console.log(i.type);
//     }
// };
// =============================================
// let callback = (mutationsList, observer) => {
//     for (let i = 1; i < mutationsList.length; i++) {
//         if (i.type === 'childNodes') {
//             console.log('An LI element was added');
//         } else if (i.type === 'classList') {
//             console.log('An was added to an LI');
//         }
//     }
// };
//
// const cardList = document.querySelector('.card-list');
// let config = {attributes: true, childList: true, subtree: true, classList: true};
// let observer = new MutationObserver(callback);
// observer.observe(cardList, config);
// =============================================
// let callback = (mutationsList, observer) => {
//     for (let i = 1; i < mutationsList.length; i++) {
//       console.log(i.type);
//     }
// };
//
// const cardList = document.querySelector('.card-list');
// let config = {attributes: true, childList: true, subtree: true, classList: true};
// let observer = new MutationObserver(callback);
// observer.observe(cardList, config);
// game.createCardHTML(3);
// =============================================
// let callback = (mutationsList, observer) => {
//     for (mutation of mutationsList) {
//         console.log(mutationsList[0].target);
//     }
// };
//
// const cardList = document.querySelector('.card-list');
// let config = {attributes: true, childList: true, subtree: true, classList: true};
// let observer = new MutationObserver(callback);
// observer.observe(cardList, config);
// game.createCardHTML(3);
// ==================== THIS WORKS =========================
// let callback = (mutationsList, observer) => {
//   console.log(mutationsList[0].target.parentElement.dataset.number);
// };
//
// const cardList = document.querySelector('.card-list');
// let config = {attributes: true, childList: true, subtree: true};
// let observer = new MutationObserver(callback);
// observer.observe(cardList, config);
// =============================================
let callback = (mutationsList, observer) => {
  console.log(mutationsList[0].target.parentElement.dataset.number);
  let tempArray = [];
  tempArray.push(mutationsList[0].target.parentElement);
};

const cardList = document.querySelector('.card-list');
let config = {attributes: true, childList: true, subtree: true};
let observer = new MutationObserver(callback);
observer.observe(cardList, config);

// const cardContainer = document.querySelector('.card-container');
// cardContainer.addEventListener('click', e => {
//   if (e.target.classList.contains('card-face')) {
//     e.target.parentElement.classList.toggle('flipped');
//   }
// });
