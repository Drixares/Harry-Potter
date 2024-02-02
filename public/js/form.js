const formNickname = document.getElementById('formNickname');
const formEmail = document.getElementById('formEmail');
const formPassword = document.getElementById('formPassword');
const form = document.querySelector('form');

// Fonction qui vérifie l'email avec un regex dédié aux emails
function verifyEmail(input, email) {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regEx.test(email)) {
      input.style.borderBottom = '2px solid green'
      return true
  } else {
      input.style.borderBottom = '2px solid var(--color-error)'
      return false
  }
}


// Même chose que la fonction avec l'email mais avec un regex différent pour le mot de passe.
function verifyPassword(input, password) {
  const regEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])/;

  if (regEx.test(password)) {
      input.style.borderBottom = '2px solid green'
      erreur.style.display = "none"
      return true
  } else {
      input.style.borderBottom = '2px solid var(--color-error)'
      erreur.textContent = 
          `Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre
          et un caractère spécial.`
      erreur.style.display = 'block';
      return false
  }
}

// function verifyName(input, name) {
//   const regEx = /^\S/;

//   if (regEx.test(name)) {
//       input.style.borderBottom = '2px solid green'
//       erreur.style.display = "none"
//       return true
//   } else {
//       input.style.borderBottom = '2px solid var(--color-error)'
//       erreur.textContent = 
//           `Le nom ne peut pas être vide.`
//       erreur.style.display = 'block';
//       return false
//   }
// }


// Evènement d'envoi du formulaire 
form.addEventListener('submit', e => {
  e.preventDefault()

  // l'existence de formName permet de savoir si c'est l'inscription ou le login.
  // la condition agit donc en fonction de si c'est l'inscription ou le login
  if (formNickname) {
      if (formNickname.value  && verifyEmail && verifyPassword) { 
          
          fetch(getUrl() + '/formulaire/user/register', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  user: formNickname.value,
                  email: formEmail.value,
                  password: formPassword.value
              })
          })
          
      } else {
          erreur.textContent = "Le formulaire est mal rempli.";
          erreur.style.display = 'block';
      }

  } else {
      if (verifyEmail && verifyPassword) { 
          
          fetch(getUrl() + '/formulaire/user/login', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email: formEmail.value,
                  password: formPassword.value,
              })
          })
          
      } else {
          erreur.textContent = "Le formulaire est mal rempli.";
          erreur.style.display = 'block';
      }

  }
})

function getUrl() {
  let splitUrl = document.location.href.split('/')
  splitUrl.splice(-1, 1)
  const newUrl = splitUrl.join('/')
  
  return newUrl;
}
