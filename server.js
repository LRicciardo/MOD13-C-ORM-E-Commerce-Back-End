const express = require('express');
// "./routes" - the routes directory 
//      that holds all end-points
const routes = require('./routes');

// import sequelize connection
const sequelize = require("./config/connection");

// initializing the express and port number
const app = express();
const PORT = process.env.PORT || 3001;

// built-in middleware functions 
//  .json() - parses incoming requests w/ JSON payloads
//  .urlencoded() - parses incoming requests w/ URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use([path], callback, [callback])
// "using" the 
app.use(routes);

// 
// Synchronise the models to the DB 
//   Do Not force the creation 
// (Table not DROPped existing table will be deleted)
sequelize.sync({ force: false }).then(() => {
  // express() App listening on the below port
  app.listen(PORT, () => console.log(`Now listening on ${PORT} `));
});
