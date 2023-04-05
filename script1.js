const cardsStock = [
   {
      id: "Travelv201",
      isFlipped: false,
   },
   {
      id: "Travelv202",
      isFlipped: false,
   },
   {
      id: "Travelv203",
      isFlipped: false,
   },
   {
      id: "Travelv204",
      isFlipped: false,
   },
   {
      id: "Travelv205",
      isFlipped: false,
   },
   {
      id: "Travelv206",
      isFlipped: false,
   },
   {
      id: "Travelv207",
      isFlipped: false,
   },
   {
      id: "Travelv208",
      isFlipped: false,
   },
   {
      id: "Travelv209",
      isFlipped: false,
   },
   {
      id: "Travelv210",
      isFlipped: false,
   },
   {
      id: "Travelv301",
      isFlipped: false,
   },
   {
      id: "Travelv302",
      isFlipped: false,
   },
   {
      id: "Travelv303",
      isFlipped: false,
   },
   {
      id: "Travelv304",
      isFlipped: false,
   },
   {
      id: "Travelv305",
      isFlipped: false,
   },
   {
      id: "Travelv306",
      isFlipped: false,
   },
   {
      id: "Travelv307",
      isFlipped: false,
   },
   {
      id: "Travelv308",
      isFlipped: false,
   },
   {
      id: "Travelv309",
      isFlipped: false,
   },
   {
      id: "Travelv310",
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

let currentFlippedCards = [];
let currentFlippedCardsIndex = [];

//DATA

function chooseDifficulty(key) {
   if (!difficultyLevels[key]) {
      return null;
   }

   generateCards(difficultyLevels[key]);
   return activeCards;
}

function generateCards(numOfCards) {
   shuffleCards(cardsStock);

   for (let i = 0; i < numOfCards / 2; i++) {
      activeCards.push({ ...cardsStock[i] });
      activeCards.push({ ...cardsStock[i] });
   }
   shuffleCards(activeCards);
}

function shuffleCards(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
}

function flipCard(arr, index) {
   arr[index].isFlipped = !arr[index].isFlipped;
}

function handleFlipCard(index) {
   flipCard(activeCards, index);
   currentFlippedCards.push(activeCards[index]);
   currentFlippedCardsIndex.push(index);
}

function checkCardsMatch() {
   if (currentFlippedCards[0].id === currentFlippedCards[1].id) {
      matchedCards.push(currentFlippedCards);
      resetCurrentFlipped();
      return true;
   }

   return false;
}

function resetCurrentFlipped() {
   currentFlippedCards = [];
   currentFlippedCardsIndex = [];
}

function declareWin() {
   alert(`Well done!`);
   location.reload();
}

//RENDER

const $playArea = document.getElementById("game-area");
const $difficultyLevels = document.querySelector(".difficulty-level");
let $cards = "";

function handleDifficultyLevel(key, num) {
   $difficultyLevels.classList.add("d-none");
   chooseDifficulty(key);

   renderGame(num);
}

function renderCardToHtml(index) {
   if (activeCards[index].isFlipped) {
      return `
        <img src="./Cards/Card_BG.jpg" class="rounded-3 shadow-sm" />
                  <img
                     src="./Cards/${activeCards[index].id}.png"
                     alt=""
                     class="card-picture"
                  />
        `;
   }
   return `
       <img
          src="./Cards/Card_Back.jpg"
          alt="Back of cards"
          class="rounded-3  shadow-sm"
       />
    </div>
 </div>
    `;
}

function renderGame(numOfRows) {
   //    debugger;
   let html = "";
   let cardsCounter = 0;
   for (let i = 0; i < numOfRows; i++) {
      html += `
      <div class="row">
      `;
      for (let k = 0; k < numOfRows; k++) {
         html += `
         <div class="col">
         <div onclick="handleRenderFlipCard(${
            (activeCards, cardsCounter)
         })" class="game-card">
         ${renderCardToHtml(cardsCounter)}`;
         cardsCounter++;
      }
      html += `
      </div>
      </div>
      </div>
      `;
   }
   $playArea.innerHTML = html;
   $cards = document.querySelectorAll(".game-card");
}

function renderFlipCard(index) {
   handleFlipCard(index);
   $cards[index].innerHTML = renderCardToHtml(index);
}

function handleRenderFlipCard(index) {
   if (currentFlippedCards.length === 0 || currentFlippedCards.length < 2) {
      if (!activeCards[index].isFlipped) {
         renderFlipCard(index);

         if (currentFlippedCards.length === 2) {
            //   debugger;

            if (checkCardsMatch()) {
               if (matchedCards.length === activeCards.length / 2) {
                  return setTimeout(() => declareWin(), 200);
               }
               return;
            }
            setTimeout(() => {
               renderFlipCard(currentFlippedCardsIndex[0]);
               renderFlipCard(currentFlippedCardsIndex[1]);

               resetCurrentFlipped();
               return matchedCards;
            }, 1500);
         }
      }
   }
}
