# Introduction

<code style="color : hotpink">*VibeFusion*</code> is a personalised web application designed to track and create an appealing visual representation of a users’ Spotify listening habits over time. The aim of the application is to provide a continuous and detailed insight into the users’ musical preferences, extending beyond the annual summary offered by Spotify Wrapped.
![image of Spotify Wrapped example](./images/spotifyw.png)
By utilising the Spotify API, the app will deliver personalised statistics on top artists, albums, songs and genres for various different time frames. Unlike standard music tracking apps, TuneTracker's DJ feature offers detailed insights into musical elements like BPM, key, energy, and danceability. This level of detail is particularly valuable for users interested in the nuances of music mixing and curation.This feature uses data from the 'Summary Stats'/’DJ Page’ section on the homepage to influence the playlist. By integrating with the Spotify API, our app provides personalised insights into users' favourite artists, top 3 genres, favourite BPM, musical key, and crowd pleasers, among other metrics.


By creating a roadmap for the project, it enables the group to work efficiently by creating expectations and deadlines for the group to adhere to. To keep the project flowing at a pace to produce the desired results and to ensure that the roadmap is evolving with our advancements.

## Project Roadmap:

![image of Spotify Wrapped example](./images/road-map.png)

#### Week 1: Planning (July 22nd - July 28th)

July 22nd - July 26th:

- Create a Figma board to brainstorm potential project ideas
- Finalise project idea
- Identify key features of the app
  Outcome(s): Clearly defined project goals and features ready to be documented.

#### Week 2: Design (July 29th - August 4th)

- Create a Trello board & shared Google Drive to store key project documents and tasks
- Create a GitHub repo - establish rules on branches/reviewers/pull requests
  Finalise the project roadmap
- Create individual Spotify accounts (if not already using) in order to test the app functionalities
- Create wireframes & UI mockups for the app using Figma
- Establish necessary libraries/packages
  Confirm name of the application with the group
- Create an outline of the project, detailing its scope, features, tech stack, and user requirements. Submit to Isslem (Deadline: Friday 2nd August, 23:59 BST)
  
  
  Outcome(s): Assignment completed and submitted for feedback. Final design ready for the development phase

#### Week 3 & 4: Core Development (August 5th - August 18th)

- Logo to be created
- Build components for user authentication and basic data display (initial information fetched from Spotify)
- Start implementing the Spotify API integration to retrieve user data and statistics.
- Complete additional features (most streamed songs, albums, artists)
- Create dynamic charts and visualisations for the app (Chart.js / D3.js / TextRazor).
- Start utilising the users data to produce a personalised playlist
- Begin creating the user profile page
- Revise testing and share helpful resources with the group - identified as a weakness for most


Outcome(s): User authentication and basic data fetching functionalities implemented. Core features and visualisations completed and working.

#### Week 5: Testing, Feedback & Submission (August 19th - August 25th)

- Conduct thorough unit testing and integration testing
- Perform UAT testing & gather feedback to ensure the app is useable and meets the assignment criteria
- Implement feedback from UAT & finalise any outstanding app features
- Submit the app to Isslem (Deadline: Sunday 25th August 2024, 23:59 BST).
Outcome(s): Bugs identified and fixed. Feedback collected to amend the app. Final project submitted to Isslem for marking.

#### Week 6: Presentations (August 25th - August 25th)

- Create presentation materials - Google Slides, a demonstration of the app, bullet pointed speeches (each individual has a 50-second speaking slot).
- Present the completed app (and any extension work if not completed) to the group on **August 30th.**
  
  
  Outcome(s): Successful project delivery and demonstration.

#### Other Considerations

- **Regular Check-ins:** Daily stand-ups scheduled (16:30 BST) to communicate progress/challenges. To be attended by one member of each group (Shanice/Morgan, Laila/Zuzanna, Moge/Mehtap). One weekly meeting to be attended by all members (Monday, 16:30 BST).
- **README file:** A README file to be created to provide users with clear instructions on how to use the app. The group will continuously update this document as the project evolves.

#### Background

Users will log in securely through Spotify's OAuth 2.0 system, allowing access to their streaming data. They will have a user profile that shows their username and profile picture, and a separate page displaying their top artists, albums, and songs from the last 30 days, 6 months, & year. We also plan to make the user profile customisable, allowing users to select colour themes.


A key feature of the app is the ability to generate personalised DJ style playlists. Users will see detailed statistics, including bpm, energy level, and genre, along with "crowd pleaser" songs tracks. The app will also offer remix suggestions for popular songs and create DJ set playlists that increase in tempo and energy.


Additionally, the app will sort music by musical key to help match songs together for DJ sets. A digging tool will provide song recommendations based on the user’s preferences.


The app will analyse song lyrics to reveal emotional themes using TextRazor or Aylien. The frontend will be built using React for a user-friendly design, while the backend will manage API interactions and user authentication securely.


Overall, our goal is to create a fun and engaging platform where users can delve deeper into their music taste and enjoy personalised DJ playlist experiences.

## Specifications and design

#### MVP:

![image of project MVP](./images/mvp.png)

