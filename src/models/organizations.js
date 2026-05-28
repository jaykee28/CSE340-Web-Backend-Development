
import db from './db.js';

// Get all organizations
const getAllOrganizations = async () => {

    const query = `
        SELECT
            organization_id,
            organization_name,
            organization_description,
            organization_email,
            organization_logo
        FROM organization;
    `;

    const result = await db.query(query);

    return result.rows;
};

// Get one organization by ID
const getOrganizationDetails = async (organizationId) => {

    const query = `
        SELECT
            organization_id,
            organization_name,
            organization_description,
            organization_email,
            organization_logo
        FROM organization
        WHERE organization_id = $1;
    `;

    const queryParams = [organizationId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0
        ? result.rows[0]
        : null;
};

const createOrganization = async (
    name,
    description,
    contactEmail,
    logoFilename
) => {

    const query = `
        INSERT INTO organization (
            organization_name,
            organization_description,
            organization_email,
            organization_logo
        )

        VALUES ($1, $2, $3, $4)

        RETURNING organization_id;
    `;

    const queryParams = [
        name,
        description,
        contactEmail,
        logoFilename
    ];

    const result =
        await db.query(query, queryParams);

    if (result.rows.length === 0) {

        throw new Error(
            'Failed to create organization'
        );
    }

    return result.rows[0].organization_id;
};

const updateOrganization = async (
    organizationId,
    name,
    description,
    contactEmail,
    logoFilename
)=> {

    
const query = `
    UPDATE organization
    SET
        organization_name = $1,
        organization_description = $2,
        organization_email = $3,
        organization_logo = $4
    WHERE organization_id = $5;
    `;

const queryParams = [
    name,
    description,
    contactEmail,
    logoFilename,
    organizationId
    ];
     await db.query(query, queryParams);
        
};

// Export model functions
export {
    getAllOrganizations,
    getOrganizationDetails,
    createOrganization,
    updateOrganization
};