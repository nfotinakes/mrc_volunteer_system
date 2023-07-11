const express = require("express");
const router = express.Router();
const pool = require("../dbPool.js");

// Get all Event info
router.get("/", async (req, res) => {
    let sql = `SELECT * FROM event`;
    let rows = await executeSQL(sql);
    res.status(200).json(rows);
  });


async function executeSQL(sql, params) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, params, function (err, rows, fields) {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

module.exports = router;