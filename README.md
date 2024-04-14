# Signin-Signup Website

This project is a basic signin/signup website template built using Node.js, Express, EJS, and MongoDB.
It provides a simple user authentication system with integrated JSON Web Tokens (JWT) for session management.
This template can be used as a starting point for building user authentication features in your own projects.

# Features
  • User signup and login functionality.<br>
  • Password encryption using bcrypt.<br>
  • Session management with JSON Web Tokens (JWT).<br>
  • Integration with MongoDB for data storage.<br>

# Getting Started

**Prerequisites**<br>
  • Node.js installed on your machine.<br>
  • MongoDB installed and running locally or a MongoDB Atlas account for cloud-based database storage.<br>

**Initialization**<br>
1. Clone the repository<br>
```HTML
 git clone <repository-url>
```

3. Install dependencies<br>
```HTML
 npm install
```

5. Set environment variables<br>
  • Create a .env file in the root directory.<br>
  • Add the following environment variables:<br>
```HTML
  MONGO_URI=<your-mongodb-uri>
  SECRET_KEY=<your-secret-key>
```
Replace <your-mongodb-uri> with the URI of your MongoDB database, and <your-secret-key> with a secret key for JWT encryption.

6. Start the server<br>
```HTML
 npm start
 OR
 nodemon server.js
```

Open your web browser and navigate to http://localhost:4000 to access the signin/signup website.


 



