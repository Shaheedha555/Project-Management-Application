# API Documentation

This is a REST-ful API for a project management application. It is developed using NodeJS,ExpressJS and MongoDB (Mongoose).

This API controls the following requests:

- Register new user
- Login with registered credentials
- Get all users
- Get a specific user
- Update user data
- Delete user
- Create a new project
- Get all projects
- Get all projects of current user
- Get a specific project
- Update project details
- Delete project
- Create a new task for a user in a project
- Get all tasks
- Get all tasks of current user
- Get all tasks of a project
- Get specific task
- Update task details
- Delete task


## Authentication

All endpoints except `/users` and `/users/login` require authentication using JWT. To authenticate, include an Authorization header with the value `Bearer {token}` where `{token}` is the JWT obtained from `/users/login`.

## Users

### Register


Endpoint: `POST /users`

Body:

| Name     | Type   | Required | Description      |
|----------|--------|----------|------------------|
| name     | string | Yes       | User's name      |
| email    | string | Yes      | User's email     |
| password | string | Yes      | User's password  |

Response: 

| Name   | Type   | Description        |
|--------|--------|--------------------|
| name     | string | User's name      |
| email    | string | User's email     |
| _id    | string | MongoDB ObjectID     |
| token  | string | JWT authentication token for the new user |

### Login


Endpoint: `POST /users/login`

Body:

| Name     | Type   | Required | Description      |
|----------|--------|----------|------------------|
| email    | string | Yes      | User's email     |
| password | string | Yes      | User's password  |

Response: 

| Name   | Type   | Description        |
|--------|--------|--------------------|
| name     | string | User's name      |
| email    | string | User's email     |
| _id    | string | MongoDB ObjectID     |
| token  | string | JWT authentication token for the user |

### Get all user data


Endpoint: `GET /users`

Response: 

| Name  | Type   | Description                  |
|-------|--------|------------------------------|
| users | array  | Array of all user objects    |

### Get specific user data


Endpoint: `GET /users/:id`

Parameters:

| Name | Type   | Required | Description        |
|------|--------|----------|--------------------|
| id   | string | Yes      | User's ID          |

Response: 

| Name  | Type   | Description        |
|-------|--------|--------------------|
| user  | object | User object excluding password       |

### Update current user data


Endpoint: `PUT /users/:id`

Parameters:

| Name     | Type   | Required | Description        |
|----------|--------|----------|--------------------|
| id       | string | Yes      | User's ID          |

Body:

| Name     | Type   | Required | Description        |
|----------|--------|----------|--------------------|
| email    | string | No       | User's email       |
| name     | string | No       | User's name        |
| password | string | No       | User's old password    |
| new_password | string | No       | User's new password    |

Response: 

| Name   | Type   | Description        |
|--------|--------|--------------------|
| user   | object | Updated user object excluding password|

### Delete account


Endpoint: `DELETE /users/:id`

Parameters:

| Name | Type   | Required | Description        |
|------|--------|----------|--------------------|
| id   | string | Yes      | User's ID          |

Response: 

| Name   | Type   | Description        |
|--------|--------|--------------------|
| message| string | Success message    |


## Projects

### Create new project


Endpoint: `POST /projects`

Body:

| Name       | Type    | Required | Description                 |
|------------|---------|----------|-----------------------------|
| name       | string  | Yes      | Project name                |
| description       | string  | Yes       | Project description         |
| due_date | date  | Yes       | Project due date (YYYY-MM-DD) |


### Get all projects


Endpoint: `GET /projects`

Response:

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| projects  | array  | Array of all project objects|

### Get all projects of current user


Endpoint: `GET /projects/my-projects`

Response:

| Name      | Type   | Description                          |
|-----------|--------|--------------------------------------|
| projects  | array  | Array of all projects for the user    |

### Get specific project


Endpoint: `GET /projects/:id`

Parameters:

| Name | Type   | Required | Description         |
|------|--------|----------|---------------------|
| id   | string | Yes      | Project's ID        |

Response:

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| project   | object | Project object              |

### Update project details


Endpoint: `PUT /projects/:id`

Parameters:

| Name       | Type    | Required | Description                 |
|------------|---------|----------|-----------------------------|
| id         | string  | Yes      | Project's ID                |

Body:

| Name     | Type   | Required | Description        |
|----------|--------|----------|--------------------|
| name       | string  | No       | Project name                |
| description       | string  | No       | Project description         |
| due_date | date  | No       | Project due date (YYYY-MM-DD) |

Response:

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| project   | object | Updated project object       |

### Delete project


Endpoint: `DELETE /projects/:id`

Parameters:

| Name | Type   | Required | Description         |
|------|--------|----------|---------------------|
| id   | string | Yes      | Project's ID        |

Response:

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| message   | string | Success message             |

## Tasks


### Create task in a project for a user


Endpoint: `POST /tasks`

Body:

| Name       | Type    | Required | Description             |
|------------|---------|----------|-------------------------|
| project_id | string  | Yes      | ID of the project        |
| user_id    | string  | Yes      | ID of the assigned user  |
| name      | string  | Yes      | Task title               |
| description       | string  | Yes       | Task description         |
| due_date   | date  | Yes       | Task due date (YYYY-MM-DD)|

Response:

| Name   | Type   | Description             |
|--------|--------|-------------------------|
| task   | object | Created task object      |

### Get all tasks


Endpoint: `GET /tasks`

Response:

| Name   | Type   | Description               |
|--------|--------|---------------------------|
| tasks  | array  | Array of all task objects  |

### Get all tasks of current user


Endpoint: `GET /tasks/my-tasks`

Response:

| Name   | Type   | Description                      |
|--------|--------|----------------------------------|
| tasks  | array  | Array of all tasks for the user   |

### Get all tasks of a project


Endpoint: `GET /tasks?project=${id}`

Parameters:

| Name     | Type   | Required | Description         |
|----------|--------|----------|---------------------|
| project  | string | Yes      | ID of the project   |

Response:

| Name   | Type   | Description               |
|--------|--------|---------------------------|
| tasks  | array  | Array of all tasks for the project   |

### Get specific task


Endpoint: `GET /tasks/:id`

Parameters:

| Name | Type   | Required | Description         |
|------|--------|----------|---------------------|
| id   | string | Yes      | Task's ID           |

Response:

| Name   | Type   | Description             |
|--------|--------|-------------------------|
| task   | object | Task object              |

### Update task


Endpoint: `PUT /tasks/:id`

Parameters:

| Name       | Type    | Required | Description             |
|------------|---------|----------|-------------------------|
| id         | string  | Yes      | Task's ID               |

Body:

| Name       | Type    | Required | Description             |
|------------|---------|----------|-------------------------|
| name      | string  | No       | Task title              |
| description       | string  | No       | Task description        |
| due_date   | date  | No       | Task due date (YYYY-MM-DD)|

Response:

| Name   | Type   | Description             |
|--------|--------|-------------------------|
| task   | object | Updated task object      |

### Delete task


Endpoint: `DELETE /tasks/:id`

Parameters:

| Name | Type   | Required | Description         |
|------|--------|----------|---------------------|
| id   | string | Yes      | Task's ID           |

Response:

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| message   | string | Success message             |
