const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route pour l'inscription d'un utilisateur
router.post('/register', authController.registerUser);

// Route pour la connexion d'un utilisateur
router.post('/login', authController.loginUser);

// Route protégée nécessitant une authentification
router.get('/protected-route', authMiddleware.authenticateUser, (req, res) => {
    // Cette route est protégée et ne sera accessible que si l'utilisateur est authentifié
    res.json({ message: 'You are authorized to access this route.' });
});

module.exports = router;
