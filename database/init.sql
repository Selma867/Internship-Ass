

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    personal_info JSONB NOT NULL,
    residential_address JSONB NOT NULL,
    postal_address JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users ((personal_info->>'email'));
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);

-- Sample data (optional)
INSERT INTO users (personal_info, residential_address, postal_address) VALUES (
    '{
        "firstName": "Selma",
        "lastName": "Mbangula",
        "email": "tunambangula8@gmail.com",
        "phone": "+264817554065",
        "dateOfBirth": "2004-01-16",
        "nationality": "Namibian"
    }',
    '{
        "street": "Elisenhiem",
        "city": "Windhoek",
        "state": "ON",
        "postalCode": "PO BOX 3456",
        "country": "Namibia "
    }'
) ON CONFLICT DO NOTHING;