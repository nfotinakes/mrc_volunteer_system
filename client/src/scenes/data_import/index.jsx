import { useState, useEffect } from "react";
import { Alert, Box, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Header from "../../components/Header";
import Snackbar from "@mui/material/Snackbar";
import Papa from "papaparse";
import { tokens } from "../../theme";

/**
 * The DataImport renders a page with option to import volunteer data from a CSV file
 */
const DataImport = () => {

  // Import theme and colors
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Store parsed file data to state
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  //Store emails
  const [emails, setEmails] = useState([]);

  // Store snackbar status
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  /**
   * Fetch all volunteer emails to check for duplicate on import
   * save to emails state
   */
  const fetchEmails = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/volunteer/emails`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const emails = await response.json();
    setEmails(emails);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  /**
   * This function handles the file added, to parse data to JSON
   */
  const changeHandler = (event) => {
    if (event.target.files[0]) {
      // Passing file data (event.target.files[0]) to parse using Papa.parse
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];

          // Iterating data to get column name and their values
          results.data.map((d) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });

          // Parsed Data Response in array format
          setParsedData(results.data);

          // Filtered Column Names
          setTableRows(rowsArray[0]);

          // Filtered Values
          setValues(valuesArray);
        },
      });
    }
  };

  /**
   * This function is executed when the "Clear Data" button is clicked
   * and clears the parsed data from the state
   */
  const clearData = () => {
    setParsedData([]);
    setTableRows([]);
    setValues([]);
  };

  /**
   * For each volunteer parsed, attempt to add the volunteer
   * to the database
   */
  const submitImported = () => {
    parsedData.forEach((volunteer) => addVolunteers(volunteer));
  };

  /**
   * This function handles the actual fetch call for each volunteer passed
   * from the submitImported function. Will check for exisiting volunteer email.
   */
  const addVolunteers = (volunteer) => {
    if (JSON.stringify(emails).includes(volunteer.email)) {
      setSnackbar({
        children: "One or more volunteer emails already exist!",
        severity: "error",
      });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/volunteer/new/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteer),
      })
        .then((res) => {
          console.log(res);
          console.log("Successfully Imported!");

          setSnackbar({
            children: "Volunteers added!",
            severity: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Import Volunteers"
        subtitle="Select a CSV file to import"
      />
      <Box>
        File headers must match for the format: first_name, last_name, email,
        phone, zipcode, licensure, license_num, license_exp
      </Box>
      <br />
      <br />
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto", textAlign: "center" }}
      />
      <Box textAlign="center">
        <Button
          variant="contained"
          color="secondary"
          sx={{ height: 40, margin: 1 }}
          onClick={submitImported}
        >
          Add Volunteers
        </Button>

        <Button
          variant="contained"
          color="secondary"
          sx={{ height: 40, margin: 1 }}
          onClick={clearData}
        >
          Clear Data
        </Button>
      </Box>

      <br />
      <br />
      {/* Table */}
      <Box textAlign="center">
        <table style={{ width: "100%", border: "2px solid black" }}>
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};

export default DataImport;
