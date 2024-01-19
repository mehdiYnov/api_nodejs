const express = require("express");
const mysql = require('mysql');
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apiYnov'
});

// Connect to MySQL
connection.connect();

// Define a route to retrieve data from the MySQL database
app.get("/wydads", (req, res) => {
  // Perform a SELECT query to retrieve data from the 'wydadinfo' table
  const query = 'SELECT * FROM wydadinfo';

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error); 
      res.status(500).send("Error retrieving data from MySQL");
    } else {
      // Send the retrieved data as a JSON response
      res.status(200).json(results);
    }
  });
});

// Close the MySQL connection when the Node.js app is closed
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
