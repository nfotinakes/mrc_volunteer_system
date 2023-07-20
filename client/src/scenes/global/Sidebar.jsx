import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
import ListAltTwoToneIcon from "@mui/icons-material/ListAltTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";

//TODO: Fix Icon change on refresh: perhapes localstorage
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

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const imgSrc = theme.palette.img;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  console.log(imgSrc);

  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
    console.log("Local:", localStorage.getItem("selected"));
    console.log("Selected", selected);
  }, [selected]);

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
