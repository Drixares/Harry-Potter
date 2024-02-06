const  popupBtn = document.querySelector('.popupBtn');
const  popupBox = document.querySelector('.popupBox');

popupBtn.addEventListener('click', () => {
    popupBox.classList.toggle('active');
});