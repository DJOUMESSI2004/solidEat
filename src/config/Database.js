const mongoose = require('mongoose');

// Fonction pour établir la connexion à la base de données
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Quitte l'application avec un code d'erreur
    }
};

module.exports = connectDB;
