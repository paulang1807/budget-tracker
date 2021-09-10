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

### Production Build
- To create production build, run `npm run build` from the client folder.
- To run the server, run `npm run start` (the script that starts the node server as configured in the server package json )
  
### Mongo DB Connections
- Atlas: `mongodb+srv://<username>:<password>@<cluster_name>.pqac7.mongodb.net/<database_name>?retryWrites=true&w=majority`
- Local: `mongodb://<user_name>:<password>@0.0.0.0:32768/<database_to_connect>?authSource=<database_name_for_auth>&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`