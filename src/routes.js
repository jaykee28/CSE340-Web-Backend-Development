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
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
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


// Edit project form
router.get(
    '/edit-project/:id',
    showEditProjectForm
);

// Process edit project form
router.post(
    '/edit-project/:id',
    processEditProjectForm
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

// New category form
router.get(
    '/new-category',
    showNewCategoryForm
);

// Process new category form
router.post(
    '/new-category',
    categoryValidation,
    processNewCategoryForm
);

// Edit category form
router.get(
    '/edit-category/:id',
    showEditCategoryForm
);

// Process edit category form
router.post(
    '/edit-category/:id',
    categoryValidation,
    processEditCategoryForm
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