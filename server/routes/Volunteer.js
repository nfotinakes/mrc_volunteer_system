const express = require("express");
const router = express.Router();
const pool = require("../dbPool.js");

/**
 * Volunteer.js handles all API calls associated with volunteers
 */

// Get all Volunteer info
router.get("/", async (req, res) => {
  let sql = `SELECT *
              FROM volunteer`;
  let rows = await executeSQL(sql);
  res.status(200).json(rows);
});

// Get all Volunteer emails
router.get("/emails", async (req, res) => {
  let sql = `SELECT email
              FROM volunteer`;
  let rows = await executeSQL(sql);
  res.status(200).json(rows);
});

// Get single volunteer info by ID
router.get("/edit", async (req, res) => {
  let id = req.query.id;
  let sql = `SELECT * FROM volunteer WHERE volunteer_id = ?`;
  params = [id];
  let rows = await executeSQL(sql, params);
  res.status(200).json(rows);
});

// Get single volunteer info by ID
router.get("/names", async (req, res) => {
  let sql = `SELECT volunteer_id, first_name, last_name, email FROM volunteer ORDER BY last_name ASC`;
  let rows = await executeSQL(sql);
  res.status(200).json(rows);
});

// Get volunteer_ids from all logs
router.get("/logCheck", async (req, res) => {
  let sql = `SELECT volunteer_id FROM log`;
  let rows = await executeSQL(sql);
  res.status(200).json(rows);
});

// Delete single volunteer by ID
router.delete("/delete/:id", async (req, res) => {
  console.log("Delete volunteer request received");
  let id = req.params.id;
  let sql = `DELETE FROM volunteer WHERE volunteer_id = ?`;
  params = [id];
  let rows = await executeSQL(sql, params);
  res.status(200).json(rows);
});

// Create new volunteer
router.post("/new", async (req, res) => {
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let status = req.body.status;
  let inputDate = req.body.input_date;
  let licensure = req.body.licensure;
  let licenseNum = req.body.license_num;
  let licenseExp = req.body.license_exp;

  let sql = `INSERT INTO volunteer (first_name, last_name, email, phone, zipcode, status, input_date, licensure, license_num, license_exp) VALUES (?,?,?,?,?,?,?,?,?,?)`;
  let params = [
    firstName,
    lastName,
    email,
    phone,
    zipcode,
    status,
    inputDate,
    licensure,
    licenseNum,
    licenseExp,
  ];
  console.log(params);
  let rows = executeSQL(sql, params);
  res.send("Volunteer Added");
});

// Create new volunteer for import from CSV file
router.post("/new/import", async (req, res) => {
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let licensure = req.body.licensure;
  let licenseNum = req.body.license_num;
  let licenseExp = req.body.license_exp;
  let status = 1;
  let inputDate = new Date().toJSON().slice(0, 10);

  let sql = `INSERT INTO volunteer (first_name, last_name, email, phone, zipcode, status, input_date, licensure, license_num, license_exp) VALUES (?,?,?,?,?,?,?,?,?,?)`;
  let params = [
    firstName,
    lastName,
    email,
    phone,
    zipcode,
    status,
    inputDate,
    licensure,
    licenseNum,
    licenseExp,
  ];
  console.log(params);
  let rows = executeSQL(sql, params);
  res.send("Volunteer Added");
});

// Update an existing volunteers info
router.put("/update/:id", async (req, res) => {
  console.log("Update volunteer request received");
  let id = req.params.id;
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let status = req.body.status;
  let inputDate = req.body.input_date.split("T")[0];
  let licensure = req.body.licensure;
  let licenseNum = req.body.license_num;
  let licenseExp = req.body.license_exp.split("T")[0];
  let sql = `UPDATE volunteer SET first_name = ?, last_name = ?, email = ?, phone = ?, zipcode = ?, status = ?, input_date = ?,  licensure = ?, license_num = ?, license_exp = ? WHERE volunteer_id = ?`;
  let params = [
    firstName,
    lastName,
    email,
    phone,
    zipcode,
    status,
    inputDate,
    licensure,
    licenseNum,
    licenseExp,
    id,
  ];
  let rows = executeSQL(sql, params);
  res.send("Volunteer Updated: " + JSON.stringify(rows));
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
