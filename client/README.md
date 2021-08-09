# budget-tracker
### Commands to start building the back end
- `npm init` 
- Dependencies: `npm install express dotenv mongoose colors morgan`
  - dotenv - for global variables. Use `process.env.<variable_name>` to access the variables.
  - mongoose - object data map; layer to interact with the database
  - colors - module to have color text in the console
  - morgan - logger
  - axios - integrate back end with front end
- Dev dependencies: `npm install -D nodemon concurrently`
    - nodemon - allows running the server continuously without having to restart it
    - concurrently - allows running the back end server on a port (5000) and the react dev server on a different port (3000) at the same time with a single npm script

### Scripts in package json
- Can be run using `npm run`