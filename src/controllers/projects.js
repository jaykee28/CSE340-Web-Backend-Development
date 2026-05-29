
import {
    getUpcomingProjects,
    getProjectDetails,
    createProject
} from '../models/projects.js';

import {
    getCategoriesByProjectId
} from '../models/categories.js';

import {
    getAllOrganizations
} from '../models/organizations.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Projects page
const showProjectsPage = async (req, res) => {

    const projects =
        await getUpcomingProjects(
            NUMBER_OF_UPCOMING_PROJECTS
        );

    const title = 'Upcoming Service Projects';

    res.render('projects', {
        title,
        projects
    });
};

// Project details page
const showProjectDetailsPage = async (req, res) => {

    const projectId = req.params.id;

    const project =
        await getProjectDetails(projectId);

    const categories =
        await getCategoriesByProjectId(projectId);

    const title = 'Project Details';

    res.render('project', {
        title,
        project,
        categories
    });
};

// Show new project form
const showNewProjectForm =
    async (req, res) => {

    const organizations =
        await getAllOrganizations();

    const title =
        'Add New Service Project';

    res.render('new-project', {
        title,
        organizations
    });
};

// Process new project form
const processNewProjectForm =
    async (req, res) => {

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
        'success',
        'Project added successfully!'
    );

    res.redirect('/projects');
};

// Export controller functions
export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm
};
