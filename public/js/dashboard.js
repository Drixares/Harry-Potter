const  popupBtn = document.querySelector('.popupBtn');
const  popupBox = document.querySelector('.popupBox');
const toggleMode = document.querySelector('.toggleMode');

popupBtn.addEventListener('click', () => {
    popupBox.classList.toggle('active');
});

toggleMode.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});