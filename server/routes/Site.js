const express = require("express");
const router = express.Router();
const pool = require("../dbPool.js");

// Get all Volunteer info
router.get("/", async (req, res) => {
    let sql = `SELECT * FROM site`;
    let rows = await executeSQL(sql);
    res.status(200).json(rows);
  });


// Get single site by ID
router.get("/names", async (req, res) => {
    let sql = `SELECT site_id, site_name FROM site`;
    let rows = await executeSQL(sql);
    res.status(200).json(rows);
  });


// Get single site by ID
router.get("/edit", async (req, res) => {
    let id = req.query.id;
    let sql = `SELECT * FROM site WHERE site_id = ?`;
    params = [id];
    let rows = await executeSQL(sql, params);
    res.status(200).json(rows);
  });

  // Create new Site
router.post("/new", async (req, res) => {
    let data = req.body;
    let siteName = req.body.site_name;
    let city = req.body.city;
    let zipcode = req.body.zipcode;
    let note = req.body.note;
    let sql = `INSERT INTO site (site_name, city, zipcode, note) VALUES (?,?,?,?)`;
    let params = [siteName, city, zipcode, note];
    console.log(params);
    let rows = executeSQL(sql, params);
    res.send("Site Added: " + JSON.stringify(data));
  });

  // Update Site
router.put("/update/:id", async (req, res) => {
    let id = req.params.id;
    let siteName = req.body.site_name;
    let city = req.body.city;
    let zipcode = req.body.zipcode;
    let note = req.body.note;
    let sql = `UPDATE site SET site_name = ?, city = ?, zipcode = ?, note = ? WHERE site_id = ?`;
    let params = [siteName, city, zipcode, note, id];
    let rows = executeSQL(sql, params);
    res.send("Site Updated");
  });

  // Delete single volunteer by ID
router.delete("/delete/:id", async (req, res) => {
  console.log("Delete request received");
  try {
    let id = req.params.id;
    let sql = `DELETE FROM site WHERE site_id = ?`;
    params = [id];
    let rows = await executeSQL(sql, params);
    res.status(200).json(rows);
  } catch (err) {
    console.log("Error deleting site: " + err);
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