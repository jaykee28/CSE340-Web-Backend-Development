import db from './db.js';

// Get upcoming projects
const getUpcomingProjects = async (numberOfProjects) => {

    const query = `
        SELECT
            service_project.project_id,
            service_project.project_title,
            service_project.project_description,
            service_project.project_date,
            service_project.project_location,
            organization.organization_id,
            organization.organization_name

        FROM service_project

        JOIN organization
            ON service_project.organization_id =
               organization.organization_id

        WHERE service_project.project_date >= CURRENT_DATE

        ORDER BY service_project.project_date ASC

        LIMIT $1;
    `;

    const queryParams = [numberOfProjects];

    const result = await db.query(query, queryParams);

    return result.rows;
};

// Get project details
const getProjectDetails = async (projectId) => {

    const query = `
        SELECT
            service_project.project_id,
            service_project.project_title,
            service_project.project_description,
            service_project.project_date,
            service_project.project_location,
            organization.organization_id,
            organization.organization_name

        FROM service_project

        JOIN organization
            ON service_project.organization_id =
               organization.organization_id

        WHERE service_project.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0
        ? result.rows[0]
        : null;
};

// Get projects by organization ID
const getProjectsByOrganizationId = async (organizationId) => {

    const query = `
        SELECT
            project_id,
            organization_id,
            project_title,
            project_description,
            project_location,
            project_date

        FROM service_project

        WHERE organization_id = $1

        ORDER BY project_date;
    `;

    const queryParams = [organizationId];

    const result = await db.query(query, queryParams);

    return result.rows;
};


// Create new project
const createProject = async (
    title,
    description,
    location,
    date,
    organizationId
) => {

    const query = `
        INSERT INTO service_project (
            project_title,
            project_description,
            project_location,
            project_date,
            organization_id
        )

        VALUES ($1, $2, $3, $4, $5)

        RETURNING project_id;
    `;

    const queryParams = [
        title,
        description,
        location,
        date,
        organizationId
    ];

    const result =
        await db.query(query, queryParams);

    if (result.rows.length === 0) {

        throw new Error(
            'Failed to create project'
        );
    }

    return result.rows[0].project_id;
};


// Update project
const updateProject = async (
    projectId,
    title,
    description,
    location,
    date,
    organizationId
) => {

    const query = `
        UPDATE service_project
        SET
            project_title = $1,
            project_description = $2,
            project_location = $3,
            project_date = $4,
            organization_id = $5
        WHERE project_id = $6

        RETURNING project_id;
    `;

    const queryParams = [
        title,
        description,
        location,
        date,
        organizationId,
        projectId
    ];

    const result =
        await db.query(query, queryParams);

    if (result.rows.length === 0) {

        throw new Error(
            'Failed to update project'
        );
    }

    return result.rows[0].project_id;
};



// Export model functions
export {
    getUpcomingProjects,
    getProjectDetails,
    getProjectsByOrganizationId,
    createProject,
    updateProject
};