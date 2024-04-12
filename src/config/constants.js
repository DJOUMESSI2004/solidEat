// constants.js

// Codes d'état HTTP
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409
};

// Messages d'erreur
const ERROR_MESSAGES = {
    USER_NOT_FOUND: 'Utilisateur non trouvé.',
    INVALID_CREDENTIALS: 'Identifiants invalides.'
};

module.exports = { HTTP_STATUS, ERROR_MESSAGES };
