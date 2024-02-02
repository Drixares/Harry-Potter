document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cardID = urlParams.get("id");

  fetch("https://hp-api.onrender.com/api/character/" + cardID)
    .then((res) => res.json())
    .then((cardData) => {
      const cardDetails = document.createElement('div');
      cardDetails.classList.add('card-details');
      cardDetails.innerHTML = `
          <div class="card-header">
            <div class="imgBox">
              <img src="${cardData[0].image}" alt="">
            </div>
            <div class="infosBox">
              <div class="titleBox">
                <h1>${cardData[0].name}</h1>
                <span>${cardData[0].gender}</span>
              </div>
              <span>${cardData[0].species}</span>
            </div>
          </div>
          <div class="card-main">
            <p><span>House :</span> ${cardData[0].house}</p>
            <p><span>Actor :</span> ${cardData[0].actor}</p>
          </div>`

          document.querySelector('.cardBox').appendChild(cardDetails);
    });
});
