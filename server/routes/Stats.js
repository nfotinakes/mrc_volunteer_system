const express = require("express");
const router = express.Router();
const pool = require("../dbPool.js");

/**
 * Stats.js handles API calls associated with the MRC Dashboard
 * for analytical widgets
 */

// Get all Log info (not currently used)
router.get("/", async (req, res) => {
    let sql = `SELECT l.log_id, v.first_name, v.last_name, s.site_name, s.zipcode, l.date, l.hours, l.role, l.note FROM mrc_volunteer.log as l JOIN volunteer as v ON l.volunteer_id = v.volunteer_id JOIN mrc_volunteer.site as s on l.site_id = s.site_id;`;
    let rows = await executeSQL(sql);
    res.status(200).json(rows);
  });

// Get licensure counts
router.get("/licenseCount", async (req, res) => {
    let id = req.query.id;
    let sql = `SELECT COUNT(licensure) as Total, licensure FROM volunteer GROUP BY licensure;`;
    let params = [id];
    let rows = await executeSQL(sql, params);
    res.status(200).json(rows);
  });

  // Get total hours volunteered in system
  router.get("/totalHours", async (req, res) => {
    let id = req.query.id;
    let sql = `SELECT SUM(hours) as total_hours FROM mrc_volunteer.log;`;
    let params = [id];
    let rows = await executeSQL(sql, params);
    res.status(200).json(rows);
  });

  // Get 6 most recent volunteers added
  router.get("/recentVolunteers", async (req, res) => {
    let sql = `SELECT volunteer_id, first_name, last_name, input_date FROM volunteer ORDER BY input_date DESC LIMIT 6;`;
    let rows = await executeSQL(sql);
    res.status(200).json(rows);
  });

  // Get 6 top volunteers by total hours
  router.get("/topHours", async (req, res) => {
    let sql = `SELECT v.volunteer_id, v.first_name, v.last_name, SUM(hours) AS total_hours, COUNT(l.volunteer_id) AS total_logs FROM mrc_volunteer.log AS l JOIN mrc_volunteer.volunteer AS v ON l.volunteer_id = v.volunteer_id GROUP BY v.volunteer_id ORDER BY total_hours DESC LIMIT 6;`;
    let rows = await executeSQL(sql);
    res.status(200).json(rows);
  });

  // Get total count of volunteers in system
  router.get("/volunteerCount", async (req, res) => {
    let sql = `SELECT COUNT(volunteer_id) as total_volunteers FROM volunteer;`;
    let rows = await executeSQL(sql);
    res.status(200).json(rows);
  });

  // Get total count of sites in system
  router.get("/siteCount", async (req, res) => {
    let sql = `SELECT COUNT(site_id) as total_sites FROM site;`;
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