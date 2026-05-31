
import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import {
    body,
    validationResult
} from 'express-validator';


import {
    getProjectDetails
} from '../models/projects.js';

const categoryValidation = [

    body('categoryName')
        .trim()
        .notEmpty()
        .withMessage(
            'Category name is required'
        )
        .isLength({ min: 3, max: 100 })
        .withMessage(
            'Category name must be between 3 and 100 characters'
        )
];


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

const showNewCategoryForm =
    async (req, res) => {

    const title =
        'Add New Category';

    res.render(
        'new-category',
        { title }
    );
};

const processNewCategoryForm =
    async (req, res) => {

    const results =
        validationResult(req);

    if (!results.isEmpty()) {

        results.array().forEach(
            (error) => {

            req.flash(
                'error',
                error.msg
            );
        });

        return res.redirect(
            '/new-category'
        );
    }

    const {
        categoryName
    } = req.body;

    const categoryId =
        await createCategory(
            categoryName
        );

    req.flash(
        'success',
        'Category added successfully!'
    );

    res.redirect(
        `/category/${categoryId}`
    );
};

const showEditCategoryForm =
    async (req, res) => {

    const categoryId =
        req.params.id;

    const category =
        await getCategoryDetails(
            categoryId
        );

    const title =
        'Edit Category';

    res.render(
        'edit-category',
        {
            title,
            category
        }
    );
};

const processEditCategoryForm =
    async (req, res) => {

    const results =
        validationResult(req);

    const categoryId =
        req.params.id;

    if (!results.isEmpty()) {

        results.array().forEach(
            (error) => {

            req.flash(
                'error',
                error.msg
            );
        });

        return res.redirect(
            `/edit-category/${categoryId}`
        );
    }

    const {
        categoryName
    } = req.body;

    await updateCategory(
        categoryId,
        categoryName
    );

    req.flash(
        'success',
        'Category updated successfully!'
    );

    res.redirect(
        `/category/${categoryId}`
    );
};

// Export controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
};
