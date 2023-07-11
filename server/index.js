const express = require('express');
const app = express();
const pool = require("./dbPool.js");
const bParse = require('body-parser');
const cors = require('cors');
const volunteerRoute = require('./routes/Volunteer');
const siteRoute = require('./routes/Site');
const logRoute = require('./routes/Log');
const eventRoute = require('./routes/Event');

app.use(express.json());
app.use(bParse.json());
app.use(bParse.urlencoded({extended: false}));
app.use(cors());

//Default Start check
app.get('/', (req, res) => {
    res.send('Startup Check!');
});

// Volunteer routes
app.use('/volunteer', volunteerRoute);

//Site routes
app.use('/site', siteRoute);

//Log routes
app.use('/log', logRoute);

//Event routes
app.use('/event', eventRoute);

// Test route
app.get("/dbTest", async (req, res) => {
    let sql = "SELECT CURDATE()";
    let rows = await executeSQL(sql);
    res.send(rows);
   });

// Excecute SQL Query
async function executeSQL(sql, params){
    return new Promise (function (resolve, reject) {
      pool.query(sql, params, function (err, rows, fields) {
        if (err) throw err;
        resolve(rows);
      });
    });
   }

// Start Server
app.listen(5000, "127.0.0.1", () => {
    console.log('server started');
});   