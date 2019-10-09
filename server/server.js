const express = require("express");
const app = express();
const ctrl = require("./controller");
require("dotenv").config();
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const massive = require("massive");
const session = require("express-session");

//toplevel middleware
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 5
    }
  })
);

//endpoints
app.post("/auth/register", ctrl.register);

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);

    app.listen(SERVER_PORT, () =>
      console.log(`${SERVER_PORT} up and listening`)
    );
  })
  .catch(err =>
    console.log(err, "not connecting to db, sorry, lets fix the issue")
  );
