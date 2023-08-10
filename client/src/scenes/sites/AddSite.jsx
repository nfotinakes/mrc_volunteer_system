import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert, Box, useTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { tokens } from "../../theme";

/**
 * The AddSite component renders a dialog for entering site information
 * and using the addSite function passed from parent to add the new site
 */
const AddSite = ({ addSite }) => {
  // Theme and colors
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [snackbar, setSnackbar] = useState(null);

  // Store new site info in state for submission
  // Use blank string for all values except name to allow
  // for blank values
  const [site, setSite] = useState({
    site_name: null,
    address: "",
    city: "",
    zipcode: "",
    note: "",
  });

  const [dialog, setDialog] = useState({ open: false }); // For setting dialog open status

  // Toggle dialog to open
  const handleClickOpen = () => {
    setDialog({ open: true });
  };

  // Close dialog and clear state
  const handleClose = () => {
    setSite({
      site_name: null,
      address: "",
      city: "",
      zipcode: "",
      note: "",
    });
    setDialog({ open: false });
  };

  // For new site submission, name must be entered but other info can be blank.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form submission logic here
    if (!site.site_name) {
      setSnackbar({
        children: "Site name must not be blank!",
        severity: "error",
      });
    } else {
      addSite(site);
      console.log("Form submitted:", site);
      setSite({
        site_name: null,
        address: "",
        city: "",
        zipcode: "",
        note: "",
      });
      setDialog({ open: false });
    }
  };

  /**
   * The following are handlers for data change
   */
  const handleSiteNameChange = (event) => {
    site.site_name = event.target.value;
  };

  const handleSiteAddressChange = (event) => {
    site.address = event.target.value;
  };

  const handleCityChange = (event) => {
    site.city = event.target.value;
  };

  const handleZipChange = (event) => {
    site.zipcode = event.target.value;
  };

  const handleNotesChange = (event) => {
    site.note = event.target.value;
  };

  // Snackbar handler - close snackbar
  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <div>
      <Box
        m="auto"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{ height: 40 }}
          onClick={handleClickOpen}
        >
          Add New
        </Button>
      </Box>
      <Dialog
        open={dialog.open}
        onClose={handleClose}
        sx={{ color: "success" }}
      >
        <DialogTitle>Add Site</DialogTitle>
        <DialogContent style={{ paddingTop: 20, overflow: "hidden" }}>
          <TextField
            autoFocus
            style={{ margin: 3 }}
            label="Site Name"
            name="site_name"
            onChange={handleSiteNameChange}
            fullWidth
          />
          <TextField
            autoFocus
            style={{ margin: 3 }}
            label="Address"
            name="address"
            onChange={handleSiteAddressChange}
            fullWidth
          />
          <TextField
            autoFocus
            style={{ margin: 3 }}
            label="City"
            name="city"
            onChange={handleCityChange}
            fullWidth
          />
          <TextField
            style={{ margin: 3 }}
            label="Zipcode"
            name="zipcode"
            onChange={handleZipChange}
            fullWidth
          />
          <br></br>
          <TextField
            style={{ margin: 3 }}
            label="Note"
            name="note"
            onChange={handleNotesChange}
            multiline
            rows={4}
            fullWidth
          />

          <br />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button id="Add" color="secondary" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onclose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
};

export default AddSite;
