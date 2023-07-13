import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert, Box, useTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { tokens } from "../../theme";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

const AddLog = ({ volunteers, sites, addLog }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snackbar, setSnackbar] = useState(null);
  const [volunteerSelected, setVolunteerSelected] = useState("");
  const [siteSelected, setSiteSelected] = useState("");
  const [date, setDate] = useState(null);
  const [log, setLog] = useState({
    volunteer_id: null,
    site_id: null,
    date: null,
    hours: null,
    role: null,
    note: null,
  });

  const [dialog, setDialog] = useState({ open: false });

  const handleClickOpen = () => {
    setDialog({ open: true });
  };

  const handleClose = () => {
    setLog({
      volunteer_id: null,
      site_id: null,
      date: null,
      hours: null,
      role: null,
      note: null,
    });
    setVolunteerSelected("");
    setSiteSelected("");
    setDialog({ open: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form submission logic here
    if (!log) {
      setSnackbar({
        children: "Site name must not be blank!",
        severity: "error",
      });
    } else {
      log.date = dayjs(date).format();
      addLog(log);
      console.log("Form submitted:", log);
    }

    setLog({
      volunteer_id: null,
      site_id: null,
      date: null,
      hours: null,
      role: null,
      note: null,
    });
    setVolunteerSelected("");
    setSiteSelected("");
    setDialog({ open: false });
  };

  const handleEmailChange = (event) => {
    log.volunteer_id = event.target.value;
    setVolunteerSelected(event.target.value);
    console.log("log: ", log);
  };

  const handleSiteChange = (event) => {
    log.site_id = event.target.value;
    setSiteSelected(event.target.value);
  };

  const handleDateChange = (event) => {
    log.date = event.target.value;
  };

  const handleHoursChange = (event) => {
    log.hours = event.target.value;
  };

  const handleRoleChange = (event) => {
    log.role = event.target.value;
  };

  const handleNotesChange = (event) => {
    log.note = event.target.value;
  };

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
        sx={{
          color: "success",
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle>Add Log</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          {/* <div style={{ width: "100%" }}>
        From index:<br></br>
        {JSON.stringify(volunteers)}
      </div> */}
          <FormControl fullWidth>
            <InputLabel>Select Volunteer</InputLabel>
            <Select
              style={{ margin: 3 }}
              value={volunteerSelected}
              onChange={handleEmailChange}
              input={<OutlinedInput label="Select Volunteer" />}
              label="Select Volunteer"
            >
              {volunteers?.map((volunteer) => (
                <MenuItem
                  key={volunteer.volunteer_id}
                  value={volunteer.volunteer_id}
                >
                  {volunteer.first_name +
                    " " +
                    volunteer.last_name +
                    ":  " +
                    volunteer.email}
                </MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>First Name, Last Name, & Email</FormHelperText> */}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Select Site</InputLabel>
            <Select
              style={{ margin: 3 }}
              value={siteSelected}
              onChange={handleSiteChange}
              input={<OutlinedInput label="Select Site" />}
              label="Select Site"
            >
              {sites?.map((site) => (
                <MenuItem key={site.site_id} value={site.site_id}>
                  {site.site_name}
                </MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>Site Name</FormHelperText> */}
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                label="Date"
                value={log.date}
                onChange={(newValue) => setDate(newValue)}
                style={{ margin: 3 }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            style={{ margin: 3 }}
            label="Hours"
            name="hours"
            onChange={handleHoursChange}
          />

          <TextField
            style={{ margin: 3 }}
            label="Role"
            name="role"
            onChange={handleRoleChange}
          />
          <TextField
            style={{ margin: 3 }}
            label="Note"
            name="note"
            onChange={handleNotesChange}
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

export default AddLog;
