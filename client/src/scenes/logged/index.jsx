import { Alert, Box, useTheme, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect, useRef, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import AddLog from "./AddLog";

/**
 * Logs component renders all Volunteer Log information
 */
const Logs = () => {
  // Theme and colors
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State data 
  const noButtonRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [volunteers, setVolunteers] = useState(null);
  const [sites, setSites] = useState(null);
  const [snackbar, setSnackbar] = useState(null); // Store snackbar alerts
  const [promiseArguments, setPromiseArguments] = useState(null);
  const [alert, setAlert] = useState({
    id: null,
    open: false,
  });

  /**
   * Fetch all log information from database and save to state
   */
  const fetchLogData = () => {
    console.log("Fetching Logs");
    fetch(`http://localhost:5000/log`)
      .then((response) => {
        console.log("Fetch log response: ", response);
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
   * Fetch all volunteer names from database and save to state
   */
  const fetchVolunteers = () => {
    console.log("Fetching Volunteers");
    fetch(`http://localhost:5000/volunteer/names`)
      .then((response) => {
        console.log("Fetch volunteers response: ", response);
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
   * Fetch all site names from database and save to state
   */
  const fetchSites = () => {
    console.log("Fetching Sites");
    fetch(`http://localhost:5000/site/names`)
      .then((response) => {
        console.log("Fetching sites response:" + response);
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
   * fetchLogData() is called to update state
   * @param {Object} log The new log to be added
   */
  const addLog = (log) => {
    fetch(`http://localhost:5000/log/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    })
      .then((res) => {
        console.log("Add log response: ", res);
        fetchLogData();
        setSnackbar({
          children: "Log successfully added",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          children: "Error adding log",
          severity: "success",
        });
      });
  };

  /**
   * Delete a log from the database by id
   * and fetch log data again to refresh state
   * @param {number} id Log id to delete
   */
  const deleteLog = (id) => {
    console.log("Deleting Log ID: " + id);
    fetch(`http://localhost:5000/log/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log("Delete log response: ", res);
        fetchLogData();
        setSnackbar({
          children: "Log successfully deleted",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          children: "Error deleting log",
          severity: "error",
        });
      });
  };

  // Use effect hook to fetch logs, site, and volunteer data and store to state
  useEffect(() => {
    fetchLogData();
    fetchVolunteers();
    fetchSites();
  }, []);

  // Handle an error on row update/Volunteer edit
  const handleProcessRowUpdateError = (error) => {
    console.log(error);
    setSnackbar({
      children: "Volunteer Update Error!",
      severity: "error",
    });
  };

  function computeMutation(newRow, oldRow) {
    if (newRow !== oldRow) {
      return `save changes to log`;
    }
    return null;
  }

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleUpdateNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleUpdateYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      const response = await fetch(
        `http://localhost:5000/log/update/${oldRow.log_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRow),
        }
      );
      console.log(newRow);
      setSnackbar({
        children: "Log successfully updated",
        severity: "success",
      });
      resolve(newRow);
      console.log("Response", response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Error updating log", severity: "error" });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleUpdateEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
  };

  const renderUpdateConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleUpdateEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleUpdateNo} color="error">
            No
          </Button>
          <Button onClick={handleUpdateYes} color="success">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

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
      flex: 0.75,
      cellClassName: "site-name-column--cell",
    },
    {
      field: "zipcode",
      headerName: "Zipcode",
      flex: 0.5,
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
      editable: true,
      flex: 0.25,
    },
    {
      field: "role",
      headerName: "Role",
      editable: true,
      flex: 0.5,
    },
    {
      field: "note",
      headerName: "Notes",
      editable: true,
      flex: 1,
    },
    {
      field: "Delete Log",
      sortable: false,
      flex: 0.5,
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

  /*
  Following function is for setting the the visiuble status of Snackbar alerts to close
  */
  const handleCloseSnackbar = () => setSnackbar(null);

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
        {renderUpdateConfirmDialog()}
        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <AddLog
            addLog={addLog}
            volunteers={volunteers}
            sites={sites}
            refresh={fetchLogData}
          ></AddLog>
        </Box>

        <DataGrid
          getRowId={(row) => row.log_id}
          checkboxSelection
          rows={logs}
          columns={columns}
          disableRowSelectionOnClick
          editMode="row"
          loading={!logs.length}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            boxShadow: 3,
          }}
        />
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
    </Box>
  );
};

export default Logs;
