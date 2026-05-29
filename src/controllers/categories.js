
import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments
} from '../models/categories.js';

import {
    getProjectDetails
} from '../models/projects.js';

// Categories list page
const showCategoriesPage = async (req, res) => {

    const categories =
        await getAllCategories();

    const title = 'Project Categories';

    res.render('categories', {
        title,
        categories
    });
};

// Category details page
const showCategoryDetailsPage = async (req, res) => {

    const categoryId = req.params.id;

    const category =
        await getCategoryDetails(categoryId);

    const projects =
        await getProjectsByCategoryId(categoryId);

    const title = 'Category Details';

    res.render('category', {
        title,
        category,
        projects
    });
};

// Show assign categories form
const showAssignCategoriesForm =
    async (req, res) => {

    const projectId =
        req.params.projectId;

    const projectDetails =
        await getProjectDetails(projectId);

    const categories =
        await getAllCategories();

    const assignedCategories =
        await getCategoriesByProjectId(
            projectId
        );

    const title =
        'Assign Categories to Project';

    res.render(
        'assign-categories',
        {
            title,
            projectId,
            projectDetails,
            categories,
            assignedCategories
        }
    );
};

// Process assign categories form
const processAssignCategoriesForm =
    async (req, res) => {

    const projectId =
        req.params.projectId;

    const selectedCategoryIds =
        req.body.categoryIds || [];

    const categoryIdsArray =
        Array.isArray(selectedCategoryIds)
            ? selectedCategoryIds
            : [selectedCategoryIds];

    await updateCategoryAssignments(
        projectId,
        categoryIdsArray
    );

    req.flash(
        'success',
        'Categories updated successfully.'
    );

    res.redirect(
        `/project/${projectId}`
    );
};

// Export controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};

