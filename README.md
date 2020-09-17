# EDU Q & A Forum (API Core3 project)
A webforum where users can ask Questions and provide Answers.
# Technology Used
-  Node.js
 - Express
 - JSON Web Token
 - "Bcrypt":"^5.0.0"
 - Passport
# Application Structure;
 - "body-parser":"^1.19.0",
 - "consola"."^2.15.0",
 - "cors":"^2.8.5",
 - "dotenv":"^8.2.0",
 - "express":"^4.17.1",
 - "jsonwebtoken":"^8.5.1"
 - "mongoose": "^5.10.2",
 - "morgan":"^1.10.0",
 - "nodemon":"^2.0.4",
 - "passport":"^0.4.1",
 - "passport-jwt": "4.0.0"
# Enviromental Variable
 - PORT-- server port number
 - DB_URL-- database URL
 - SECRET_KEY-- secret key for verifying the token
##### Usage
1. Clone this repository
2. cd into project root directory
3. Install Node & Express
4. Run npm install to install all required dependencies
4. Run npm start to start the server
5. Open up Postman or another API client development
   platform and then test out the Endpoints
###### User CRUD Operations
GET all questions:
http://localhost:3000/questionRoutes/

GET all answers:
http://localhost:3000/answerRoute/

Create account:
http://localhost:3000/auth/users/register-user
http://localhost:3000/auth/users/register-admin
{"name":"","username":"",email":"","password":""}

Login
http://localhost:3000/auth/users/login-user
http://localhost:3000/auth/users/login-admin
{"username":""email":"","","password":""}

POST Questions:
http://localhost:3000?questioRoutes/
{"question":""userId":"","userId":""}

View Answer to questions:
http://localhost:3000/answerRoute/:answerId

Accept a response out of all the responses
http://localhost:3000/:
preferredAnswerId/true

1. Users can create an account and login
2. Users can post questions
3. Users can delete the questions they post
4. Users can post answers
5. Users can view the answers to questions
6. User can accept a response out of all the responses 
   to his/her question as the preferred answer.

   delete/:answerId
## Team:
- Agrey Lemi
- Anthony Busuulwa
- Tony Rubombora
- Tony Mulenzi
LF - Jane Zalwango

