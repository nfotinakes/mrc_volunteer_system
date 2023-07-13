const express = require("express");
const router = express.Router();
const pool = require("../dbPool.js");

// Get all Log info
router.get("/", async (req, res) => {
    let sql = `SELECT l.log_id, v.first_name, v.last_name, s.site_name, s.zipcode, l.date, l.hours, l.role, l.note FROM mrc_volunteer.log as l JOIN volunteer as v ON l.volunteer_id = v.volunteer_id JOIN mrc_volunteer.site as s on l.site_id = s.site_id;`;
    let rows = await executeSQL(sql);
    res.status(200).json(rows);
  });

// Get single log by Log ID
router.get("/logId", async (req, res) => {
    let id = req.query.id;
    let sql = `SELECT * FROM log WHERE log_id = ?`;
    params = [id];
    let rows = await executeSQL(sql, params);
    res.status(200).json(rows);
  });

// Get all logs by Volunteer ID
// router.get("/volId", async (req, res) => {
//     let id = req.query.id;
//     let sql = `SELECT * FROM log WHERE volunteer_id = ?`;
//     params = [id];
//     let rows = await executeSQL(sql, params);
//     res.status(200).json(rows);
//   });

// Get all logs by site ID
router.get("/siteId", async (req, res) => {
    let id = req.query.id;
    let sql = `SELECT * FROM log WHERE site_id = ?`;
    params = [id];
    let rows = await executeSQL(sql, params);
    res.status(200).json(rows);
  });

  // Get all logs by volunteer ID
router.get("/volId", async (req, res) => {
  let id = req.query.id;
  let sql = `SELECT l.log_id, v.first_name, v.last_name, s.site_name, s.zipcode, l.date, l.hours, l.role, l.note FROM mrc_volunteer.log as l JOIN volunteer as v ON l.volunteer_id = v.volunteer_id JOIN mrc_volunteer.site as s on l.site_id = s.site_id where v.volunteer_id=?;`;
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

// Get all log by site ID and volunteer ID
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

    // Update Site
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
async function executeSQL(sql, params) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, params, function (err, rows, fields) {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

module.exports = router;