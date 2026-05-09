CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(150) NOT NULL,
    organization_description TEXT NOT NULL,
    organization_email VARCHAR(255) NOT NULL,
    organization_logo VARCHAR(255) NOT NULL
);