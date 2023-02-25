# Project Management Application - API
This API is for an application to manage projects and assign tasks for users. User can create and log in to account, create project, create tasks for projects and assign for users, update or delete project, tasks and user data. Users can view all projects in the application, tasks of each projects and their own projects and tasks. Users can update contents of their own projects and tasks.

### Technologies used: ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) 


### Features and Endpoints:

| **Feature**                         | **Method and Endpoint**   |
|-------------------------------------|---------------------------|
| Register                            | POST /users               |
| Login                               | POST /users/login         |
| Get all user data                   | GET /users                |
| Get specific user data              | GET /users/:id            |
| Update current user data            | PUT /users/:id            |
| Delete account                      | DELETE /users/:id         |
| Create new project                  | POST /projects            |
| Get all projects                    | GET /projects             |
| Get all projects of current user    | GET /projects/my-projects |
| Get specific project                | GET /projects/:id         |
| Update project details              | PUT /projects/:id         |
| Delete project                      | DELETE /projects/:id      |
| Create task in a project for a user | POST /tasks               |
| Get all tasks                       | GET /tasks                |
| Get all tasks of current user       | GET /tasks/my-tasks       |
| Get all tasks of a project          | GET /tasks?project=${id}  |
| Get specific task                   | GET /tasks/:id            |
| Update task                         | PUT /tasks/:id            |
| Delete task                         | DELETE /tasks/:id         |


### Authentication:
To authenticate user data, the email and password are collected. The password is then hashed using bcryptJS, before being stored in the database. When a user attempts to login, the entered password is hashed and compared with the saved password hash in the database. If the two match, the user is authenticated and granted access to the resource.


### Authorization:
JWT is used for authorization. If authentication is successful, the server generates a JWT containing the user's information and returns it to the client. As all requests are protected using a middleware, the server checks the validity of the JWT in each subsequent requests. This involves verifying the signature of the token using a secret key known only to the server, and checking whether the token has expired or been revoked. If the JWT is valid, the server extracts the payload and checks whether the user has the required permissions to access the resource. If the user is authorized, the server returns the requested resource. If the JWT is invalid or the user is not authorized, the server returns an error response. 


### Error handling:
The error handler in this application is implemented as a middleware function that is called whenever an error occurs during the request/response cycle. This middleware is designed to catch any errors that may occur in subsequent middleware or routers, and to format an appropriate error response for the client.


### Security:
OWASP security best practices included.
Security practices used in this application are:
- JWT authentication
- Hashed password
- Input validation and custom error messages using express-validator
- Input sanitization
- Sensitive information stored in .env file
- Access-controlling:
  - Users can edit their own data
  - Project can be update by the project owner only
  - Task can be update by the assigned user only
  - Only Project owner can create tasks and assign users


### Documentation:
API Documentation contains the details of all endpoints, parameters, and responses. Here is the [Link](API-Documentation.md)


### Deployment:
The API is deployed on Vercel using github repo.
Link to the deployed API : [https://project-management-application-k76g.vercel.app/](https://project-management-application-k76g.vercel.app/)





