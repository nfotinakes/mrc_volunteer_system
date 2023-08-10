import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
import ListAltTwoToneIcon from "@mui/icons-material/ListAltTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import { tokens } from "../../theme";
import "react-pro-sidebar/dist/css/styles.css";

/**
 * A component for each item of the sidebar
 */
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

/**
 * The Sidebar component renders the navigational sidebar on the side of the application.
 * Is collapsable and can set the selected icon to the current page.
 */
const Sidebar = () => {
  // Variables for theme, color, and county image
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const imgSrc = theme.palette.img; // Image url set in theme file

  // Variables for if state is collapsed
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard"); // Default selected is Dashboard

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[700]} !important`, // was 400
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#89ce6e !important",
        },
        "& .pro-menu-item.active": {
          color: "#569b3b !important",
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        width="300px"
        image="../../../assets/morro_bay.jpg"
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  MRC Volunteers
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Display county logo if not collapsed */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="county-logo"
                  width="150px"
                  height="150px"
                  src={imgSrc}
                />
              </Box>
            </Box>
          )}

          {/* Populate sidebars with Item components and route to page */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeTwoToneIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <hr style={{ width: 200, marginLeft: 20 }} />

            <Item
              title="Volunteers"
              to="/volunteer"
              icon={<PeopleAltTwoToneIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sites"
              to="/sites"
              icon={<HomeWorkTwoToneIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Logs"
              to="/logs"
              icon={<ListAltTwoToneIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Data Import"
              to="/dataImport"
              icon={<PersonTwoToneIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <hr style={{ width: 200, marginLeft: 20 }} />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarMonthTwoToneIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Additional Info"
              to="/info"
              icon={<InfoTwoToneIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
