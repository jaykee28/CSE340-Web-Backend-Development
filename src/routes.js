import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

import {
    showProjectsPage,    
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// Home page
router.get('/', showHomePage);

// Organizations page
router.get('/organizations', showOrganizationsPage);

// Organization details page
router.get(
    '/organization/:id',
    showOrganizationDetailsPage
);

router.get(
    '/new-organization',
    showNewOrganizationForm
);


router.post(
    '/new-organization',
    organizationValidation,
    processNewOrganizationForm
);

router.get(
    '/edit-organization/:id',
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);
// Projects page
router.get('/projects', showProjectsPage);

router.get(
    '/project/:id',
    showProjectDetailsPage
);


// Assign categories routes
router.get(
    '/assign-categories/:projectId',
    showAssignCategoriesForm
);

router.post(
    '/assign-categories/:projectId',
    processAssignCategoriesForm
);




// New project form
router.get(
    '/new-project',
    showNewProjectForm
);

// Process new project form
router.post(
    '/new-project',
    processNewProjectForm
);



// Categories page
router.get('/categories', showCategoriesPage);

router.get(
    '/category/:id',
    showCategoryDetailsPage
);

// Error route
router.get('/test-error', testErrorPage);

export default router;