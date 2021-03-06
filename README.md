# TravelApp
Planet Planner is a front end application that helps users plan trips to other continents, countries, and states. Easily navigate our travel API using traditional routing to show different pages for list and detail views. Learn more about the places you want to go with the world's #1 travel site! Did I mention this service is free?!?

### World tour
Take a world tour from our app's home page. We use Cesium and up-to-date geojson files so you can travel the world from the comfort of your own chair. Interact with this 3d model of Earth and its many countries. View country borders all across the globe, search for places to find them quickly, or click around the map for more detailed views.

### Favoriting
While you explore, make sure to favorite the places you want to visit most. Manage your choices from the favorites tab which you can find under the utilities section of the main navigation. Like and unlike your data from the detail pages. No worries if you leave the site or even close your browser. Your favorites will still be here when you come back. We will persist this data in your browser using LocalStorage. Our solution is to use a context provider and custom hooks to manage the state of your favorites. This way we can keep all of the complicated business logic in a single location while also easily being able to provide methods for managing favorites to deeply nested components using context. Keeping your favorites in a sinlge location ensures that your data is consistent across our product.

### Randomness
Are you more of a free spirit? Do you not like being held back by concrete plans? Why not try something new and exciting? Use our randomness utility to navigate to a random page on our application. Explore more freely by not having the pressure of choosing your next vacation. Let us do it for you!

### GraphiQL 
Are you more of a techinical user? Do you have a background with GraphQL development? Then maybe our GraphQL playground is just right for you! Get the data you need from our API with the customization you deserve. From the GraphiQL tab, you can use our API directly. We have enabled introspection so users can discover more details about the data we have to offer. Our API has no mutations and no sensitive data which means bad actors can't cause harm by exposing this information. Use this feature as you wish!

## Technologies
- Webpack
- Babel
- Docker
- React v17
- Apollo Client
- GraphQL
- GraphiQL
- Cesium
- Sass
- ESLint
- Jest
- Enzyme
- Material UI

## Commands
- `yarn install` installs all dependencies
- `yarn start` uses webpack to serve content at `http://localhost:8080/`
- `yarn build` uses webpack to build content distributables`
- `yarn deploy` builds and copies distrubtable to correct location for updating prod
- `bundle-report` learn more info about the distributable file contents
- `yarn test` runs our testing suite using Jest and Enzyme
- `yarn lint-fix` runs ESLint against all js and jsx files

## Building and running the docker image
Built using Docker v20.10.2

####  1. build the image
`docker build -t travel-app:dev .`
####  2. verify image creation
`docker image ls`
####  3. run the image in a container
```
docker run -it --rm \
  -v ${PWD}:/app \
  -v /app/node_modules \
  -p 8080:8080 \
  -e CHOKIDAR_USEPOLLING=true \
  travel-app:dev
```
####  4. Visit the url in a browser
- http://0.0.0.0:8080/
- http://localhost:8080/
