import db from './db.js';

// Get all categories
const getAllCategories = async () => {

    const query = `
        SELECT
            category_id,
            category_name
        FROM category
        ORDER BY category_name;
    `;

    const result = await db.query(query);

    return result.rows;
};

// Get category details
const getCategoryDetails = async (categoryId) => {

    const query = `
        SELECT
            category_id,
            category_name
        FROM category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0
        ? result.rows[0]
        : null;
};

// Get projects by category
const getProjectsByCategoryId = async (categoryId) => {

    const query = `
        SELECT
            service_project.project_id,
            service_project.project_title

        FROM service_project

        JOIN project_category
            ON service_project.project_id =
               project_category.project_id

        WHERE project_category.category_id = $1

        ORDER BY service_project.project_title;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

// Get categories for a project
const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            category.category_id,
            category.category_name

        FROM category

        JOIN project_category
            ON category.category_id =
               project_category.category_id

        WHERE project_category.project_id = $1

        ORDER BY category.category_name;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows;
};


// Assign one category to a project
const assignCategoryToProject = async (
    categoryId,
    projectId
) => {

    const query = `
        INSERT INTO project_category (
            category_id,
            project_id
        )

        VALUES ($1, $2);
    `;

    await db.query(
        query,
        [categoryId, projectId]
    );
};

// Update all category assignments for a project
const updateCategoryAssignments = async (
    projectId,
    categoryIds
) => {

    // Remove existing assignments
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;

    await db.query(
        deleteQuery,
        [projectId]
    );

    // Add new assignments
    for (const categoryId of categoryIds) {

        await assignCategoryToProject(
            categoryId,
            projectId
        );
    }
};



// Export model functions
export {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments
};