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

initializeTag();
