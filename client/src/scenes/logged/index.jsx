import { Box, useTheme, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AddLog from "./AddLog";

/**
 * Logs renders all Volunteer Log information
 */
const Logs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const noButtonRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [volunteers, setVolunteers] = useState(null);
  const [sites, setSites] = useState(null);
  const [alert, setAlert] = useState({
    id: null,
    open: false,
  });

  /**
   * Fetch all log information from database
   */
  const fetchLogData = () => {
    console.log("Fetching Volunteers");
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

  /**
   * Fetch all volunteer names from database
   */
  const fetchVolunteers = () => {
    console.log("Fetching Volunteers");
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

  /**
   * Fetch all site names from database
   */
  const fetchSites = () => {
    console.log("Fetching Sites");
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

  /**
   * The addLog function will do a POST fetch to add a new log to the database
   * @param {Object} log The new log to be added
   */
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

  const deleteLog = (id) => {
    console.log("Deleting Log ID: " + id);
    fetch(`http://localhost:5000/log/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        fetchLogData();
        fetchVolunteers();
        fetchSites();
        // setSnackbar({
        //   children: "Volunteer successfully deleted",
        //   severity: "success",
        // });
      })
      .catch((err) => {
        console.log("error deleting...");
        console.log(err);
        // setSnackbar({
        //   children: "Error deleting volunteer",
        //   severity: "error",
        // });
      });
  };

  // On load, fetch logs, site, and volunteer data
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
      field: "email",
      headerName: "Email",
      flex: 0.75,
    },
    {
      field: "site_name",
      headerName: "Site Name",
      flex: .75,
      cellClassName: "site-name-column--cell",
    },
    {
      field: "zipcode",
      headerName: "Zipcode",
      flex: .5,
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
      flex: 0.25,
    },
    {
      field: "role",
      headerName: "Role",
      flex: .5,
    },
    {
      field: "note",
      headerName: "Notes",
      flex: 1,
    },
    {
      field: "Delete Log",
      sortable: false,
      flex: .5,
      disableColumnMenu: true,
      renderCell: ({ row: { log_id } }) => {
        return (
          <Box display="flex">
            <IconButton
              onClick={() => {
                // Open alert to confirm volunteer deletion
                setAlert({ id: log_id, open: true });
              }}
            >
              <DeleteOutlinedIcon sx={{ color: colors.redAccent[700] }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  
  /*
  Following functions are handlers for the Volunteer Delete Alert/Dialog
  when the Delete action button is clicked in a volunteer row
  */

  // Volunteer Delete to handle cancel/no
  const handleNo = () => {
    setAlert({ id: null, open: false });
  };

  // Volunteer Delete Alert "yes" handler, calls the deleteVolunteer function for removing volunteer from database and closes alert
  const handleYes = () => {
    deleteLog(alert.id);
    setAlert({ id: null, open: false });
  };
  const handleEntered = () => {};


    // Delete Volunteer Dialog/Alert popup to confirm yes or no
    const renderConfirmDialog = () => {
      return (
        <Dialog
          maxWidth="xs"
          TransitionProps={{ onEntered: handleEntered }}
          open={alert.open}
          onClose={handleNo}
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent dividers>
            {`Pressing 'Yes' will delete the log.`}
          </DialogContent>
          <DialogActions>
            <Button ref={noButtonRef} onClick={handleNo} color="error">
              No
            </Button>
            <Button onClick={handleYes} color="success">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      );
    };

  return (
    <Box m="20px">
      <Header title="Volunteer Logs"></Header>
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
        {renderConfirmDialog()}
        <AddLog addLog={addLog} volunteers={volunteers} sites={sites} refresh={fetchLogData}></AddLog>
        <DataGrid
          getRowId={(row) => row.log_id}
          checkboxSelection
          rows={logs}
          columns={columns}
          disableRowSelectionOnClick
          editMode="row"
          loading={!logs.length}
          // processRowUpdate={processRowUpdate}
          // onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Logs;
