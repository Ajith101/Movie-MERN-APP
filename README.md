# MERN Movie Dashboard & Movie Listing App

Full-stack movie app built with the MERN stack, following the MVC architecture. It provides users with an interactive platform to manage their movie collection and plan their watchlist. With an elegant and user-friendly interface, and seamless movie browsing experience..

## Preview

![MERN Movie Dashboard](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/6b04c52e-fbc2-42d7-918a-1c0955d30c02)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/bb38d8e0-e5a8-4701-8a05-77292ac36a0b)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/38812139-9806-497f-9347-9ff6f1ceb351)

Movies Dashboard App - working video
https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/6293f1c4-5f5c-45bb-83b5-4da48f71cd56

Movies Listing App - working video
https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/14a0bcc6-f487-4da3-8af1-7d242b429734

## Features of the Movies Dashboard App

- Movies Listing Dashboard
- Add and edit movies
- Add and edit genres
- Managing content
- Delete existing content
- Login
- Register
- Forgot Password
- Confirmation OTP
- Filter by rating,genres
- Search by Movies
- Pagination

## Features of the Movies Listing App

- Movie Lists
- Login
- Register
- Add to watchlater
- Remove movies in watchlater
- Forgot Password
- Confirmation OTP
- Filter by rating,genres
- Search by Movies
- Pagination

## Technologies Used

- **MongoDB:** A flexible and scalable NoSQL database to store movie details and user information.

- **Express:** A fast and minimalist web application framework for handling server-side operations.

- **React:** A powerful JavaScript library for building user interfaces with reusable components.

- **Node.js:** A runtime environment for executing server-side code.

- **MVC Architecture:** The application follows the Model-View-Controller pattern to maintain a clear separation of concerns.

- **JSON Web Tokens (JWT):** For secure user authentication and authorization.

- **Nodemailer:** To send password reset emails to users for enhanced security.

- **Bcrypt:** To securely hash and store user password in the database.

- **Axios:** To handle HTTP requests and facilitate communication between the front end and backend.

- **Tailwind CSS:** Styling user interface for a clean and modern look.

- **Cloudinary:** For efficient image hosting, retrieval,and management.

- **CORS(Cross-Origin Resource Sharing):** To allow secure communication between the frontend and backend hosted on different domains.

## Screenshots

![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/6448f890-525c-48ff-82bb-1a6549efb9a9)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/c0e16292-67d3-4c73-b828-b374eb557f37)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/d6080a95-0345-49a9-8702-9d8d0f8b81ff)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/c601ae75-f022-4876-b4d5-aa999a06b71e)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/52eec25a-a567-4214-bb71-094b68cce18a)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/d30a2d30-b191-44d1-94a6-7a3703999365)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/cea7eeec-5848-4b7e-8bc5-d0e07e38fa48)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/bb38d8e0-e5a8-4701-8a05-77292ac36a0b)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/38812139-9806-497f-9347-9ff6f1ceb351)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/f54ad844-f9b5-4b1f-a59b-541e651ebe5e)
![MERN-MOVIE-APP](https://github.com/Ajith101/Movie-MERN-APP/assets/41799543/c8c2065a-6294-4dd1-8348-e5c1514ee568)

## Installation

- Clone the repository from GitHub.
- Install Node.js and MongoDB on your system if you haven't already.
- Run

```
npm install
```

in the root directory to install the required dependencies.

- Configure the MongoDB connection string in the server configuration file.
- Set up Cloudinary account and obtain necessary credentials for image hosting.
- Run

```
npm run dev
```

start to start the development server.

### In `.env` file inside server, put

```
DB_URI = mongo-uri
SECRET = your_secret
CLOUD_NAME = cloud_name
API_KEY = api_key
API_SECRET = api_secret
HOST = smtp.gmail.com
EMAIL_PORT = 587
SECURE = true
EMAIL = your mail
MAIL_PASS = mailpass
```

### In `.env` file inside client-movies-dashboard-app, put

```
VITE_BASE_URL = http://your-host.com
VITE_FILTERED_LIST = http://your-host.com/api/movies/filter
VITE_All_GENERS = http://your-host.com/api/movies/genre
VITE_LOGIN = http://your-host.com/api/user/login
VITE_REGISTER = http://your-host.com/api/user/register
VITE_FORGOT_PASSWORD = http://your-host.com/api/user/forgot-password
VITE_VERIFY_OTP = http://your-host.com/api/user/verify-otp
VITE_VERIFY_OTP = http://your-host.com/api/user/verify-otp
VITE_CHANGE_PASSWORD = http://your-host.com/api/user/change-password
```

### In `.env` file inside client-movies-listing-app, put

same as movies dashboard app
