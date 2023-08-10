const express = require("express");
const router = express.Router();
const pool = require("../dbPool.js");

/**
 * Site.js handles all API calls associated with a site
 */

// Get all site info
router.get("/", async (req, res) => {
  let sql = `SELECT * FROM site`;
  let rows = await executeSQL(sql);
  res.status(200).json(rows);
});

// Get only site ids and site names
router.get("/names", async (req, res) => {
  let sql = `SELECT site_id, site_name FROM site`;
  let rows = await executeSQL(sql);
  res.status(200).json(rows);
});

// Get all info of site by ID
router.get("/edit", async (req, res) => {
  let id = req.query.id;
  let sql = `SELECT * FROM site WHERE site_id = ?`;
  params = [id];
  let rows = await executeSQL(sql, params);
  res.status(200).json(rows);
});

// Get site_ids from all logs (used to check if site associated with any volunteer logs)
router.get("/logCheck", async (req, res) => {
  let sql = `SELECT site_id FROM log`;
  let rows = await executeSQL(sql);
  res.status(200).json(rows);
});

// Create new Site
router.post("/new", async (req, res) => {
  let data = req.body;
  let siteName = req.body.site_name;
  let city = req.body.city;
  let zipcode = req.body.zipcode;
  let note = req.body.note;
  let address = req.body.address;
  let sql = `INSERT INTO site (site_name, city, zipcode, address, note) VALUES (?,?,?,?,?)`;
  let params = [siteName, city, zipcode, address, note];
  console.log(params);
  let rows = executeSQL(sql, params);
  res.send("Site Added: " + JSON.stringify(data));
});

// Update Site
router.put("/update/:id", async (req, res) => {
  let id = req.params.id;
  let siteName = req.body.site_name;
  let address = req.body.address;
  let city = req.body.city;
  let zipcode = req.body.zipcode;
  let note = req.body.note;
  let sql = `UPDATE site SET site_name = ?, city = ?, zipcode = ?, address = ?, note = ? WHERE site_id = ?`;
  let params = [siteName, city, zipcode, address, note, id];
  let rows = executeSQL(sql, params);
  res.send("Site Updated");
});

// Delete single site by ID
router.delete("/delete/:id", async (req, res) => {
  console.log("Delete site request received");
    let id = req.params.id;
    let sql = `DELETE FROM site WHERE site_id = ?`;
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
