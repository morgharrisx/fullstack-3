# 🎵 VibeFusion: Music Analytics & Recommendations Platform 🎧

🎶 VibeFusion is a React-based music analytics and recommendation platform that connects to the Spotify API to provide users with detailed insights into their listening habits, smart music recommendations, and personalized DJ tools. 

## Features

- **Discover Your Music DNA**: Analyze your top tracks, favorite artists, preferred genres, and even the musical keys and moods that dominate your playlists.
- **Smart Recommendations**: Get music suggestions tailored to your tastes using VibeFusion's intelligent algorithm.
- **DJ Hub**: Create customized playlists based on your preferences such as genre, mood, tempo, popularity, and more.
- **Detailed Stats**: Dive deeper into your listening habits with visual representations of your favorite genres, tracks, artists, and other metrics like BPM and mood.

## Project Structure
- **Frontend**: The frontend is developed using React. The project leverages React Bootstrap, which integrates Bootstrap components seamlessly with React. The application also utilizes Recharts for creating dynamic and customizable data visualizations, and AOS (Animate On Scroll) to add smooth animations as elements enter the viewport. This combination results in a responsive, interactive, and visually engaging user experience.

- **Backend**: The backend is built with Express.js, handling API requests, user sessions, and interactions with the Spotify API. It uses the `spotify-web-api-node` wrapper to simplify communication with Spotify's services. Additionally, `axios` is employed for making HTTP requests, while `cors` ensures that the frontend and backend can communicate seamlessly across different domains. 


## Setup

### Prerequisites

- Node.js (v14+ recommended)
- Dotenv file which contains the `clientId`, `clientSecret`, and `redirectUri`.

### Frontend Setup

1. **Install dependencies**: Navigate to the `/frontend` directory and install the necessary dependencies.

   ```bash
   npm install

### Backend Setup

1. **Install dependencies**: Navigate to the`/backend` directory and install the necessary dependencies.

   ```bash
   npm install
   

2. **Environment Variables**:
   Create a `.env` file in the `api/` directory and add the following variables:

   ```env
   CLIENT_ID=your_spotify_client_id
   CLIENT_SECRET=your_spotify_client_secret
   REDIRECT_URI=http://localhost:5001/callback

### Running the Application

Once both the frontend and backend are set up, you can run the application with the following steps:

1. **Starting the Frontend**:
   - Navigate to the `/frontend` directory directory of the project.
   - Start the React development server by running:
     ```bash
     npm start
     ```
   - The frontend should be accessible in your browser at `http://localhost:3000`.

2. ### Starting the Backend

   - Navigate to the `/backend` directory where the backend code resides.
   - The backend uses `nodemon` for automatic server restarts whenever file changes are detected. The `start` script in the `package.json` is configured to use `nodemon`. To start the server, simply run:
     ```bash
     npm start
     ```
   - The backend should be running on `http://localhost:5001`.

3. **Using the Application**:
   - Open `http://localhost:3000` in your web browser to access the VibeFusion platform.
   - The frontend interacts with the backend to authenticate users via Spotify, fetch music data, and display personalized recommendations and stats.


### Spotify API Endpoints
The backend server provides several API endpoints for interacting with Spotify's services:

#### Authentication & User Info
- **`GET /login`**
  - Initiates Spotify OAuth flow for user authentication.
- **`GET /callback`**
  - Handles the OAuth callback from Spotify after user authentication and exchanges the authorization code for access and refresh tokens.
- **`GET /me`**
  - Retrieves basic information about the authenticated user.

#### Tracks & Artists
- **`GET /top-tracks`**
  - Retrieves the user's top tracks. Accepts an optional query parameter `term` (`short_term`, `medium_term`, `long_term`) to specify the time range.
- **`GET /top-artists`**
  - Retrieves the user's top artists. Accepts an optional query parameter `term` (`short_term`, `medium_term`, `long_term`) to specify the time range.
- **`GET /search`**
  - Searches for tracks based on a query parameter `q` (the search term).
- **`GET /detailed-stats`**
  - Retrieves detailed statistics for the user's top 20 tracks, including tempo, key, and other audio features.

#### Recommendations
- **`POST /dj`** Generates song recommendations based on user-selected criteria such as genre, mood, tempo, popularity, and danceability.
- **`GET /recommendations`**
  - Fetches song recommendations based on the user's top tracks and artists.

#### Playlists
- **`POST /create-playlist`**
  - Creates a new playlist in the user's Spotify account with a given set of track URIs.

#### Genres
- **`GET /top-genres`**
  - Retrieves the user's top genres based on their listening habits.

#### Features & Analytics
- **`GET /danceability`**
  - Finds and returns the most danceable track from the user's top tracks.
- **`GET /mood`**
  - Calculates and returns the average mood (valence) of the user's top tracks.

### Additional Notes
- **Authentication**: The app requires users to authenticate with their Spotify account. Upon successful authentication, users can access personalized features like top tracks, top artists, and smart recommendations.
- **Rate Limiting**: Spotify's API has rate limits. The application includes error handling for situations where these limits are exceeded, prompting users to retry after a specified time.

## Packages Used in VibeFusion

### Frontend Packages

1. **React** (`react`, `react-dom`, `react-scripts`)

2. **React Router DOM** (`react-router-dom`)
  
3. **React Bootstrap** (`react-bootstrap`)

4. **Bootstrap** (`bootstrap`)
 
5. **Recharts** (`recharts`)

6. **AOS (Animate On Scroll)** (`aos`)
 
7. **Axios** (`axios`)
  
### Backend Packages

1. **Express** (`express`)
  
2. **Spotify Web API Node** (`spotify-web-api-node`)
   
3. **dotenv** (`dotenv`)
  
4. **CORS** (`cors`)

5. **Axios** (`axios`)
   
### Development and Build Tools

1. **Nodemon** (`nodemon`)

### Images
## TODO: We can add screenshots here but the Navbar is not merged yet so we can do it later


## Contributing

Contributions to VibeFusion are welcome! If you have suggestions for new features or improvements, feel free to fork the repository and submit a pull request. Please make sure your code adheres to the project's coding standards.

   
