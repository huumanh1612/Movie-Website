const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req, res) => {
    console.log(req.body);

    const {name, email, password, passwordConfirm} = req.body;
    const passwordRegex = /^\S{8,}$/;

    // Check if the password meets the requirements
    if (!passwordRegex.test(password)) {
        return res.render("register", {
            message: "Password must contain no spaces, and at least 8 characters long."
        });
    }



    db.query('SELECT * FROM users WHERE name = ? or email = ?', [name, email], async (error, results) => {
        if (error) {
            console.log(error);
        }
    
        if (results.length > 0) {
            const existingEmail = results.find(result => result.email == email);
            const existingUsername = results.find(result => result.name == name);
    
            if (existingEmail) {
                return res.render("register", {
                    message: "That email is already in use"
                });
            } else if (existingUsername) {
                return res.render("register", {
                    message: "That username is already in use"
                });
            }
        } else if (password !== passwordConfirm) {
            return res.render("register", {
                message: "Passwords do not match"
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query("INSERT INTO users SET ?", { name: name, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render("register", {
                    message: "User registered"
                });
            }
        });
        //success register
        res.redirect("/login");
    });
};

exports.login = async (req, res) => {
    console.log(req.body);

    const { name, password } = req.body;

    db.query('SELECT * FROM users WHERE name = ?', [name], async (error, results) => {
        if (error) {
            console.log(error);
            // Send an error response to the client
            return res.status(500).send("Internal server error");
        }
       
        if (!results.length) {
            return res.render("login", {
                message: "User does not exist"
            });
        }

        if (!await bcrypt.compareSync(password, results[0].password)) {
            return res.render("login", {
                message: "Incorrect password"
            });
        }
    

        // Redirect the user to the homepage upon successful login
        res.redirect("/homepage");
    });
};
