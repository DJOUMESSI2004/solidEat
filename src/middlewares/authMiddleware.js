const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    // Extraction du token de l'en-tête Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Vérification de la présence et du format du token
        return res.status(401).json({ message: 'Authentification échouée. Token manquant ou invalide.' });
    }

    const token = authHeader.split(' ')[1]; // Récupération de la partie token de l'en-tête

    try {
        // Vérification du token en utilisant votre clé secrète (assurez-vous de garder votre clé secrète en sécurité et de la charger à partir de variables d'environnement)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajout de l'ID de l'utilisateur décodé à l'objet de requête
        req.userId = decoded.userId; // En supposant que le token a été encodé avec un objet contenant l'ID de l'utilisateur

        // Si le token est valide, appelez next pour passer au prochain middleware
        next();
    } catch (error) {
        // En cas d'erreur (par exemple, le token a expiré ou a été altéré), répondre avec une erreur
        return res.status(403).json({ message: 'Authentification échouée. Token invalide.' });
    }
};
