import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import AddLog from "./AddLog";

const Logs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [logs, setLogs] = useState([]);
  const [volunteers, setVolunteers] = useState(null);
  const [sites, setSites] = useState(null);

  // Fetch all logs from database
  const fetchLogData = () => {
    console.log("Fetching Volunteers");
    // const token = Cookies.get("XSRF-TOKEN");

    fetch(`http://localhost:5000/log`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setLogs(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchVolunteers = () => {
    console.log("Fetching Volunteers");
    // const token = Cookies.get("XSRF-TOKEN");

    fetch(`http://localhost:5000/volunteer/names`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setVolunteers(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchSites = () => {
    console.log("Fetching Sites");
    // const token = Cookies.get("XSRF-TOKEN");

    fetch(`http://localhost:5000/site/names`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setSites(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Fetch call to add a new volunteer
  const addLog = (log) => {
    fetch(`http://localhost:5000/log/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    })
      .then((res) => {
        console.log(res);
        fetchLogData();
        fetchVolunteers();
        fetchSites();
        // setSnackbar({
        //   children: "Volunteer succesfully added!",
        //   severity: "success",
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // On load, fetch logs
  useEffect(() => {
    fetchLogData();
    fetchVolunteers();
    fetchSites();
  }, []);

  // Data Grid column info
  const columns = [
    { field: "log_id", headerName: "Log ID" },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "site_name",
      headerName: "Site Name",
      flex: 1,
      cellClassName: "site-name-column--cell",
    },
    {
      field: "zipcode",
      headerName: "Zipcode",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      editable: true,
      flex: 0.5,
    },
    {
      field: "hours",
      headerName: "Hours",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "note",
      headerName: "Notes",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Volunteer Logs"></Header>
      {/* <div style={{ width: "100%" }}>
        For DEBUG: display state.<br></br>
        {JSON.stringify(logs)}
      </div> */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            // borderBottom: "none",
          },
          "& .name-column--cell": {
            // color: colors.greenAccent[400],
            fontWeight: "bold",
          },
          "& .site-name-column--cell": {
            color: colors.blueAccent[400],
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[700],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[400],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <AddLog addLog={addLog} volunteers={volunteers} sites={sites}></AddLog>
        <DataGrid
          checkboxSelection
          rows={logs}
          columns={columns}
          getRowId={(row) => row.log_id}
          disableRowSelectionOnClick
          editMode="row"
          loading={!logs.length}
          // processRowUpdate={processRowUpdate}
          // onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Logs;
