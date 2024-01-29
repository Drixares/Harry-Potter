const filterTags = document.querySelectorAll(".filterTag");
const tagList = document.querySelector(".tagsList");
const allTags = document.querySelectorAll(".tag");
console.log(allTags[0].childNodes[1]);

filterTags.forEach((filter) => {
  filter.addEventListener("click", useTag);
});

function useTag(e) {
  if (e.target.getAttribute("data-active") === "false") {
    const tagtargeted = document.querySelector(
      `.tag[data-name="${e.target.getAttribute("data-name")}"]`
    );
    tagtargeted.classList.add("visible");
  }
}

allTags.forEach((tag) => {
  tag.childNodes[1].addEventListener("click", () => {
    const filterTargeted = document.querySelector(
      `.filterTag[data-name="${tag.getAttribute("data-name")}"`
    );
    console.log(filterTargeted);
    filterTargeted.setAttribute("data-active", "false");
    tag.classList.remove("visible");
  });
});

function verifyTag() {
  filterTags.forEach((filter) => {
    if (filter.getAttribute("data-active") === "true") {
      // console.log(isActive);
      const tagTargeted = document.querySelector(
        `.tag[data-name="${filter.getAttribute("data-name")}"]`
      );
      tagTargeted.classList.add("visible");
    }
  });
}

verifyTag();
