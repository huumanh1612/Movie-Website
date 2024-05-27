const express = require("express");
const path = require ("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

dotenv.config({path : './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Configure session store
const sessionStore = new MySQLStore({}, db);

// Use session middleware
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));
  
const publicDirectory = path.join(__dirname, './assets');
app.use(express.static(publicDirectory));



//Parse URL-encoded bodies (HTML forms)
app.use(express.urlencoded({ extended: false}));
//Parse URL-encoded bodies (API clients)
app.use(express.json())


app.set('view engine', 'hbs');

db.connect( (error)=>{
    if(error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})

//Define routes
app.use("/", require('./routes/pages'));;
app.use("/auth", require("./routes/auth"));

app.listen(5001,()=>{
    console.log("Server started on Port 5001");
});