const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


// Function to create an admin
const createAdmin = async (adminName, adminEmail, adminPassword, adminRole) => {
    try {
        // Hash the admin password
        const hashedPassword = await bcrypt.hash(adminPassword, 8);

        // Insert the admin into the database with the admin role
        db.query("INSERT INTO users SET ?", { name: adminName, email: adminEmail, password: hashedPassword, role: adminRole }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Admin created:", results);
            }
            // Close the database connection
            // db.end();
        });
    } catch (error) {
        console.log(error);
    }
};

// Call the function with admin details
// createAdmin("admin1", "admin1@example.com", "adminpassword", "admin");
// createAdmin("admin2", "admin2@example.com", "adminpassword", "admin");
// createAdmin("admin3", "admin4@example.com", "adminpassword", "admin");