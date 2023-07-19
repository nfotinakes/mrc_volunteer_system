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

const EventDialog = ({ event }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snackbar, setSnackbar] = useState(null);
//   const [site, setSite] = useState({
//     site_name: null,
//     city: null,
//     zipcode: null,
//     note: null,
//   });

  const [dialog, setDialog] = useState({ open: false });

  const handleClickOpen = () => {
    setDialog({ open: true });
  };

  const handleClose = () => {
    // setSite({
    //   site_name: null,
    //   city: null,
    //   zipcode: null,
    //   note: null,
    // });
    setDialog({ open: false });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform any necessary form submission logic here
//     if (!site.site_name) {
//       setSnackbar({
//         children: "Site name must not be blank!",
//         severity: "error",
//       });
//     } else {
//       addSite(site);
//       console.log("Form submitted:", site);
//     }


//     setSite({
//       site_name: null,
//       city: null,
//       zipcode: null,
//       note: null,
//     });
//     setDialog({ open: false });
//   };

//   const handleSiteNameChange = (event) => {
//     site.site_name = event.target.value;
//   };

//   const handleCityChange = (event) => {
//     site.city = event.target.value;
//   };

//   const handleZipChange = (event) => {
//     site.zipcode = event.target.value;
//   };

//   const handleNotesChange = (event) => {
//     site.note = event.target.value;
//   };

  // Snackbar handler - close snackbar
  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <div>
      <Box
        // m={1}
        m="auto"
        //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        {/* <Button
          variant="contained"
          color="secondary"
          sx={{ height: 40 }}
          onClick={handleClickOpen}
        >
          Add New
        </Button> */}
      </Box>
      <Dialog
        open={dialog.open}
        onClose={handleClose}
        sx={{ color: "success" }}
      >
        <DialogTitle></DialogTitle>
        <DialogContent style={{ paddingTop: 20, overflow: "hidden" }}>


          <br />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button id="Add" color="secondary" >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onclose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
};

export default EventDialog;
