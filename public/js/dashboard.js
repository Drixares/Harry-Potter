const btnLogout = document.getElementById('btn-logout')
const confirmLogoutBox = document.querySelector('.confirmLogoutBox')
const btnConfirmLogout = document.getElementById('btn-yes')

btnLogout.addEventListener('click', () => {
  confirmLogoutBox.style.display = 'flex'
})

btnConfirmLogout.addEventListener('click', () => {
  window.location.href = '/logout'
})