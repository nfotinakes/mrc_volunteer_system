import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useState, useEffect, createRef } from "react";

//TODO: Calendar needs work. Not working with backend. Maybe Drop sidebar
const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const calendarRef = createRef();

  const fetchEventData = () => {
    console.log("Fetching Events");
    // const token = Cookies.get("XSRF-TOKEN");
    fetch(`http://localhost:5000/event`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setCurrentEvents(responseData);
        // addEventLoad(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addEventLoad = (eventArray) => {
    const api = calendarRef.current.getApi();
    eventArray.forEach((element) => api.addEvent(element));
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const handleDateClick = (selected) => {
    const id = prompt("Enter a unique ID:");
    const title = prompt("Enter event title:");
    const info = prompt("Enter event info:");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    console.log("StartStr: ", selected.startStr);
    console.log("EndStr: ", selected.endStr);
    console.log("allDay: ", selected.allday);

    if (title) {
      calendarApi.addEvent({
        id,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
        info,
      });
      console.log(currentEvents);
    }
  };

  const handleEventClick = (selected) => {
    console.log(selected.event.title);
    console.log(selected.event.id);
    console.log(selected.event.startStr);
    console.log(selected.event.extendedProps);
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleItemClick = (e) => {
    console.log("Item Clicked");
    console.log(e);
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
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[800],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
                onClick={(key) => handleItemClick(key)}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
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
            // initialEvents={addEventLoad(currentEvents)}
            ref={calendarRef}
            // initialEvents={[
            //   {
            //     id: "12315",
            //     title: "All-day event",
            //     date: "2023-07-14",
            //   },
            //   {
            //     id: "5123",
            //     title: "Timed event",
            //     date: "2023-07-28",
            //   },
            // ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
