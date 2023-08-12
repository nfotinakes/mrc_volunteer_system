const express = require("express");
const router = express.Router();
const pool = require("../dbPool.js");

/**
 * Log.js handles all API calls associate with Volunteer Logs
 */

// Get all Log info
router.get("/", async (req, res) => {
  let sql = `SELECT l.log_id, v.first_name, v.last_name, v.email, s.site_name, s.zipcode, l.date, l.hours, l.role, l.note FROM mrc_volunteer.log as l JOIN volunteer as v ON l.volunteer_id = v.volunteer_id JOIN mrc_volunteer.site as s on l.site_id = s.site_id ORDER BY l.log_id;`;
  let rows = await executeSQL(sql);
  res.status(200).json(rows);
});

// Get single log info by Log ID
router.get("/logId", async (req, res) => {
  let id = req.query.id;
  let sql = `SELECT * FROM log WHERE log_id = ?`;
  params = [id];
  let rows = await executeSQL(sql, params);
  res.status(200).json(rows);
});

// Get all logs associated with a site ID
router.get("/siteId", async (req, res) => {
  let id = req.query.id;
  let sql = `SELECT * FROM log WHERE site_id = ?`;
  params = [id];
  let rows = await executeSQL(sql, params);
  res.status(200).json(rows);
});

// Get all logs associated with a volunteer ID
router.get("/volId", async (req, res) => {
  let id = req.query.id;
  let sql = `SELECT l.log_id, v.first_name, v.last_name, v.email, s.site_name, s.zipcode, l.date, l.hours, l.role, l.note FROM mrc_volunteer.log as l JOIN volunteer as v ON l.volunteer_id = v.volunteer_id JOIN mrc_volunteer.site as s on l.site_id = s.site_id where v.volunteer_id=?;`;
  params = [id];
  let rows = await executeSQL(sql, params);
  res.status(200).json(rows);
});

// Get a volunteers total hours
router.get("/volHours", async (req, res) => {
  let id = req.query.id;
  let sql = `SELECT SUM(hours) AS total_hours FROM mrc_volunteer.log WHERE volunteer_id=?;`;
  params = [id];
  let rows = await executeSQL(sql, params);
  res.status(200).json(rows);
});

// Get all logs by site ID and volunteer ID (not currently used)
router.get("/volId/siteId", async (req, res) => {
  let volunteerId = req.query.volid;
  let siteId = req.query.siteId;
  let sql = `SELECT * FROM log WHERE (volunteer_id = ? AND site_id = ?)`;
  params = [volunteerId, siteId];
  let rows = await executeSQL(sql, params);
  res.status(200).json(rows);
});

// Create new Log
router.post("/new", async (req, res) => {
  let volunteerId = req.body.volunteer_id;
  let siteId = req.body.site_id;
  let date = req.body.date;
  let hours = req.body.hours;
  let role = req.body.role;
  let note = req.body.note;
  let sql = `INSERT INTO log (volunteer_id, site_id, date, hours, role, note) VALUES (?,?,?,?,?,?)`;
  let params = [volunteerId, siteId, date, hours, role, note];
  console.log(params);
  let rows = executeSQL(sql, params);
  res.send("Log Added");
});

// Update Log by volunteer ID and Site ID (not currently used)
router.put("/update/:volid/:siteid", async (req, res) => {
  let volunteerId = req.params.volid;
  let siteId = req.params.siteid;
  let date = req.body.date;
  let hours = req.body.hours;
  let role = req.body.role;
  let note = req.body.note;
  let sql = `UPDATE log SET date = ?, hours = ?, role = ?, note = ? WHERE (volunteer_id = ? AND site_id = ?)`;
  let params = [date, hours, role, note, volunteerId, siteId];
  let rows = executeSQL(sql, params);
  res.send("Log Updated");
});

// Update log by Log ID
router.put("/update/:logid", async (req, res) => {
  let logId = req.params.logid;
  let date = req.body.date.split("T")[0];
  let hours = req.body.hours;
  let role = req.body.role;
  let note = req.body.note;
  let sql = `UPDATE log SET date = ?, hours = ?, role = ?, note = ? WHERE (log_id = ?)`;
  let params = [date, hours, role, note, logId];
  let rows = executeSQL(sql, params);
  res.send("Log Updated");
});

// Delete single log by ID
router.delete("/delete/:id", async (req, res) => {
  console.log("Delete log request received");
    let id = req.params.id;
    let sql = `DELETE FROM log WHERE log_id = ?`;
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
