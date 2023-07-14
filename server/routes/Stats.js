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
router.get("/licenseCount", async (req, res) => {
    let id = req.query.id;
    let sql = `SELECT COUNT(licensure) as total, licensure FROM volunteer GROUP BY licensure;`;
    params = [id];
    let rows = await executeSQL(sql, params);
    res.status(200).json(rows);
  });

  router.get("/totalHours", async (req, res) => {
    let id = req.query.id;
    let sql = `SELECT SUM(hours) as total_hours FROM mrc_volunteer.log;`;
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