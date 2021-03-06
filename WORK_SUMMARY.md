# Work summary
A brief overview of the work done for this assignment so far.

### Process
Procedure
1. Define the problem
2. Define solution requirements
3. Conduct market research
4. Reevaluate solution requirements
5. Come up with UI/UX design
6. Write test cases (TDD)
7. Implement
8. Iterate and improve

### Accomplishments
1. Created a git repo
2. Setup simple project workspace with yarn from scratch. This entire project so far is from scratch. I may regret how I spent  my time, but I know what I am doing!
3. Created a front end build process and setup configurations using Webpack, Babel, Sass, Docker, and Eslint
4. Created a basic React "Hello world" application to verify build process
5. Set up Jest and Enzyme to ensure that I could test my components later on and even begin doing some basic TDD
6. Conducted market research for a design system and chose Material UI for popularity, community support, and ease of use. Time to market was the main driving force behind using a design system.
7. Included Material UI as a dependency of this project and created a simple UI shell to work with
8. Started to jot down some initial ideas of features that I could implement.
9. Completed some basic TDD
10. Updated navigational components of the UI shell to reflect initial ideas. Included react-router-dom package to support hash routing
11. Included GraphiQL to make traversing api easier with introspection. It was very  easy to framiliarize myself with the api because of this. It also makes testing queries easy.
12. Created my first component to display GraphQL data. The component displays countries in a table along with their emoji's. It handles errors and loading states appropriately.
13. Created a random country page that chooses a random country and navigates the user after a given number of seconds.
14. Mocked out local storage for tests.
15. Create lists for continents and languages
16. Start working on a random page navigation component that will help users discover new locations or languages
17. Add navigationto to details pages from list views
17. Make initial detail views for continents, countries, and languages
18. Develop a reusable component for graphql errors
19. Develop a reusable component for common links
20. Create a simple home page and links for navigation
21. Develop a reuseable component for main app navigation lists
22. Create the base page for favorites
23. Handle cases where codes might not exist for detail views
24. Allow favoriting items from lists and detail views
25. Update ui shell for eassier navigation
26. Allow users to clear user data
27. Update design for list views
28. Finish design and implementation of favorites views
29. Finish design and implementation of random page
30. Cleanup pages for detail views
31. Incorporate cesium into the home page
32. Create a shared component for testing purposes. This component mocks GraphQL requests and handles favorites manipulation
33. Cleaned up Apollo error handling by moving logging logic to client's link chain
34. Refined test suite.
35. Add filtering to list views.
36. Add inifinite scrolling to list views to reduce initial rendering time from loading long lists
37. Add a production ready webpack file with plugins for analyzing bundle size
38. Move virtual world tour to its own page. 
39. Turn home page into product description page
40. Setup project to use automated deployment intgrations with Hostinger

### TODO
- Rearrange CSS import order so my CSS definitions are higher priority than Materil UI. Remove use of "!important"
- Update tests to make better use of bem functions for component names
- Setup Gitlab CI pipeline for running tests and linting on push to master
