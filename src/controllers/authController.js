const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { HTTP_STATUS } = require('../config/constants');



exports.registerUser = async (req, res) => {
    try {
        const { name, address, email, password } = req.body;

        // Debug output to check what's received
        console.log('Received:', { name, address, email, password });

        // Updated validation for email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        console.log('Testing email:', email);
        if (!emailRegex.test(email)) {
            console.log('Email validation failed');
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid email format' });
        }

        // Validation for password
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            console.log('Password validation failed');
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: 'Password must be at least 8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character (!@#$%^&*).'
            });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists');
            return res.status(HTTP_STATUS.CONFLICT).json({ message: 'Email already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = new User({
            name,
            address,
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log('User registered successfully');
        res.status(HTTP_STATUS.OK).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error registering user', error: error.message });
    }
};









// authController.js
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Rechercher l'utilisateur dans la base de données par son adresse e-mail
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Adresse e-mail ou mot de passe incorrect.' });
        }

        // Debug output to check the retrieved user
        console.log('User found:', user);

        // Vérifier si le mot de passe fourni correspond au mot de passe haché dans la base de données
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Adresse e-mail ou mot de passe incorrect.' });
        }

        // Debug output to check password comparison result
        console.log('Password match:', passwordMatch);

        // Générer un jeton JWT pour l'utilisateur authentifié
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // 1h est la durée de validité du jeton

        // Retourner le jeton JWT au client
        res.status(HTTP_STATUS.OK).json({ message: 'Connexion réussie.', token });
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur :', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
    }
};
