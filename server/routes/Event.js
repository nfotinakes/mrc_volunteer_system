const express = require("express");
const router = express.Router();
const pool = require("../dbPool.js");

/**
 * Event.js handles all API calls associated with an event
 */

// Get all Event info
router.get("/", async (req, res) => {
  let sql = `SELECT * FROM event ORDER BY start`;
  let rows = await executeSQL(sql);
  res.status(200).json(rows);
});

// Create new Event
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

// Delete event by ID
router.delete("/delete/:id", async (req, res) => {
  console.log("Delete event request received");
    let id = req.params.id;
    let sql = `DELETE FROM event WHERE id = ?`;
    params = [id];
    let rows = await executeSQL(sql, params);
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
