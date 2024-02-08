const  popupBtn = document.querySelector('.popupBtn');
const  popupBox = document.querySelector('.popupBox');
const toggleMode = document.querySelector('.toggleMode');
const deployNav = document.querySelector('.deployNav');

popupBtn.addEventListener('click', () => {
    popupBox.classList.toggle('active');
});

toggleMode.addEventListener('click', () => {

    const rootElement = document.documentElement;
    let dataTheme = rootElement.getAttribute('data-theme'), newTheme;

    newTheme = (dataTheme === 'dark') ? 'light' : 'dark';
    rootElement.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);
});

deployNav.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('visible');
});