const express = require('express');
const authRoutes = require('./authRoutes');
// Importer d'autres fichiers de routes si nécessaire

const router = express.Router();

// Configurer les routes
router.use('/auth', authRoutes);
// Utiliser d'autres fichiers de routes si nécessaire

module.exports = router;
