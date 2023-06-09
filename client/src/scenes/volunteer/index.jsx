import { Alert, Box, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect, useRef } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "../../components/Header";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AddVolunteer from "./AddVolunteer";
import LogModal from "./LogModal";

const Volunteer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const noButtonRef = useRef(null);
  const [volunteers, setVolunteers] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [alert, setAlert] = useState({
    id: null,
    open: false,
  });
  const [selectedRows, setSelectedRows] = useState([]);

  // Fetch all Volunteer Data
  const fetchVolunteerData = () => {
    console.log("Fetching Volunteers");
    fetch(`http://localhost:5000/volunteer`)
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

  // Fetch call to delete a volunteer by ID
  const deleteVolunteer = (id) => {
    console.log("Deleting Volunteer ID: " + id);
    fetch(`http://localhost:5000/volunteer/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
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
  };

  // Fetch call to add a new volunteer
  const addVolunteer = (volunteer) => {
    fetch(`http://localhost:5000/volunteer/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(volunteer),
    })
      .then((res) => {
        console.log(res);
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



  // Use effect, on page load/refresh get all volunteer data
  useEffect(() => {
    fetchVolunteerData();
  }, []);

  // Fetch to process/save an update to row/volunteer
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow };

    //handle send data to api
    fetch(`http://localhost:5000/volunteer/update/${updatedRow.volunteer_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRow),
    })
      .then((res) => {
        console.log(res);
        setSnackbar({
          children: "Volunteer Updated!",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          children: "Volunteer Update Error!",
          severity: "error",
        });
      });

    return newRow;
  };

  // Handle an error on row update/Volunteer edit
  const handleProcessRowUpdateError = (error) => {
    console.log(error);
    setSnackbar({
      children: "Volunteer Update Error!",
      severity: "error",
    });
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
    { field: "volunteer_id", headerName: "ID" },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
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
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      type: "boolean",
      // valueGetter: (params) => {
      //   if (params.value === 1) {
      //     return "Active";
      //   } else {
      //     return "Not-Active";
      //   }
      // },
    },
    {
      field: "input_date",
      headerName: "Input Date",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      editable: true,
      flex: 1,
    },
    {
      field: "licensure",
      headerName: "Licensure",
      editable: true,
      flex: 1,
    },
    {
      field: "license_num",
      headerName: "License Num",
      editable: true,
      flex: 1,
    },
    {
      field: "license_exp",
      headerName: "License Exp",
      type: "date",
      editable: true,
      valueGetter: ({ value }) => value && new Date(value),
      flex: 1,
    },
    // Actions icons at end of grid, button for delete via Alert, and Modal for opening logs
    {
      field: "Delete/View Log",
      sortable: false,
      flex: 1,
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

  // TODO: CHECK THIS
  const handleSelected = () => {
    console.log(selectedRows);
    // const fullRows = [];
    // selectedRows.forEach();
    const emails = selectedRows.map(
      (id) => volunteers.find((el) => el.volunteer_id === id).email
    );
    const mailto = "mailto:" + emails[0];
    console.log(mailto);
    window.location.href = mailto;
    console.log(emails);
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
      {/* <div style={{ width: "100%" }}>
        For DEBUG: display state.<br></br>
        {JSON.stringify(volunteers)}
      </div> */}
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
        {renderConfirmDialog()}

        <AddVolunteer addVolunteer={addVolunteer} />

        <Box
          m={1}
          //margin
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
            E-mail Selected
          </Button>
        </Box>

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
