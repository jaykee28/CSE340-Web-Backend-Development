import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm
} from './controllers/organizations.js';

import {
    showProjectsPage,    
    showProjectDetailsPage
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage
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
    processNewOrganizationForm
);

// Projects page
router.get('/projects', showProjectsPage);

router.get(
    '/project/:id',
    showProjectDetailsPage
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