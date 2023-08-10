import { useState, useEffect, useRef, useCallback } from "react";
import { Alert, Box, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AddVolunteer from "./AddVolunteer";
import Header from "../../components/Header";
import LogModal from "./LogModal";
import { tokens } from "../../theme";

/**
 * Volunteer component displays all volunteers in the system for CRUD operations
 */
const Volunteer = () => {
  // Theme and color
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const noButtonRef = useRef(null);

  const [volunteers, setVolunteers] = useState([]); // Store all volunteers
  const [logIDs, setLogIDs] = useState([]); // store all site IDs from logs (for checking site deletion)
  const [snackbar, setSnackbar] = useState(null); // Store snackbar alerts
  const [alert, setAlert] = useState({
    id: null,
    open: false,
  });
  const [selectedRows, setSelectedRows] = useState([]); // Store selected rows for Email Mailto

  // Used for volunteer edit (row update)
  const [promiseArguments, setPromiseArguments] = useState(null);

  /**
   * useEffect hook to fetch all volunteer data on render or state change
   */
  useEffect(() => {
    fetchVolunteerData();
    fetchLogIds();
  }, []);

  /**
   * Fetch all volunteer data from database and set to state
   */
  const fetchVolunteerData = () => {
    console.log("Fetching Volunteers");
    fetch(`http://localhost:5000/volunteer`)
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
   * Fetch all site IDs from volunteer logs
   * Use these to check for site deletion
   */
  const fetchLogIds = () => {
    console.log("Fetching Log IDs...");
    fetch(`http://localhost:5000/volunteer/logCheck`)
      .then((response) => {
        console.log("Fetch log IDs response: ", response);
        return response.json();
      })
      .then((responseData) => {
        setLogIDs(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Delete a volunteer from the database, then refresh state
   * @param {number} id Volunteer unique ID
   */
  const deleteVolunteer = (id) => {
    // Check if any logs are associated with the volunteer to be deleted
    // If not, proceed to delete
    if (JSON.stringify(logIDs).includes(id)) {
      setSnackbar({
        children:
          "There are logs associated with this volunteer, delete them first!",
        severity: "error",
      });
    } else {
      console.log("Deleting Volunteer ID: " + id);
      fetch(`http://localhost:5000/volunteer/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          console.log("Delete volunteer response: ", res);
          fetchVolunteerData();
          setSnackbar({
            children: "Volunteer successfully deleted",
            severity: "success",
          });
        })
        .catch((err) => {
          console.log("error deleting...");
          console.log(err);
          setSnackbar({
            children: "Error deleting volunteer",
            severity: "error",
          });
        });
    }
  };

  /**
   * Add a new volunteer to the database
   * @param {Object} volunteer New volunteer to add to database
   */
  const addVolunteer = (volunteer) => {
    fetch(`http://localhost:5000/volunteer/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(volunteer),
    })
      .then((res) => {
        console.log("Add volunteer response: ", res);
        fetchVolunteerData();
        setSnackbar({
          children: "Volunteer succesfully added!",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * The following functions handle changes to a volunteer/row in the Data Grid
   */

  // Handle an error on row update/Volunteer edit
  const handleProcessRowUpdateError = (error) => {
    console.log(error);
    setSnackbar({
      children: "Volunteer Update Error!",
      severity: "error",
    });
  };

  // Check for row change
  function computeMutation(newRow, oldRow) {
    if (newRow !== oldRow) {
      return `save changes to volunteer`;
    }
    return null;
  }

  // Process a row change
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

  // If cancel, set back to old row
  const handleUpdateNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  // If change confirm, try to save edit to database
  const handleUpdateYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the fetch request to save in the backend
      // const response = await mutateRow(newRow);
      const response = await fetch(
        `http://localhost:5000/volunteer/update/${oldRow.volunteer_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRow),
        }
      );
      setSnackbar({
        children: "Volunteer successfully updated",
        severity: "success",
      });
      resolve(newRow);
      console.log("Edit volunteer response: ", response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Error updating volunteer", severity: "error" });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleUpdateEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
  };

  /**
   * The Dialog for confirming row update
   */
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
    deleteVolunteer(alert.id);
    setAlert({ id: null, open: false });
  };
  const handleEntered = () => {};

  /*
  Following function is for setting the the visiuble status of Snackbar alerts to close
  */
  const handleCloseSnackbar = () => setSnackbar(null);

  /*
  Data Grid column specifications
  */
  const columns = [
    { field: "volunteer_id", headerName: "ID", flex: 0.5 },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 0.75,
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 0.75,
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      editable: true,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      editable: true,
      flex: 1,
    },
    {
      field: "zipcode",
      headerName: "Zipcode",
      editable: true,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      editable: true,
      type: "boolean",
    },
    {
      field: "input_date",
      headerName: "Input Date",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      editable: true,
      flex: 0.75,
    },
    {
      field: "licensure",
      headerName: "Licensure",
      editable: true,
      flex: 0.75,
    },
    {
      field: "license_num",
      headerName: "License Num",
      editable: true,
      flex: 0.75,
    },
    {
      field: "license_exp",
      headerName: "License Exp",
      type: "date",
      editable: true,
      valueGetter: ({ value }) => value && new Date(value),
      flex: 0.75,
    },
    // Actions icons at end of grid, button for delete via Alert, and Modal for opening logs
    {
      field: "Delete/View Log",
      sortable: false,
      flex: 0.75,
      disableColumnMenu: true,
      renderCell: ({ row: { volunteer_id, first_name, last_name } }) => {
        return (
          <Box display="flex">
            <IconButton
              onClick={() => {
                // Open alert to confirm volunteer deletion
                setAlert({ id: volunteer_id, open: true });
              }}
            >
              <DeleteOutlinedIcon sx={{ color: colors.redAccent[700] }} />
            </IconButton>
            {/* Action Icon for viewing a modal with volunteers logs */}
            <LogModal id={volunteer_id} name={first_name + " " + last_name} />
          </Box>
        );
      },
    },
  ];

  /**
   * This function will take all selected emails, and launch the
   * local email client with mailto
   */
  const handleEmailSelection = (event) => {
    const emails = selectedRows.map(
      (id) => volunteers.find((el) => el.volunteer_id === id).email
    );
    let mailto = "";
    console.log("Emails");
    console.log(emails);
    if (emails.length > 1) {
      for (let i = 0; i < emails.length; i++) {
        if (i === 0) {
          mailto = "mailto:" + emails[i];
        } else {
          mailto = mailto + ";" + emails[i];
        }
      }
    } else {
      mailto = "mailto:" + emails[0];
    }
    console.log(mailto);

    if (emails.length === 0) {
      setSnackbar({
        children: "No Volunteer Selected",
        severity: "error",
      });
    } else {
      window.location.href = mailto;
      event.preventDefault();
    }
  };

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
          {`Pressing 'Yes' will delete the volunteer.`}
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
      <Header title="Volunteers"></Header>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .name-column--cell": {
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
        {/* Dialogs - confirm and update */}
        {renderConfirmDialog()}
        {renderUpdateConfirmDialog()}

        {/* Component for adding new volunteer */}
        <AddVolunteer addVolunteer={addVolunteer} />

        {/* Button for emailing selected volunteers */}
        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ height: 40 }}
            onClick={(event) => handleEmailSelection(event)}
          >
            Email Selected
          </Button>
        </Box>
        {/* Volunteer Data Grid */}
        <DataGrid
          getRowId={(row) => row.volunteer_id}
          rows={volunteers}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          editMode="row"
          loading={!volunteers.length}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete all selected",
              onClick: () => console.log("Delete clicked"),
            },
          ]}
          onRowSelectionModelChange={(ids) => {
            const selectedIDsSet = new Set(ids);
            console.log("Selected ID's: ", selectedIDsSet);
            const selectedIDs = Array.from(selectedIDsSet);
            setSelectedRows(selectedIDs);
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

export default Volunteer;
