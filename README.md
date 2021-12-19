# TravelApp
A front end app to help users plan trips to other countries

## Technologies
- Webpack
- Babel
- Docker
- React v17
- GraphQL
- GraphiQL
- Sass
- Jest
- Enzyme
- Material UI

## Commands
- `yarn install` installs all dependencies
- `yarn start` uses webpack to serve content at `http://localhost:8080/`
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