### Screenshots of wireframes

- Landing page
  ![wireframe landin page](./images/landin-page.png)

- Log In/ Sign up
  ![wireframe login](./images/login-page.png)

- Dashboard
  ![wireframe login](./images/Dashboard-page.png)

- Playlist page
  ![wireframe login](./images/playlist-page.png)

- Stats page in detail
  ![wireframe login](./images/stats-page.png)

- Contact us page
  ![wireframe login](./images/contactus.png)

- Design choice
  ![Design inspo](./images/design-inspo.png)

# Implementation and execution

## Development approach and team member roles

### Team Structure and roles

#### Frontend Developers

- Build the user interface using HTML, CSS, and JavaScript and React Bootstrap
- Develop user profiles and customization features
- Create pages for displaying top artists, albums, and songs.
- Implement the friend comparison feature.
- Ensure responsive design and cross-browser compatibility.

#### Backend Developers

- Set up the server using Node.js and Express.
- Handle user authentication via Spotify's OAuth 2.0.
- Create and manage API endpoints for frontend interaction.
- Design and maintain the MySQL database for storing user data and statistics
- Implement a secure user authentication
- Develop endpoints for fetching Spotify data and processing it.
- Ensure data integrity and security
- Handle API rate limits

## Branching Strategy

To maintain a clean and manageable codebase, we adopted a branching strategy using Git. This approach ensured that all development work was properly isolated and reviewed before being merged into the main branch.

**Frontend (FE) Branch**: Dedicated to frontend development. All UI-related changes, React components, and styling updates were committed to this branch.

**Backend (BE) Branch**: Focused on backend development. This included setting up the server, API routes, database interactions, and authentication logic.

# Tools and libraries

## Frontend
- **HTML and CSS**: For structuring and styling the web app
- **JavaScript, React and React Bootstrap**: For interactivity and responsive components

## Backend
- **Node.js**: To execute JavaScript on the server side.
- **Express**: To build RESTful APIs
- **MySQL**: to store user data, including Spotify statistics and profile details.
- **Axios**: HTTP client for making API requests to the Spotify Web API.
- **dotenv**: Used for managing environment variables securely.
- **Spotify Web API**: For fetching data about users' listening habits.
- **OAuth 2.0**: user authentication and authorization through Spotify.

## Libraries
- **Authlib**: for authentication
- **React**: JS Library
- **React-Bootstrap**
- **Material UI**
- **Chart.js**
- **D3.js**
- **Nivo rocks**

## Deployment Tools
- **Netlify or Heroku**

## Development Tools
- **Git and GitHub**: For version control
- **Visual Studio Code**: Code editor


## Implementation process (achievements, challenges, decision to change something)

### Challenges

- **Data Synchronisation**: Displaying data in real-time or near-real-time.
- **Security**: Ensuring user data is stored and handled securely.
- **Data allocation**: Allocating resources accordingly to handle varying demands, for instance in case of heavy traffic
- **Version Control**: Working as a group can lead to code conflicts when multiple team members try to make changes simultaneously.

## Agile development (did team use any agile elements like iterative approach, refactoring, code reviews)

- **Sprint Planning**: Sprints with specific goals, followed by sprint reviews.
- **Daily Stand-ups**: Short daily meetings to discuss progress and challenges
- **Iterative Development**: Continuous development and integration
- **Code Reviews**: Conducted regularly to maintain code quality

## Implementation challenges

- **Managing large amounts of data**
- **Web app** should be consistent across different browsers and devices.

# Testing and Evaluation

## Testing Strategy:

- **Unit Testing**: Test individual components and functions for expected behaviour.
- **Integration Testing**: Ensure smooth interaction between frontend and backend components.
- **End-to-End Testing**: Simulate user interactions to test the entire application flow.

## Functional and User Testing:

- **Functional Testing**: Verify that all features work as intended, including data visualisation, collage creation, and profile management.
- **User Testing**: Gather feedback from beta testers (us) to identify usability issues and areas for improvement.

# Conclusion

## Summary

To summarise, VibeFusion stands out as a personalised web application that offers users a dynamic and detailed look into their Spotify listening habits. By utilising the Spotify API, VibeFusion goes beyond the annual Spotify Wrapped summary, providing continuous insights into unique sets of statistics.

The unique feature of VibeFusion is its DJ feature, which delves into the intricacies of musical elements like BPM, key, energy, and danceability. This level of detail caters to users who are passionate about curating their own playlists. By utilising data from the 'Summary Stats'/'DJ Page' on the homepage, VibeFusion tracks listening habits and also creates tailored playlists that reflect users' unique musical tastes.

Overall, VibeFusion aims to enhance the music listening experience by offering a fun, engaging, and in-depth platform for users to explore and enjoy their music preferences.

## Future Work/Improvements

If time permits, the group aims to incorporate additional features to the web application. To enhance user customisation, the application will offer a dark mode setting on each page. Additionally, users will be able to compare and share their statistics with friends who also have Spotify accounts. This feature will allow users to compare their statistics and generate comparisons between the two. In addition, users will have the ability to share their personalised playlists, enabling others to listen to them as well.