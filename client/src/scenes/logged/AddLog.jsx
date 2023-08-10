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
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

/**
 * AddLog component renders the dialog for adding a new site to database
 * as parameters it accepts the list of volunteers, sites, and the addLog function
 */
const AddLog = ({ volunteers, sites, addLog, refresh }) => {
  //Theme and colors
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State data
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

  // Store dialog state for visible or not
  const [dialog, setDialog] = useState({ open: false });

  // Toggle visible state
  const handleClickOpen = () => {
    setDialog({ open: true });
  };

  // Handle closing dialog, reset state values
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

  /**
   * handleSubmit handles logic to add the new log to database,
   * uses fetch call passed from parent, checking for valid input values
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // If date entered, format for submission
    if (date) {
      log.date = dayjs(date).format();
    }

    // Check for blank fields, submit if valid
    if (
      !log.volunteer_id ||
      !log.site_id ||
      !log.date ||
      !log.hours ||
      !log.role
    ) {
      setSnackbar({
        children: "Log fields must not be blank (except note)!",
        severity: "error",
      });
    } else {
      addLog(log);
      console.log("Log submitted:", log);
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
    }
  };

  /**
   * The following functions are handlers for input field value changes
   */
  const handleEmailChange = (event) => {
    log.volunteer_id = event.target.value;
    setVolunteerSelected(event.target.value);
  };

  const handleSiteChange = (event) => {
    log.site_id = event.target.value;
    setSiteSelected(event.target.value);
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
        sx={{
          color: "success",
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",
            },
          },
        }}
      >
        <DialogTitle>Add Log</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <FormControl fullWidth>
            {/* Volunteer Selection */}
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
          </FormControl>
          <br />
          <br />

          <FormControl fullWidth>
            {/* Site selection */}
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
          </FormControl>

          {/* Date volunteered selection */}
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

          {/* Hours */}
          <TextField
            style={{ margin: 3 }}
            label="Hours"
            name="hours"
            onChange={handleHoursChange}
          />

          {/* Role */}
          <TextField
            style={{ margin: 3 }}
            label="Role"
            name="role"
            onChange={handleRoleChange}
          />

          {/* Notes */}
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
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
};

export default AddLog;
