import db from './db.js';

// Get all projects
const getAllProjects = async () => {

    const query = `
        SELECT
            service_project.project_id,
            service_project.project_title,
            service_project.project_description,
            service_project.project_location,
            service_project.project_date,
            organization.organization_name
        FROM service_project

        JOIN organization
            ON service_project.organization_id =
               organization.organization_id

        ORDER BY service_project.project_date;
    `;

    const result = await db.query(query);

    return result.rows;
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

// Export model functions
export {
    getAllProjects,
    getProjectsByOrganizationId
};