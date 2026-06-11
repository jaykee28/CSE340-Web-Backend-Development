import bcrypt from "bcrypt";

import {
    createUser,
    authenticateUser,
    getAllUsers
} from "../models/users.js";

import {
    getVolunteerProjectsByUserId
} from "../models/projects.js";

// Show registration form
const showUserRegistrationForm = async (req, res) => {
    res.render("register", {
        title: "Register User"
    });
};

// Process registration form
const processUserRegistrationForm = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    const passwordHash =
        await bcrypt.hash(password, 10);

    await createUser(
        name,
        email,
        passwordHash
    );

    req.flash(
        "success",
        "User registered successfully!"
    );

    res.redirect("/");
};

// Show login form
const showLoginForm = async (req, res) => {
    res.render("login", {
        title: "Login"
    });
};

// Process login form
const processLoginForm = async (req, res) => {
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
        req.session.user = user;

        req.session.save(() => {
            req.flash(
                "success",
                "Login successful!"
            );

            res.redirect("/dashboard");
        });

    } else {

        req.flash(
            "error",
            "Invalid email or password."
        );

        res.redirect("/login");
    }
};

// Process logout
const processLogout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};

// Middleware: Require login
const requireLogin = (
    req,
    res,
    next
) => {

    if (
        !req.session ||
        !req.session.user
    ) {

        req.flash(
            "error",
            "Please log in first."
        );

        return res.redirect("/login");
    }

    next();
};

// Middleware: Require role
const requireRole = (role) => {

    return (
        req,
        res,
        next
    ) => {

        if (
            !req.session ||
            !req.session.user
        ) {

            req.flash(
                "error",
                "You must be logged in to access this page."
            );

            return res.redirect("/login");
        }

        if (
            req.session.user.role_name !== role
        ) {

            req.flash(
                "error",
                "You do not have permission to access that page."
            );

            return res.redirect(
                "/dashboard"
            );
        }

        next();
    };
};

// Show dashboard
const showDashboard = async (
    req,
    res
) => {

    try {

        const {
            user_id,
            name,
            email,
            role_name
        } = req.session.user;

        const volunteerProjects =
            await getVolunteerProjectsByUserId(
                user_id
            );

        res.render(
            "dashboard",
            {
                title: "Dashboard",
                name,
                email,
                role_name,
                volunteerProjects
            }
        );

    } catch (err) {

        console.error(
            "Error loading dashboard:",
            err
        );

        req.flash(
            "error",
            "Could not load dashboard."
        );

        res.redirect("/");
    }
};

// Show users page
const showUsersPage = async (
    req,
    res
) => {

    const users =
        await getAllUsers();

    res.render(
        "users",
        {
            title: "Registered Users",
            users
        }
    );
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
    showUsersPage
};