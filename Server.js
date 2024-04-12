const express = require('express');
const dotenv = require('dotenv');
const routes = require('./src/routes/index');
const mongoose = require('mongoose');
const connectDB = require('./src/config/Database');
const { HTTP_STATUS } = require('./src/config/constants');


// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Appel de la fonction connectDB pour établir la connexion à la base de données
connectDB();

// Configurer les routes
app.use('/api', routes);

// Gestion des erreurs
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = HTTP_STATUS.NOT_FOUND;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
