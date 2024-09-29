# Moviebox Streaming Web App

Welcome to the **Moviebox Streaming Web App**! This project is a movie streaming platform created using the TMDB API, React, TypeScript, and Firebase, featuring user authentication and an intuitive, pure CSS design inspired by the [Figma Moviebox Design](https://www.figma.com/community/file/1030753090086308330/moviebox).

## 🔗 Live Demo

[Click here to view the app in action](https://movie-box-fa99a.firebaseapp.com/)

## 🛠 Features

- **Firebase Authentication**: Email/password authentication with support for password resets via email.
- **Movie Data**: Fetches and displays movies, genres, and TV shows using the TMDB API.
- **UI**: Custom CSS inspired by the Moviebox Figma design for a clean and responsive user interface.
- **Secure**: User sessions are secured with Firebase Auth.
- **Search Functionality**: Search for your favorite movies and TV shows using the TMDB search.
- **Saving movie Functionality**: You can save any prefered movie and come back to it later

## ⚙️ Technologies Used

- **React**: Frontend JavaScript library for building the user interface.
- **TypeScript**: Type-safe JavaScript, ensuring code reliability and maintainability.
- **Firebase**: Used for authentication (email/password) and hosting.
- **TMDB API**: Provides movie and TV show data (descriptions, genres, images).
- **CSS**: Pure CSS for styling, no external libraries used.

## 🚀 Getting Started

### Prerequisites

- **Node.js** installed on your machine.
- A **Firebase account** for the backend services.
- TMDB API **access key** (you can sign up [here](https://www.themoviedb.org/documentation/api)).
- **NB** you can run the app using docker if you want.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/eltaeif-houssem/moviebox.git
   ```

2. **Install dependencies**:

- cd moviebox
- yarn install

3. **Configure Firebase**:

- Create a new Firebase project in the Firebase console.
- Enable Email/Password Authentication.
- Copy your Firebase config details and add them to your .env file from the example.env:

4. **TMDB API Key**:

- Sign up at TMDB and get an API key.
- Add the API key to you .env file

4. **Run the app**:

- yarn run dev & the app will start running locally on http://localhost:3000.

### Contact

If you have any questions, feel free to reach out:

- Eltaeif Houssem
- Email: eltaeif.houssem@gmail.com
- Linkedin: https://www.linkedin.com/in/eltaeif-houssem

You can copy this code into your `README.md` file and customize it where necessary (e.g., adding your GitHub username, live demo link, etc.). Let me know if you need further tweaks!
