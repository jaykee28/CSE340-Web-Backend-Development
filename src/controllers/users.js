import bcrypt from 'bcrypt';
import {
    createUser,
    authenticateUser
} from '../models/users.js';

// Show registration form
const showUserRegistrationForm = async (req, res) => {
    res.render('register', { title: 'Register User' });
};

// Process registration form
const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    await createUser(name, email, passwordHash);

    req.flash('success', 'User registered successfully!');
    res.redirect('/');
};

// Show login form
const showLoginForm = async (req, res) => {
    res.render('login', { title: 'Login' });
};

// Process login form
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);

    if (user) {
        req.session.user = user;

        console.log('LOGIN SESSION USER:', req.session.user);

        // Save session before redirect
        req.session.save(() => {
            req.flash('success', 'Login successful!');
            console.log('Logged in user:', user);
            res.redirect('/dashboard');
        });
    } else {
        req.flash('error', 'Invalid email or password.');
        res.redirect('/login');
    }
};

// Process logout
const processLogout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

// Middleware: require login
const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'Please log in first.');
        return res.redirect('/login');
    }
    next();
};

// Middleware: require specific role
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access that page.');
            return res.redirect('/');
        }

        next();
    };
};

// Show dashboard
const showDashboard = async (req, res) => {
    const { name, email, role_name } = req.session.user;

    res.render('dashboard', {
        title: 'Dashboard',
        name,
        email,
        role_name
    });
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard
};
