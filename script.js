const cardNameInput = document.querySelector("#card-name");
const classNameInput = document.querySelector("#class-name");
const result = document.querySelector("#result");

let card = [];

async function findCard(event) {

  const cardName = cardNameInput.value;
  const httpResponse = await fetch(
    `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${cardName}`,
    {
      headers: {
        "X-RapidAPI-Key": "108acdcfa5msh306099c1fa940ebp12723djsn8da4690824e7",
        "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com"
      }
    }
  );

  if (httpResponse.status === 404) {
    alert("No card found");
    return;
  }

  const body = await httpResponse.json();
  card = body;

  renderCardInfo();
}


function renderCardInfo() {
  for (let i = 0; i < card.length; i++) {
    const cardData = card[i];

    if (!cardData.name || !cardData.img || !cardData.rarity) {
      continue;
    }

    const name = cardData.name;
    const cardImgLink = cardData.img;
    const rare = cardData.rarity;

    const cardResult = document.querySelector("#result");

    const nameHeading = document.createElement("h3");
    nameHeading.innerText = name;

    const statsHeading = document.createElement("h4");
    statsHeading.innerText = "Rarity: " + rare;

    const cardImg = document.createElement("img");
    cardImg.src = cardImgLink;

    result.innerHTML = "";

    cardResult.appendChild(nameHeading);
    cardResult.appendChild(statsHeading);
    cardResult.appendChild(cardImg);
  }
}

  

