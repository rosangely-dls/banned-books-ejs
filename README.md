# Banned Books Library

A Node.js and Express web application that allows users to track, review, and manage books that have been banned or challenged. Users can register for an account, log in securely, and maintain a personal collection of books with ratings and reviews. 

This project was developed as a final project for a web deveopment course and demonstrates full-stack application development using Node.js, Express, MongoDB, and server-side rendering with EJS. 

---

## Features

- User registration and authentication using Passport
- Secure password hashing
- Create, view, update, and delete book entries
- Store book reviews and ratings
- Dashboard interface with navigation
- Flash messages for notifications
- Access control to ensure users can only modify their own data
- CSRF protection and security middleware
- Styled user interface with responsive layout

--- 

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Express Session
- EJS (Embedded JavaScript Templates)
- Helmet
- xss-clean
- csurf
- express-rate-limit
- Connect-flash

---

## Project Structure

- **Controllers** handle application logic
- **Models** define MongoDB schemas
- **Routes** manage HTTP endpoints
- **Views** contain EJS templates
- **Public** contains static assets like CSS

---

## Installation

1. Clone the repository 
https://github.com/rosangely-dls/banned-books-ejs

2. Navigate to the project folder
cd banned-books-ejs

3. Install dependencies 
npm install

4. Create a `.env` file and add the following variables:
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

5. Start the development server
npm run dev

The application will run on: 
http://localhost:3000

---

## Deployment

This application is deployed on Render.

Live application: 
......

---

## Author

Rosangely De Los Santos

---

## License

This project is for educational purposes. 


