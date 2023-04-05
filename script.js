const cardsStock = [
   {
      id: "travelv201",
      isFlipped: false,
   },
   {
      id: "travelv202",
      isFlipped: false,
   },
   {
      id: "travelv203",
      isFlipped: false,
   },
   {
      id: "travelv204",
      isFlipped: false,
   },
   {
      id: "travelv205",
      isFlipped: false,
   },
   {
      id: "travelv206",
      isFlipped: false,
   },
   {
      id: "travelv207",
      isFlipped: false,
   },
   {
      id: "travelv208",
      isFlipped: false,
   },
   {
      id: "travelv209",
      isFlipped: false,
   },
   {
      id: "travelv210",
      isFlipped: false,
   },
   {
      id: "travelv301",
      isFlipped: false,
   },
   {
      id: "travelv302",
      isFlipped: false,
   },
   {
      id: "travelv303",
      isFlipped: false,
   },
   {
      id: "travelv304",
      isFlipped: false,
   },
   {
      id: "travelv305",
      isFlipped: false,
   },
   {
      id: "travelv306",
      isFlipped: false,
   },
   {
      id: "travelv307",
      isFlipped: false,
   },
   {
      id: "travelv308",
      isFlipped: false,
   },
   {
      id: "travelv309",
      isFlipped: false,
   },
   {
      id: "travelv310",
      isFlipped: false,
   },
];

const activeCards = [];

const matchedCards = [];

const difficultyLevels = {
   easy: 16,
   medium: 25,
   hard: 36,
};

let turnCounter = 0;

let cardsFlippedIndexes = [];

function chooseDifficulty(key) {
   if (!difficultyLevels[key]) {
      return null;
   }

   generateCards(difficultyLevels[key]);
   return activeCards;
}

function generateCards(numOfCards) {
   for (let i = 0; i < numOfCards / 2; i++) {
      activeCards.push({ ...cardsStock[i] });
      activeCards.push({ ...cardsStock[i] });
   }
   shuffleCards(activeCards);
   return activeCards;
}

function shuffleCards(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
}

function flipCard(index) {
   turnCounter++;
   activeCards[index].isFlipped = !activeCards[index].isFlipped;

   return activeCards[index].isFlipped;
}

function cardMatchCheck() {
   let flippedCards = activeCards.filter((e) => e.isFlipped);
   if (flippedCards.every((e) => e.id === flippedCards[0].id)) {
      lockMatchedCards(activeCards);
      return true;
   }
}

function resetFlippedCards() {
   activeCards.forEach((e) => {
      if (e.isFlipped) {
         e.isFlipped = !e.isFlipped;
      }
   });
}

function lockMatchedCards(array) {
   array.forEach((e, i) => {
      if (e.isFlipped) {
         matchedCards.push(e);
         //  array.splice(i, 1);
      }
      if (activeCards.length === 0) {
         declareWin();
         return;
      }
   });
   return matchedCards;
}

function declareWin() {
   alert(`Well done!`);
   location.reload();
}

//RENDER

const $playArea = document.getElementById("game-area");
let $cards = "";

function renderDifficultyLevel() {}

function renderCardToHtml(index) {
   return `
    <div class="col">
    <div onclick="renderFlipCard(${index})" class="game-card">
       <img
          src="./Cards/Card_Back.jpg"
          alt="Back of cards"
          class="rounded-3"
       />
    </div>
 </div>
    `;
}

function renderCardsToHtml(numOfRows) {
   //    debugger;
   let html = "";
   let cardsCounter = 0;
   for (let i = 0; i < numOfRows; i++) {
      html += `
      <div class="row mb-3">
      `;
      for (let k = 0; k < numOfRows; k++) {
         html += renderCardToHtml(cardsCounter);
         cardsCounter++;
      }
      html += `
      </div>
      `;
   }
   $playArea.innerHTML = html;
   $cards = document.querySelectorAll(".game-card");
   return $cards;
}

function renderFlipCard(index) {
   flipCard(index);
   cardsFlippedIndexes.push(index);

   $cards[index].innerHTML = `
   <img src="./Cards/Card_BG.jpg" alt="" />
                  <img
                     src="./Cards/${activeCards[index].id}.png"
                     alt=""
                     class="card-picture"
                  />
                  `;
   if (turnCounter === 2) {
      let result = cardMatchCheck();

      if (!result) {
         setTimeout(() => renderResetFlippedCards(), 2000);
      }
      cardsFlippedIndexes = [];
      turnCounter = 0;
   }
}

function renderResetFlippedCards() {
   resetFlippedCards();
   for (let cardIndex of cardsFlippedIndexes) {
      $cards[cardIndex].innerHTML = `
    <img
    src="./Cards/Card_Back.jpg"
    alt="Back of cards"
    class="rounded-3"
 />
    `;
   }
   cardsFlippedIndexes = [];
}

chooseDifficulty("easy");
renderCardsToHtml(4);
