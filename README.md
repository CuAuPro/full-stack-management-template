# Full-Stack Management Template

This project is a full-stack management template built with Angular for the frontend and Node.js for the backend. It is designed to provide a robust starting point for developing a full-stack application with user authentication, admin management, and other features.

## Table of Contents

- [Features](#features)
- [Technology Stack](#stack)
- [Setup Instructions](#setup)
- [Backend](#backend)
- [Frontend](#frontend)
- [Environment Variables](#env)
- [Demo](#demo)
- [License](#license)

## Features <a id='features'></a>

- User authentication and authorization
- Admin management with CRUD operations
- Other pages

## Technology Stack <a id='stack'></a>

- **Backend:** Node.js, Express, SQLite, JWT
- **Frontend:** Angular

## Setup Instructions <a id='setup'></a>

### Prerequisites

- Node.js
- Angular CLI
- SQLite

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cuaupro/full-stack-management-template.git
cd full-stack-management-template
```

2. Setup backend:
```bash
cd backend
npm install
npm run build
```


3. Setup frontend:
```bash
cd ../frontend
npm install
ng build --configuration=production
```


4. Initialize the database (optional, this is example):
```bash
cd ../backend
./init-db.sh
```



### Running the Application

1. Start the backend server:

```bash
cd backend
npm run start
```


2. Open your browser and navigate to `https://localhost`

## Backend <a id='backend'></a>

For detailed instructions on backend setup and usage, refer to `backend/README.md`.

## Frontend <a id='frontend'></a>

For detailed instructions on frontend setup and usage, refer to `frontend/README.md`.

## Environment Variables <a id='env'></a>

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

## Demo <a id='license'></a>


| ![](/docs/img/welcome.jpeg) |
|:--:| 
| Welcome page. |

| ![](/docs/img/dashboard.jpeg) |
|:--:| 
| Dashbboard page. |

| ![](/docs/img/swagger.jpeg) |
|:--:| 
| Swagger REST API docs page. |


## License <a id='license'></a>

This project is licensed under the MIT License.


