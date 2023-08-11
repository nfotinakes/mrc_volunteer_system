import { useState, useEffect, createRef, useRef } from "react";
import {
  Box,
  DialogContentText,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Header from "../../components/Header";
import { tokens } from "../../theme";

/**
 * Calendar component renders all events from database
 */
const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const calendarRef = createRef();
  const [alert, setAlert] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    info: "",
    open: false,
  });

  const [addEventAlert, setAddEventAlert] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    info: "",
    open: false,
    calApi: null,
    allDay: "",
  });
  const noButtonRef = useRef(null);

  /**
   * Fetch all event data from database, and call addEventLoad to use api to add all events to calendar
   * @param {Object} api The underlying calendar api used for storing event info
   */
  const fetchEventData = (api) => {
    let firstEvents = [];
    console.log("Fetching Events...");
    fetch(`${process.env.REACT_APP_API_URL}/event`)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        addEventLoad(api, responseData);
      })
      .catch((err) => {
        console.error(err);
      });
    return firstEvents;
  };

  /**
   * Add a new event to database with POST
   */
  const addNewEvent = (event) => {
    fetch(`${process.env.REACT_APP_API_URL}/event/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Delete an event from database by ID
   * @param {string} id The event ID to delete
   */
  const deleteEvent = (id) => {
    console.log("Deleting Event ID: " + id);
    fetch(`${process.env.REACT_APP_API_URL}/event/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error deleting...");
        console.log(err);
      });
  };


  /**
   * This function will take all events from the array, and add to the calendar for display
   * @param {Object} api The underlying calendar API
   * @param {Array} eventArray The array of all events fetched from database
   */
  const addEventLoad = (api, eventArray) => {
    eventArray.forEach((element) => api.addEvent(element));
  };

  useEffect(() => {
    const api = calendarRef.current.getApi();
    fetchEventData(api);
  }, []);

  /**
   * Handle changes to an event title when adding
   */
  const handleTitleChange = (event) => {
    addEventAlert.title = event.target.value;
    addEventAlert.id = addEventAlert.title + addEventAlert.start;
  };

  /**
   * Handle changes to event note when adding
   */
  const handleNoteChange = (event) => {
    addEventAlert.note = event.target.value;
  };

  /**
   * Handle submission of new event, adding to local Calendar with API
   * and adding to database, then reset state for adding new events
   */
  const handleAddEventSubmit = () => {
    if (addEventAlert.title) {
      addEventAlert.calApi.addEvent({
        id: addEventAlert.id,
        title: addEventAlert.title,
        start: addEventAlert.start,
        end: addEventAlert.end,
        note: addEventAlert.note,
        allDay: addEventAlert.allDay,
      });
      let newEvent = {
        id: addEventAlert.id,
        title: addEventAlert.title,
        start: addEventAlert.start,
        end: addEventAlert.end,
        note: addEventAlert.note,
      };
      addNewEvent(newEvent);
      setAddEventAlert({
        id: "",
        title: "",
        start: "",
        end: "",
        info: "",
        open: false,
        calApi: null,
        allDay: "",
      });
    }
  };

  /**
   * Reset state if canceling event
   */
  const handleAddEventCancel = () => {
    setAddEventAlert({
      id: "",
      title: "",
      start: "",
      end: "",
      info: "",
      open: false,
      calApi: null,
      allDay: "",
    });
  };

  /**
   * This handles when a date is clicked on calendar, a new event object is created,
   * The handler then opens the alert for adding new event info to save to database
   * @param {Object} selected The selected date clicked on Calendar
   */
  const handleDateClick = (selected) => {
    const calendarApi = selected.view.calendar;
    setAddEventAlert({
      calApi: calendarApi,
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
      open: true,
    });
    calendarApi.unselect();
    console.log("Selected: ", addEventAlert);
  };

  const handleEventClick = (selected) => {
    setAlert({
      id: selected.event.id,
      title: selected.event.title,
      start: selected.event.startStr.toString(),
      info: selected.event.extendedProps.note,
      open: true,
    });
  };

  // Event Delete to handle cancel/no
  const handleNo = () => {
    setAlert({ open: false });
  };

  // Event Delete Alert "yes" handler, calls the deleteEvent function for removing event from database and closes dialog
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${alert.title}'`
      )
    ) {
      deleteEvent(alert.id);
      const api = calendarRef.current.getApi();
      let eventToDelete = api.getEventById(alert.id);
      eventToDelete.remove();
      setAlert({ id: null, open: false });
    }
  };

  const renderEventDialog = (event) => {
    return (
      <Dialog maxWidth="sm" fullWidth open={alert.open} onClose={handleNo}>
        <DialogTitle>{alert.title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Date:{" "}
            {formatDate(alert.start, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </DialogContentText>
          <DialogContentText>Note: {alert.info}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
          <Button ref={noButtonRef} onClick={handleNo} color="success">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderAddEventDialog = () => {
    return (
      <Box
        m={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Dialog
          maxWidth="sm"
          fullWidth
          open={addEventAlert.open}
        >
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent dividers style={{ overflow: "hidden" }}>
            <TextField
              autoFocus
              style={{ margin: 3 }}
              label="Event title"
              name="title"
              onChange={handleTitleChange}
              fullWidth
            />
            <TextField
              autoFocus
              style={{ margin: 3 }}
              label="Note"
              name="note"
              multiline
              rows={4}
              onChange={handleNoteChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              ref={noButtonRef}
              onClick={handleAddEventCancel}
              color="error"
            >
              Cancel
            </Button>
            <Button onClick={handleAddEventSubmit} color="success">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  return (
    <Box m="20px">
      <Header title="Calendar" />

      {/* Event Sidebar */}
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="8px"
          boxShadow="3"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                id={event.id}
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[800],
                  margin: "10px 0",
                  borderRadius: "2px",
                  cursor: "pointer",
                  boxShadow: "3",
                  "&:hover": {
                    backgroundColor: colors.blueAccent[700],
                    color: "white",
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                }}
                onClick={() => {
                  setAlert({
                    id: event.id,
                    title: event.title,
                    start: event.startStr.toString(),
                    info: event.extendedProps.note,
                    open: true,
                  });
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.startStr, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Dialogs for event view or add - default is hidden */}
        {renderEventDialog()}
        {renderAddEventDialog()}

        {/* Calendar */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            ref={calendarRef}
            eventBorderColor={colors.primary[100]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
