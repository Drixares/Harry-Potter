import express from 'express';
import validLogin from '../controllers/validLogin.js';
import validRegister from '../controllers/validRegister.js';

export const router = express.Router()

const protectionRoute = (req, res, next) => {
  if (req.session.userId) {
    next()
  } else {
    res.redirect('/formulaire/user/login')
  }
}

const verifyConnexion = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/user/dashboard')
  } else {
    next()
  }
}

router.post('/formulaire/user/register', validRegister);
router.post('/formulaire/user/login', validLogin);
router.post('/formulaire/user/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/formulaire/user/login')
  })

  res.clearCookie(process.env.SESSION_NAME)

})

router.get('/user/dashboard', protectionRoute, (req, res) => {
  res.sendFile('dashboard.html', {root: `../public/`})
});
router.get('/formulaire/user/login', verifyConnexion, (req, res) => {
  res.sendFile('login.html', {root: `../public/`})
})
router.get('/formulaire/user/register', verifyConnexion, (req, res) => {
  res.sendFile('signup.html', {root: `../public/`})
})

router.post('/formulaire/user/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/formulaire/user/login')
  })

  res.clearCookie(process.env.SESSION_NAME)
})