# Backend

This directory contains the backend code for the Full-Stack Management Template. It is built with Node.js, Express, and SQLite.

## Features

- User authentication with JWT
- Data management with SQLite
- API documentation with Swagger

## Setup Instructions

### Prerequisites

- Node.js
- SQLite


### Swagger API Documentation

The Swagger API documentation for the backend is defined in the `swagger.yaml` file located in the `src/routes` directory. 

To ensure the correctness of the Swagger API specification, run the following command:

```bash
npx @redocly/cli lint ./src/routes/swagger.yaml
```

To generate TypeScript types from the Swagger API specification, navigate to the `src/routes` directory and run:
```bash
npx openapi-typescript swagger.yaml -o schema.d.ts
```

This will generate TypeScript types in a `schema.d.ts` file based on the Swagger API specification.


### HTTPS Certificates
Generate self-signed certificates for development purposes. For production, use certificates from a trusted Certificate Authority (CA).

Use OpenSSL to generate a self-signed certificate:

```bash
mkdir certs
openssl req -nodes -new -x509 -keyout certs/key.pem -out certs/cert.pem -days 3650
```

### Installation

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```


### Database Initialization

You have two options to initialize the database:

#### Manual Initialization

1. Open SQLite.


2. Run the following SQL commands:

```sql
-- Create users table
CREATE TABLE users (
id INTEGER PRIMARY KEY,
username TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
firstName TEXT NOT NULL,
lastName TEXT NOT NULL,
role TEXT NOT NULL
);

-- Create lp_whitelist table
CREATE TABLE lp_whitelist (
id INTEGER PRIMARY KEY,
license_plate TEXT NOT NULL UNIQUE,
from_date DATE NOT NULL,
to_date DATE NOT NULL
);

-- Create statistics table
CREATE TABLE statistics (
id INTEGER PRIMARY KEY,
license_plate TEXT NOT NULL,
pass_date DATE NOT NULL,
FOREIGN KEY (license_plate) REFERENCES lp_whitelist(license_plate)
);

-- Add admin user with hashed password
INSERT INTO users (username, password, firstName, lastName, role)
VALUES ('admin', '$2b$10$icCT4/cxiaAHepb62Cbi9ORYQRJuhKlfKWGkAE6Ia5gZMD5STS.ZW', 'Admin', '', 'admin');
```


#### Automatic Initialization

Run the provided initialization script:


### Running the Server

Start the backend server:

```bash
npm run start
```
The server will run on `https://localhost`

```bash
./init-db.sh
```

### API Endpoints

- `POST /auth/signin`: Sign in a user
- `POST /auth/signup`: Sign up a new user
- `POST /auth/reset-password`: Reset a user's password
- `GET /api/users`: Get a list of users
- `GET /api/products`: Get a list of products

## Environment Variables

Create an `dev.env` file in the `backend/env` directory with the following contents:

```bash
NODEJS="DEVEL"
PORT=443
JWT_SECRET=your_jwt_secret
```

Create an `prod.env` file in the `backend/env` directory with the following contents:

```bash
NODEJS="PROD"
PORT=443
JWT_SECRET=your_jwt_secret
```


## License
This project is licensed under the MIT License.
