const express = require('express');
const mysql = require('mysql2');
const app = express();

// This allows the server to read your HTML form data
app.use(express.urlencoded({ extended: true }));
// This tells the server to look for your HTML files in the same folder
app.use(express.static(__dirname)); 

// 1. Establish MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',            
    password: 'password', // <--- MAKE SURE THIS MATCHES YOUR MYSQL PASSWORD
    database: 'login_system'        
});

// Connect to the Database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL database!');
});

// 2. Handle Login Form Submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Database error");
            return;
        }

        if (results.length > 0) {
            res.send("<h2>Login Successful! Welcome, " + username + "</h2>");
        } else {
            res.send("<h2>Invalid username or password.</h2>");
        }
    });
});

// 3. Handle Basic Registration (Username / Password)
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Error inserting user:", err);
            res.status(500).send("<h2>Error creating account.</h2>");
            return;
        }
        res.send("<h2>Registration Successful! Welcome, " + username + ". <a href='/'>Click here to login</a>.</h2>");
    });
});

// 4. Handle Student Registration Portal (Name, Email, Dept, Semester)
app.post('/register-student', (req, res) => {
    const { fullName, email, department, semester } = req.body;
    
    const sql = "INSERT INTO students (full_name, email, department, semester) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [fullName, email, department, semester], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("<h2>Error saving student data.</h2>");
        }
        res.send("<h2>Student Registered Successfully! Check MySQL Workbench.</h2>");
    });
});

// 5. Start server (Always keep this at the very bottom!)
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});