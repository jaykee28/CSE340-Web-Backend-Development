import bcrypt from 'bcrypt';

import {
    createUser
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

export {
    showUserRegistrationForm,
    processUserRegistrationForm
};