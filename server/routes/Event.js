const express = require("express");
const router = express.Router();
const pool = require("../dbPool.js");

// Get all Event info
router.get("/", async (req, res) => {
    let sql = `SELECT * FROM event ORDER BY start`;
    let rows = await executeSQL(sql);
    res.status(200).json(rows);
  });

    // Create new Log
router.post("/new", async (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  let start = req.body.start;
  let end = req.body.end;
  let note = req.body.note;
  let sql = `INSERT INTO event (id, title, start, end, note) VALUES (?,?,?,?,?)`;
  let params = [id, title, start, end, note];
  console.log(params);
  let rows = executeSQL(sql, params);
  res.send("Event Added");
});

// Delete event by
router.delete("/delete/:id", async (req, res) => {
  console.log("Delete request received");
  try {
    let id = req.params.id;
    let sql = `DELETE FROM event WHERE id = ?`;
    params = [id];
    let rows = await executeSQL(sql, params);
    res.status(200).json(rows);
  } catch (err) {
    console.log("Error deleting event: " + err);
  }
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