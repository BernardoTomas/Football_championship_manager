# Trybe Futebol Clube

This project is a web application for managing a football club, including backend and frontend components.

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Usage](#usage)

## About

Trybe Futebol Clube is a project developed to manage football teams, matches, and users. It includes a backend built with Node.js and TypeScript, and a frontend built with React.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node.js (version 16.14-alpine)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/trybe-futebol-clube.git
    cd trybe-futebol-clube
    ```
2. Set up the project:
     ```sh
     cd app
     docker-compose up --build -d
     ```
The backend will be available at ```http://localhost:3001``` and the frontend at ```http://localhost:3000```

### Database

The project uses a MySQL database. The schema and initial data can be found in the `db.example.sql` file. To set up the database, get the Database Client extension on VsCode, set up the connection manually with the information in the .env.example file, then run the lines:
```sh
cd app/backend
npm run prestart
```

## Usage

### Running the Application

To start the application, run the following command in the root directory:
```sh
cd app
docker-compose up
```
### Running tests

To run the tests, use the following command:  
```sh
cd app/backend
npm run test
```
