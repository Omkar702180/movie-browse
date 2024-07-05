Movie Application Documentation 

Design Decisions

User Interface

Login Page: Utilized a Netflix-inspired background combined with Google's login design for a familiar and visually appealing user experience.
Homepage Banner: Created a dynamic banner featuring a YouTube trailer playing in the background. Overlaid with the movie name and description, providing users with an engaging preview.
Slides for Movie Categories: Implemented multiple slides for categories such as popular movies, now playing, top-rated, and upcoming movies. This categorization helps users easily navigate and discover movies.

Features

Multiple Pages:
Home (Browse) Page: Central hub for browsing through different movie categories.
Movies Page: Dedicated page to explore all movies.
My List Page: Allows users to save and manage their favorite movies.
Movie Card Features: Each movie card includes:
Save Feature: Enables users to add movies to their personal list.
Detail Page: Provides basic details such as release year, genre, and more.
Infinite Scroll: Implemented in the movie section to allow continuous browsing without pagination.
Search and Filters: Users can search for movies and filter results based on categories. Future plans include advanced filters based on release year, rating, budget, etc.
Local Storage Management: A function to delete stored data from local storage, ensuring user data can be managed efficiently.

Future Enhancements

Detailed Trailers: Provide in-depth trailers on the detail page to help users decide if a movie is worth watching.
Subscription Links: Offer subscription links if users are interested in specific movies, enhancing the user experience and engagement.

How to Run the Application

Prerequisites
Node.js and npm installed on your machine.
Angular CLI installed globally.
Steps
Download the Project:
Go to the GitHub repository.
Click on the "Code" button and select "Download ZIP".
Extract the downloaded ZIP file.
Open the Project:
Open the extracted folder in your preferred text editor (VS Code is recommended).
Install Dependencies:
Open a terminal in VS Code.
Run npm install to install all necessary dependencies.
Run the Development Server:
After installation, run ng serve.
Navigate to http://localhost:4200/ in your browser. Ensure to use this server IP as it is included in the API configurations.

Additional Features Implemented

TV Shows: Included in the codebase for future implementation, allowing for seamless integration when the feature is ready.
Infinite Scroll and Filters: Enhances user experience by providing smooth browsing and tailored search results.
Local Storage Management: Ensures user data can be easily added and removed from local storage, providing a personalized experience.

Possible Improvements

Advanced Filtering Options: Implement filters based on additional criteria like release year, rating, budget, etc., to enhance user search capabilities.
User Reviews and Ratings: Add a feature where users can leave reviews and rate movies, providing a community-driven rating system.
Performance Optimization: Optimize the application for faster load times and smoother performance, especially for users with slower internet connections.
Responsive Design: Ensure the application is fully responsive across all devices, providing a seamless experience on both desktop and mobile.

# Movie

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
