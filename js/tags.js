const filterTags = document.querySelectorAll(".filterTag");
const tagList = document.querySelector(".tagsList");
let tags = [];

// console.log(filterTags);

filterTags.forEach((tag) => {
  tag.addEventListener("click", useTag);
});

function useTag(e) {
  if (e.target.getAttribute("data-active") === "false") {
    const newtag = document.createElement("div");

    newtag.innerHTML = `<i class="fa-solid fa-xmark closeTag"></i> <span>By ${e.target.getAttribute(
      "data-name"
    )}</span>`;
    tagList.appendChild(newtag);
    e.target.setAttribute("data-active", "true");
  }
}

function verifyTag() {
  filterTags.forEach((tag) => {
    if (tag.getAttribute("data-active") === "true") {
      const newtag = document.createElement("div");
      newtag.innerHTML = `<i class="fa-solid fa-xmark"></i> <span>By ${tag.getAttribute(
        "data-name"
      )}</span>`;
      tagList.appendChild(newtag);
      tag.setAttribute("data-active", "true");
    }
  });
}

verifyTag();
