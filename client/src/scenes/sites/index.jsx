import { Box, IconButton, Alert } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import AddSite from "./AddSite";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

/**
 * Sites component renders a Data Grid of all the sites in the system
 */
const Sites = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sites, setSites] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const noButtonRef = useRef(null);
  const [alert, setAlert] = useState({
    id: null,
    open: false,
  });

  /**
   * Fetch all site data from database, store in "sites" state
   */
  const fetchSiteData = () => {
    console.log("Fetching Sites");

    fetch(`http://localhost:5000/site`)
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
   * The addSite function will do a fetch to the database to POST new site
   * @param {Object} site The site to be INSERT into database
   */
  const addSite = (site) => {
    fetch(`http://localhost:5000/site/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(site),
    })
      .then((res) => {
        console.log(res);
        fetchSiteData();
        setSnackbar({
          children: "Site succesfully added!",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

/**
 * The deleteSite function will to a DELETE fetch to database to delete a site by ID
 * @param {number} id The site ID to be deleted from database
 */
  const deleteSite = (id) => {
    console.log("Deleting Site ID: " + id);
    fetch(`http://localhost:5000/site/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        fetchSiteData();
        setSnackbar({
          children: "Site successfully deleted",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log("error deleting...");
        console.log(err);
        setSnackbar({
          children: "Error deleting site",
          severity: "error",
        });
      });
  };

  // On Page load, fetch all sites
  useEffect(() => {
    fetchSiteData();
  }, []);

/**
 * The following functions handle updating changes to a site row in Data Grid
 * Will do a fetch PUT to update database if any changes are made
 */
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow };

    fetch(`http://localhost:5000/site/update/${updatedRow.site_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRow),
    })
      .then((res) => {
        console.log(res);
        setSnackbar({
          children: "Site Updated!",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          children: "Site Update Error!",
          severity: "error",
        });
      });

    return newRow;
  };

  // Handle an error on row update/Volunteer edit
  const handleProcessRowUpdateError = (error) => {
    console.log(error);
    setSnackbar({
      children: "Site Update Error!",
      severity: "error",
    });
  };

  /*
  Following functions are handlers for the Site Delete Alert/Dialog
  when the Delete action button is clicked in a site row
  */

  // Site Delete to handle cancel/no
  const handleNo = () => {
    setAlert({ id: null, open: false });
  };

  // Site Delete Alert "yes" handler, calls the delete the site  
  const handleYes = () => {
    deleteSite(alert.id);
    setAlert({ id: null, open: false });
  };
  const handleEntered = () => {};

  // Column info for datagrid
  const columns = [
    { field: "site_id", headerName: "ID", flex: 0.5 },
    {
      field: "site_name",
      headerName: "Site Name",
      flex: 1,
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      editable: true,
    },
    {
      field: "zipcode",
      headerName: "Zipcode",
      flex: 1,
      editable: true,
    },
    {
      field: "note",
      headerName: "Note",
      flex: 1,
      editable: true,
    },
    {
      field: "Delete Site",
      sortable: false,
      flex: .5,
      disableColumnMenu: true,
      renderCell: ({ row: { site_id } }) => {
        return (
          <Box display="flex">
            <IconButton
              onClick={() => {
                // Open alert to confirm site deletion
                setAlert({ id: site_id, open: true });
              }}
            >
              <DeleteOutlinedIcon sx={{ color: colors.redAccent[700] }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

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
          {`Pressing 'Yes' will delete the site (this may affect volunteer logs).`}
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
      <Header title="SITES"></Header>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
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
        <AddSite addSite={addSite}></AddSite>
        <DataGrid
          getRowId={(row) => row.site_id}
          rows={sites}
          columns={columns}
          disableRowSelectionOnClick
          editMode="row"
          loading={!sites.length}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
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

export default Sites;
