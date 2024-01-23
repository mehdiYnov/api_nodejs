require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
});

// Define a route to retrieve data from the MySQL database
app.get("/wydads", (req, res) => {
  // Perform a SELECT query to retrieve data from the 'wydadinfo' table
  const query = "SELECT * FROM wydadinfo";

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



app.get("/wydads/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM wydadinfo WHERE id = " + id;

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



app.delete("/wydads/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const query = "delete FROM wydadinfo WHERE id = " + id;

  connection.query(query, (error, results, fields) => {
    if (!error) {
      // Send the retrieved data as a JSON response
      // res.status(200).json(results);
      res.status(200).send("You was Drop the line " + id + " from your database");
    } else {
      console.error(error);
      res.status(500).send("Error retrieving data from MySQL");
    }
  });
});


app.post("/wydads/:id", (req, res) => {
  const id = parseInt(req.params.id);
  
  // Check if the record with the specified ID exists
  const checkQuery = "SELECT * FROM wydadinfo WHERE id =" + id;
  connection.query(checkQuery, (error, results, fields) => {
    if (results.length === 0) {
      return res.status(404).json({ error: 'Wydad not found' });
    }

    // Update the record
    const updateQuery = "UPDATE wydadinfo SET matr = ?, date = ? WHERE id = ?";
    const values = [req.body.matr, req.body.date, id];

    connection.query(updateQuery, values, (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error updating data in MySQL");
      }

      res.status(201).send("You have updated the line " + id + " in your database");
    });
  });
});




pool.getConnection((err, conn) => {
  if (err) console.log(err);
  console.log("Connected successfully");
});

const PORT = process.env.PORT || "3306";
app.listen(PORT, () => {
  console.log("looool");
});
module.exports = pool.promise();