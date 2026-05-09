CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(150) NOT NULL,
    organization_description TEXT NOT NULL,
    organization_email VARCHAR(255) NOT NULL,
    organization_logo VARCHAR(255) NOT NULL
);

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    project_title VARCHAR(255) NOT NULL,
    project_description TEXT NOT NULL,
    project_location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);

INSERT INTO service_project (
    organization_id,
    project_title,
    project_description,
    project_location,
    project_date
)
VALUES

-- BrightFuture Builders (organization_id = 1)
(
    1,
    'Community Library Renovation',
    'Renovating and modernizing a local public library.',
    'Cape Town',
    '2026-06-10'
),
(
    1,
    'Playground Construction',
    'Building a safe playground for children in underserved communities.',
    'Johannesburg',
    '2026-06-18'
),
(
    1,
    'Bridge Repair Initiative',
    'Repairing damaged pedestrian bridges in rural areas.',
    'Durban',
    '2026-07-01'
),
(
    1,
    'School Roof Restoration',
    'Replacing damaged roofing at local schools.',
    'Pretoria',
    '2026-07-12'
),
(
    1,
    'Community Housing Project',
    'Helping construct affordable homes for families.',
    'Bloemfontein',
    '2026-07-25'
),

-- GreenHarvest Growers (organization_id = 2)
(
    2,
    'Urban Garden Workshop',
    'Teaching communities how to grow sustainable food.',
    'Cape Town',
    '2026-06-05'
),
(
    2,
    'Community Tree Planting',
    'Planting trees in urban neighborhoods.',
    'Johannesburg',
    '2026-06-15'
),
(
    2,
    'Food Sustainability Fair',
    'Promoting sustainable farming practices.',
    'Durban',
    '2026-07-03'
),
(
    2,
    'Recycling Awareness Campaign',
    'Educating residents about recycling and composting.',
    'Pretoria',
    '2026-07-14'
),
(
    2,
    'Neighborhood Cleanup',
    'Cleaning parks and public spaces.',
    'Port Elizabeth',
    '2026-07-30'
),

-- UnityServe Volunteers (organization_id = 3)
(
    3,
    'Homeless Shelter Support',
    'Providing meals and assistance to shelters.',
    'Cape Town',
    '2026-06-08'
),
(
    3,
    'Charity Fundraising Event',
    'Organizing fundraising activities for local charities.',
    'Johannesburg',
    '2026-06-20'
),
(
    3,
    'Youth Mentorship Program',
    'Supporting youth through mentoring and workshops.',
    'Durban',
    '2026-07-05'
),
(
    3,
    'Senior Care Visits',
    'Visiting and supporting elderly community members.',
    'Pretoria',
    '2026-07-17'
),
(
    3,
    'School Supply Donation Drive',
    'Collecting and distributing school supplies.',
    'Bloemfontein',
    '2026-08-01'
);