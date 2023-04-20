const cardsStock = [
   {
      id: "Travel201",
      isFlipped: false,
   },
   {
      id: "Travel202",
      isFlipped: false,
   },
   {
      id: "Travel203",
      isFlipped: false,
   },
   {
      id: "Travel204",
      isFlipped: false,
   },
   {
      id: "Travel205",
      isFlipped: false,
   },
   {
      id: "Travel206",
      isFlipped: false,
   },
   {
      id: "Travel207",
      isFlipped: false,
   },
   {
      id: "Travel208",
      isFlipped: false,
   },
   {
      id: "Travel209",
      isFlipped: false,
   },
   {
      id: "Travel210",
      isFlipped: false,
   },
   {
      id: "Travel301",
      isFlipped: false,
   },
   {
      id: "Travel302",
      isFlipped: false,
   },
   {
      id: "Travel303",
      isFlipped: false,
   },
   {
      id: "Travel304",
      isFlipped: false,
   },
   {
      id: "Travel305",
      isFlipped: false,
   },
   {
      id: "Travel306",
      isFlipped: false,
   },
   {
      id: "Travel307",
      isFlipped: false,
   },
   {
      id: "Travel308",
      isFlipped: false,
   },
   {
      id: "Travel309",
      isFlipped: false,
   },
   {
      id: "Travel310",
      isFlipped: false,
   },
];

const activeCards = [];

const matchedCards = [];

const difficultyLevels = {
   easy: 16,
   medium: 24,
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

function handleDifficultyLevel(key) {
   $difficultyLevels.classList.add("d-none");
   chooseDifficulty(key);

   renderGame(difficultyLevels[key]);
}

function renderCardToHtml(index) {
   return `
         <img
         src="./Cards/Card_Back.jpg"
         alt="Back of cards"
         class="game-cards rounded-3 shadow-sm"
         />
         <img
          src="./Cards/${activeCards[index].id}.jpg"
          class="rounded-3 shadow-sm"           
            />
           
        `;
}

function handleCardsSize(num) {
   if (num === 16) {
      return "col-sm-3";
   }
   return "col-sm-2";
}

function renderGame(numOfCards) {
   let html = "";
   let cardsCounter = 0;

   for (let k = 0; k < numOfCards; k++) {
      html += `
         <div class="col ${handleCardsSize(numOfCards)} center-all">
         <div onclick="handleRenderFlipCard(${
            (activeCards, cardsCounter)
         })" class="game-card">
         ${renderCardToHtml(cardsCounter)}
      </div>
      </div>
      `;
      cardsCounter++;
   }

   $playArea.innerHTML = html;
   $cards = document.querySelectorAll(".game-cards");
}

function renderFlipCard(index) {
   handleFlipCard(index);
   $cards[index].classList.toggle("d-none");
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
            }, 1000);
         }
      }
   }
}
