const boxCards = document.querySelector(".cardsList");
const urlAPI = "https://hp-api.onrender.com/api/characters";
const filterTags = document.querySelectorAll(".filterTag");
const tagList = document.querySelector(".tagsList");
const allTags = document.querySelectorAll(".tag");
const tagCombinaisons = [
  ["ID"],
  ["House"],
  ["Name"],
  ["Actor Name"],
  ["ID", "House"],
  ["House", "ID"],
  ["Name", "House"],
  ["House", "Name"],
  ["Actor Name", "House"],
  ["House", "Actor Name"],
];
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
    if (perso.house) {
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
            <i class="fa-solid fa-house ${perso.house.toLowerCase()}"></i>
        </figure>`;

      card.innerHTML = template;
      card.addEventListener("click", () => {
        window.location.href = "cartes/carte.html?id=" + perso.id;
      });
      boxCards.appendChild(card);
    }
  });
}

filterTags.forEach((filter) => {
  filter.addEventListener("click", addTag);
});

function addTag(e) {
  if (e.target.getAttribute("data-active") === "false") {
    if (verifyTagCompatibility(e.target)) {
      const tagtargeted = document.querySelector(
        `.tag[data-name="${e.target.getAttribute("data-name")}"]`
      );
      tagtargeted.classList.add("visible");
      e.target.setAttribute("data-active", "true");
    }
  }
}

function verifyTagCompatibility(filter) {
  let listTags = [];
  document
    .querySelectorAll("[data-active='true']")
    .forEach((tag) => listTags.push(tag.getAttribute("data-name")));

  listTags.push(filter.getAttribute("data-name"));

  // Vérifier si la combinaison est possible en comparant avec tagsCombinaisons
  if (
    tagCombinaisons.findIndex(
      (element) => JSON.stringify(element) === JSON.stringify(listTags)
    ) !== -1
  )
    return true;
}

allTags.forEach((tag) => {
  tag.childNodes[1].addEventListener("click", () => {
    const filterTargeted = document.querySelector(
      `.filterTag[data-name="${tag.getAttribute("data-name")}"`
    );
    filterTargeted.setAttribute("data-active", "false");
    tag.classList.remove("visible");
  });
});

function initializeTag() {
  filterTags.forEach((filter) => {
    if (filter.getAttribute("data-active") === "true") {
      const tagTargeted = document.querySelector(
        `.tag[data-name="${filter.getAttribute("data-name")}"]`
      );
      tagTargeted.classList.add("visible");
    }
  });
}

async function start() {
  await getPersonnage();
  initializeTag();
  console.log(
    dataArray.filter((data) => data.house.toLowerCase() === "gryffindor")
  );
}

start();
