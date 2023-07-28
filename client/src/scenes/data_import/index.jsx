import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import Papa from "papaparse";
import Button from "@mui/material/Button";
import Header from "../../components/Header";

/**
 * The DataImport renders a page with option to import volunteer data from a CSV file
 */
const DataImport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Store parsed file data to state
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  /**
   * This function handles the file added, to parse data to JSON
   */
  const changeHandler = (event) => {

    if(event.target.files[0]) {
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

  // Console log parsedData state
  const printParsedState = () => {
    console.log(parsedData);
  };

  const clearData = () => {
    setParsedData([]);
    setTableRows([]);
    setValues([]);
    console.log(parsedData);
  }

  const submitImported = () => {
    parsedData.forEach((volunteer) => addVolunteers(volunteer));
  };

  // Fetch call to add a new volunteer
  const addVolunteers = (volunteer) => {
    fetch(`http://localhost:5000/volunteer/new/import`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(volunteer),
    })
      .then((res) => {
        console.log(res);
        console.log("Successfully Imported!");

        // setSnackbar({
        //   children: "Volunteer succesfully added!",
        //   severity: "success",
        // });
      })
      .catch((err) => {
        console.log(err);
      });
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
          onClick={printParsedState}
        >
          Console Log State
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
    </Box>
  );
};

export default DataImport;
