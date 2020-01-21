const cards = document.querySelectorAll(".memory-card");
const flipCards = document.querySelectorAll(".flip-card");
const match = document.querySelector(".match");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    flipCards[0].querySelector(".front-face").src = this.querySelector(
      ".front-face"
    ).src;
    flipCards[0].classList.add("flip");
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  flipCards[1].querySelector(".front-face").src = this.querySelector(
    ".front-face"
  ).src;
  flipCards[1].classList.add("flip");
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  match.style.visibility = "visible";
  setTimeout(() => {
    flipCards[0].classList.remove("flip");
    flipCards[1].classList.remove("flip");
    resetBoard();
  }, 1000);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    flipCards[0].classList.remove("flip");
    secondCard.classList.remove("flip");
    flipCards[1].classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  match.style.visibility = "hidden";
}

(function shuffle() {
  let pos = 0;
  let arrPos = [];
  cards.forEach(card => {
    let randomPos;
    do {
      randomPos = Math.floor(Math.random() * 64) + 1;
    } while (arrPos.indexOf(randomPos) !== -1);
    arrPos.push(randomPos);
    card.style.order = randomPos;
    card.querySelector(".order").innerHTML = randomPos;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));

// document.addEventListener("DOMContentLoaded", function(event) {
//   game.style.width = game.style.height + "px";
// });
