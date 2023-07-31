import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert, Box, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { tokens } from "../../theme";
import Snackbar from "@mui/material/Snackbar";

/**
 * AddVolunteer component renders the dialog for adding a new volunteer to the database.
 * Props passed are the addVolunteer fetch from parent to add the volunteer on submit,
 * and refresh to fetch updated volunteer list for parent rendering.
 */
const AddVolunteer = ({ addVolunteer, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // If theme colors needed
  const [snackbar, setSnackbar] = useState(null); // Store snackbar alerts

  const handleCloseSnackbar = () => setSnackbar(null);

  // Store volunteer info to be added in state
  const [volunteer, setVolunteer] = useState({
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    zipcode: null,
    status: 1,
    input_date: null,
    licensure: null,
    license_num: null,
    license_exp: null,
  });
  // Store date inputs
  const [inputDate, setInputDate] = useState(null);
  const [licenseExp, setLicenseExp] = useState(null);
  const [dialog, setDialog] = useState({ open: false }); // State for setting dialog open or close

  /**
   * Handler for toggling dialog open status
   */
  const handleClickOpen = () => {
    setDialog({ open: true });
  };

  /**
   * Handler for closing dialog and clearing state data
   */
  const handleClose = () => {
    setVolunteer({
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      zipcode: null,
      input_date: null,
      licensure: null,
      license_num: null,
      license_exp: null,
    });
    setInputDate(null);
    setLicenseExp(null);
    setDialog({ open: false });
  };

  /**
   * Function for submit button click to add the volunteer to the system.
   * Some input validation inside
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    //Set volunteer status as active for submission
    volunteer.status = 1;

    // If input date filled, format for submission
    if (inputDate) {
      volunteer.input_date = dayjs(inputDate).format();
    }

    // If license expiration date filled, format for submission
    if (licenseExp) {
      volunteer.license_exp = dayjs(licenseExp).format();
    }

    // Check for null values, submit if all filled
    if (
      !volunteer.first_name ||
      !volunteer.last_name ||
      !volunteer.email ||
      !volunteer.phone ||
      !volunteer.zipcode ||
      !volunteer.input_date ||
      !volunteer.licensure ||
      !volunteer.license_num ||
      !volunteer.license_exp
    ) {
      setSnackbar({
        children: "Field has been left blank!",
        severity: "error",
      });
    } else {
      console.log("Form submitted:", volunteer);
      addVolunteer(volunteer);

      setVolunteer({
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        zipcode: null,
        input_date: null,
        licensure: null,
        license_num: null,
        license_exp: null,
      });
      setInputDate(null);
      setLicenseExp(null);
      setSnackbar({
        children: "Volunteer successfully added",
        severity: "success",
      });
      setDialog({ open: false });
    }
    refresh();
  };

  /**
   * The following functions are handlers for the dialog text fields
   */
  const handleFirstNameChange = (event) => {
    volunteer.first_name = event.target.value;
  };

  const handleLastNameChange = (event) => {
    volunteer.last_name = event.target.value;
  };

  const handleEmailChange = (event) => {
    volunteer.email = event.target.value;
  };

  const handlePhoneChange = (event) => {
    volunteer.phone = event.target.value;
  };

  const handleZipChange = (event) => {
    volunteer.zipcode = event.target.value;
  };

  const handleLicensureChange = (event) => {
    volunteer.licensure = event.target.value;
  };

  const handleLicenseNumChange = (event) => {
    volunteer.license_num = event.target.value;
  };

  return (
    <div>
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
        <DialogTitle>Add Volunteer</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <TextField
            autoFocus
            style={{ margin: 3 }}
            label="First Name"
            name="first_name"
            onChange={handleFirstNameChange}
            fullWidth
          />
          <TextField
            autoFocus
            style={{ margin: 3 }}
            label="Last Name"
            name="last_name"
            onChange={handleLastNameChange}
            fullWidth
          />
          <TextField
            style={{ margin: 3 }}
            label="Email"
            name="email"
            onChange={handleEmailChange}
            fullWidth
          />
          <br></br>
          <TextField
            style={{ margin: 3 }}
            label="Phone"
            name="phone"
            onChange={handlePhoneChange}
          />
          <TextField
            style={{ margin: 3 }}
            label="Zipcode"
            name="zipcode"
            onChange={handleZipChange}
          />

          <TextField
            style={{ margin: 3 }}
            label="Licensure"
            name="licensure"
            onChange={handleLicensureChange}
          />
          <br />

          <TextField
            style={{ margin: 3 }}
            label="License Number"
            name="license_num"
            onChange={handleLicenseNumChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="License Exp"
                value={volunteer.license_exp}
                onChange={(newValue) => setLicenseExp(newValue)}
              />
            </DemoContainer>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Sign-Up Date"
                value={volunteer.inputDate}
                onChange={(newValue) => setInputDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
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
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
    </div>
  );
};

export default AddVolunteer;
