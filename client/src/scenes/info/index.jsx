import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Link, useTheme } from "@mui/material";
import { tokens } from "../../theme";

/**
 * The Info component displays an accordian menu of system use information
 * to help users.
 */
const Info = () => {
  // Theme and colors
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      {/* Header component */}
      <Header title="Additional Information" />
      {/* Accordian menu */}
      <Box m={1} paddingBottom={5}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: colors.primary[400] }}
          >
            <Typography variant="h5">Volunteer Page</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                <li>
                  Volunteer data can be edited by double clicking on any
                  volunteer/row, making changes to multiple cells, then pressing
                  enter to save the changes.
                </li>
                <li>
                  All data can be filtered via the "Filters" tab located within
                  the tool bar in the upper left hand side of the table, or via
                  the quick search toolbar in the upper right.
                </li>
                <li>Data can be exported to CSV via the tool bar.</li>
                <li>
                  To email any grouping of volunteers, select the desired
                  volunteers, then press the "Email Selected" button to launch
                  the local mail client.
                </li>
                <li>New volunteers must have a unique email address.</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: colors.primary[400] }}
          >
            <Typography variant="h5">Site</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                <li>
                  Site functions similarly to the Volunteer page, see tab above.
                </li>
                <li>
                  Use the "Generic" site for logging any volunteer logs not
                  associated with a site.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: colors.primary[400] }}
          >
            <Typography variant="h5">Logs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                <li>
                  The Log page functions similarly to the Volunteer and Sites
                  page, displaying all logs in the system with filtering/search
                  abilities.
                </li>
                <li>
                  When adding a new log, select from existing volunteers and
                  sites in the system, as a log must be associated with both.
                </li>
                <li>
                  If no site information is available, use the "Generic" entry
                  for site.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: colors.primary[400] }}
          >
            <Typography variant="h5">Data Import</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                <li>
                  This page is useful for adding a table of pre-existing
                  volunteers to the system.
                </li>
                <li>Data import accepts CSV files only.</li>
                <li>
                  Pay attention to CSV header names, as they must match the
                  specified headers on the page.
                </li>
                <li>
                  If the email is a duplicate of an existing email, that
                  volunteer will not be added.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: colors.primary[400] }}
          >
            <Typography variant="h5">Calendar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                <li>
                  This page can be used to create events and keeping event
                  notes.
                </li>
                <li>
                  Click any date to launch the "Add Event" prompt and enter
                  necessary information. Event title is needed for saving.
                </li>
                <li>
                  Existing events can be clicked on in the sidebar, or on the
                  calendar to see event times and notes.
                </li>
                <li>
                  Event can be deleted by clicking the event and selecting the
                  "Delete" button.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: colors.primary[400] }}
          >
            <Typography variant="h5">More Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Link
                href="https://github.com/nfotinakes/mrc_volunteer_system"
                color={colors.greenAccent[700]}
                underline="hover"
                rel="noopener noreferrer"
                target="_blank"
              >
                Click here to visit the GitHub repository for more in-depth
                documentation!
              </Link>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Info;
