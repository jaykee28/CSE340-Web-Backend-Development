import bcrypt from 'bcrypt';

import {
    createUser,
    authenticateUser
} from '../models/users.js';

// Show registration form
const showUserRegistrationForm =
    async (req, res) => {

    const title =
        'Register User';

    res.render(
        'register',
        { title }
    );
};

// Process registration form
const processUserRegistrationForm =
    async (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;

    const passwordHash =
        await bcrypt.hash(
            password,
            10
        );

    const userId =
        await createUser(
            name,
            email,
            passwordHash
        );

    req.flash(
        'success',
        'User registered successfully!'
    );

    res.redirect('/');
};

// Show login form
const showLoginForm =
    async (req, res) => {

    const title =
        'Login';

    res.render(
        'login',
        { title }
    );
};

// Process login form
const processLoginForm =
    async (req, res) => {

    const {
        email,
        password
    } = req.body;

    const user =
        await authenticateUser(
            email,
            password
        );

    if (user) {

        req.session.user =
            user;

        req.flash(
            'success',
            'Login successful!'
        );

        console.log(
            'Logged in user:',
            user
        );

        return res.redirect('/');
    }

    req.flash(
        'error',
        'Invalid email or password.'
    );

    res.redirect('/login');
};

// Process logout
const processLogout =
    async (req, res) => {

    req.session.destroy(
        () => {

            res.redirect(
                '/login'
            );
        }
    );
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout
};