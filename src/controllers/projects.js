import {
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject,
    addVolunteer,
    removeVolunteer,
    isVolunteerForProject
} from "../models/projects.js";

import {
    getCategoriesByProjectId
} from "../models/categories.js";

import {
    getAllOrganizations
} from "../models/organizations.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Projects page
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(
        NUMBER_OF_UPCOMING_PROJECTS
    );

    res.render("projects", {
        title: "Upcoming Service Projects",
        projects
    });
};

// Project details page
const showProjectDetailsPage = async (req, res) => {
    const projectId = Number(req.params.id);

    const project =
        await getProjectDetails(projectId);

    if (!project) {
        return res.status(404).render("404", {
            title: "Project Not Found"
        });
    }

    const categories =
        await getCategoriesByProjectId(projectId);

    let isVolunteer = false;

    if (
        req.session &&
        req.session.user
    ) {
        isVolunteer =
            await isVolunteerForProject(
                req.session.user.user_id,
                projectId
            );
    }

    res.render("project", {
        title: "Project Details",
        project,
        categories,
        isVolunteer,
        user: req.session.user || null,
        isLoggedIn: !!req.session.user
    });
};

// Show new project form
const showNewProjectForm = async (req, res) => {
    const organizations =
        await getAllOrganizations();

    res.render("new-project", {
        title: "Add New Service Project",
        organizations
    });
};

// Show edit project form
const showEditProjectForm = async (req, res) => {
    const projectId = Number(req.params.id);

    const project =
        await getProjectDetails(projectId);

    if (!project) {
        return res.status(404).render("404", {
            title: "Project Not Found"
        });
    }

    const organizations =
        await getAllOrganizations();

    res.render("edit-project", {
        title: "Edit Service Project",
        project,
        organizations
    });
};

// Process new project form
const processNewProjectForm = async (req, res) => {
    const {
        organizationId,
        title,
        description,
        location,
        date
    } = req.body;

    await createProject(
        title,
        description,
        location,
        date,
        organizationId
    );

    req.flash(
        "success",
        "Project added successfully!"
    );

    res.redirect("/projects");
};

// Process edit project form
const processEditProjectForm = async (req, res) => {
    const projectId = Number(req.params.id);

    const {
        organizationId,
        title,
        description,
        location,
        date
    } = req.body;

    await updateProject(
        projectId,
        title,
        description,
        location,
        date,
        organizationId
    );

    req.flash(
        "success",
        "Project updated successfully!"
    );

    res.redirect(`/project/${projectId}`);
};

// Volunteer for project
const processVolunteerSignup =
    async (req, res) => {

    const projectId =
        Number(req.params.id);

    const userId =
        req.session.user.user_id;

    await addVolunteer(
        userId,
        projectId
    );

    req.flash(
        "success",
        "You are now volunteering for this project."
    );

    res.redirect(
        `/project/${projectId}`
    );
};

// Remove volunteer signup
const processVolunteerRemoval =
    async (req, res) => {

    const projectId =
        Number(req.params.id);

    const userId =
        req.session.user.user_id;

    await removeVolunteer(
        userId,
        projectId
    );

    req.flash(
        "success",
        "Volunteer signup removed."
    );

    res.redirect(
        `/project/${projectId}`
    );
};

export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    processVolunteerSignup,
    processVolunteerRemoval
};