import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { tokens } from "../../theme";

const AddVolunteer = ({ addVolunteer }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // If theme colors needed
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
  const [inputDate, setInputDate] = useState(null);
  const [licenseExp, setLicenseExp] = useState(null);
  const [lastActive, setLastActive] = useState(null);
  const [dialog, setDialog] = useState({ open: false });

  const handleClickOpen = () => {
    setDialog({ open: true });
  };

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
    setLastActive(null);
    setDialog({ open: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form submission logic here
    volunteer.status = 1;
    volunteer.input_date = dayjs(inputDate).format();
    volunteer.license_exp = dayjs(licenseExp).format();
    volunteer.last_active = dayjs(lastActive).format();
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
    setLastActive(null);
    setDialog({ open: false });
  };

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
            <DemoContainer components={["DateField"]}>
              <DateField
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
    </div>
  );
};

export default AddVolunteer;
