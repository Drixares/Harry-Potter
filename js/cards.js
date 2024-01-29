const boxCards = document.querySelector(".cardsList");
const urlAPI = "https://hp-api.onrender.com/api/characters";
let dataArray = [];

async function getPersonnage() {
  const data = await fetch(urlAPI);
  const personnages = await data.json();

  selectPerso(personnages);
}

function selectPerso(personnages) {
  for (let i = 0; i < 20; i++) {
    dataArray.push(personnages[i]);
  }

  createCards();
}

function createCards() {
  dataArray.forEach((perso) => {
    const card = document.createElement("figure");
    card.className = "card";

    const image = perso.image ? perso.image : `ressources/${perso.name}.webp`;

    const template = `
      <figure class="card">
          <a href="#"><img src="${image}" alt="Personnage image."></a>
          <figcaption>
              <h3 class="card-name">${perso.name}</h3>
              <p class="card-actor">${perso.actor}</p>
          </figcaption>
          <div class="cards-absolute-elements">
              <img src="ressources/images/${perso.house}.png">
          </div>
      </figure>`;

    card.innerHTML = template;

    boxCards.appendChild(card);
  });
}

getPersonnage();
