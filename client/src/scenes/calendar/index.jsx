import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  DialogContentText,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useState, useEffect, createRef, useRef } from "react";
import EventDialog from "./EventDialog";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

//TODO: Calendar needs work. Not working with backend. Maybe Drop sidebar
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

  const fetchEventData = (api) => {
    let firstEvents = [];
    console.log("Fetching Events");
    // const token = Cookies.get("XSRF-TOKEN");
    fetch(`http://localhost:5000/event`)
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

  const addNewEvent = (event) => {
    fetch(`http://localhost:5000/event/new`, {
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

  // Fetch call to delete a volunteer by ID
  const deleteEvent = (id) => {
    console.log("Deleting Event ID: " + id);
    fetch(`http://localhost:5000/event/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        // setSnackbar({
        //   children: "Volunteer successfully deleted",
        //   severity: "success",
        // });
      })
      .catch((err) => {
        console.log("error deleting...");
        console.log(err);
        // setSnackbar({
        //   children: "Error deleting volunteer",
        //   severity: "error",
        // });
      });
  };

  // async function fetchEventData() {
  //   let response = await fetch(`http://localhost:5000/event`);
  //   let events = await response.json();
  //   return events;
  // }

  const addEventLoad = (api, eventArray) => {
    console.log(eventArray);
    eventArray.forEach((element) => api.addEvent(element));
  };

  useEffect(() => {
    const api = calendarRef.current.getApi();
    fetchEventData(api);
  }, []);

  const getCurrentEvents = () => {
    return currentEvents;
  };

  const handleTitleChange = (event) => {
    addEventAlert.title = event.target.value;
    addEventAlert.id = addEventAlert.title + addEventAlert.start;
  };

  const handleNoteChange = (event) => {
    addEventAlert.note = event.target.value;
  };

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

  const handleDateClick = (selected) => {
    // const title = prompt("Enter event title:");
    // const note = prompt("Enter event info/note:");
    // const calendarApi = selected.view.calendar;
    // calendarApi.unselect();
    // const id = title+selected.startStr;
    // let newEvent = {
    //   id: id,
    //   title: title,
    //   start: selected.startStr,
    //   end: selected.endStr,
    //   note: note,
    // };
    // if (title) {
    //   calendarApi.addEvent({
    //     id,
    //     title,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     allDay: selected.allDay,
    //     note,
    //   });
    //   console.log("New Event: ", newEvent);
    //   addNewEvent(newEvent);
    // }

    // addEventAlert.start = selected.startStr;
    // addEventAlert.end = selected.endStr;
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

    // console.log("Title: ", selected.event.title);
    // console.log("ID: ", selected.event.id);
    // console.log("Start: ", selected.event.start);
    // console.log("End: ", selected.event.end)
    // console.log("Extended: ", selected.event.extendedProps);
    // console.log("Selected: ", selected)
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the event '${selected.event.title}'`
    //   )
    // ) {
    //   deleteEvent(selected.event.id);
    //   selected.event.remove();
    // }
  };

  // const handleItemClick = (event) => {
  //   console.log("Item Clicked ID: ", event);
  //   return (<EventDialog event={event}/>);
  // };

  // Volunteer Delete to handle cancel/no
  const handleNo = () => {
    setAlert({ open: false });
  };

  // Volunteer Delete Alert "yes" handler, calls the deleteVolunteer function for removing volunteer from database and closes alert
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
  const handleEntered = () => {};

  const renderEventDialog = (event) => {
    return (
      <Dialog
        maxWidth="sm"
        fullWidth
        // TransitionProps={{ onEntered: handleEntered }}
        open={alert.open}
        onClose={handleNo}
      >
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
      //margin
      display="flex"
      justifyContent="flex-end"
      alignItems="flex-end">
      <Dialog
        maxWidth="sm"
        fullWidth
        // TransitionProps={{ onEntered: handleEntered }}
        open={addEventAlert.open}
        // onClose={handleNo}
      >
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent dividers style={{overflow: "hidden"}} >
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

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
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
                // onClick={(key) => handleItemClick(key)}
                // onClick={() => {handleItemClick(event)}}

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

        {renderEventDialog()}
        {renderAddEventDialog()}

        {/* CALENDAR */}
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

            // events={getCurrentEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
