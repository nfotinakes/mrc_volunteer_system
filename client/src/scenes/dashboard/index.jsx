import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import BarChart from "../../components/BarChart";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";

/**
 * This components renders the Dashboard with analytic grid and widgets
 */
const Dashboard = () => {

  // Import theme and color palette
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [hours, setHours] = useState(""); //store total volunteer hours
  const [recentVolunteers, setRecentVolunteers] = useState([]); // store most recent volunteers
  const [topHours, setTopHours] = useState([]); // store top volunteers by hours
  const [licensures, setLicensures] = useState([]); // May not be neccesary, possibly just use barchart component
  const [volunteerCount, setVolunteerCount] = useState([]); // store total volunteers
  const [siteCount, setSiteCount] = useState([]); // store total sites

  /**
   * Retrieve the total hours volunteerd from database
   */
  const fetchTotalHours = () => {
    console.log("Fetching License");
    fetch(`http://localhost:5000/stats/totalHours`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        if (responseData[0].total_hours === null) {
          setHours("0");
        } else {
          setHours(responseData[0].total_hours);
        }

        console.log(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Retrieve the 5 most recently added volunteers from database
   */
  const fetchRecentVolunteers = () => {
    console.log("Fetching Recent Volunteers");
    fetch(`http://localhost:5000/stats/recentVolunteers`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setRecentVolunteers(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Fetch the count of all different licensures in the system
   */
  const fetchLicensures = () => {
    console.log("Fetching Licensures");
    fetch(`http://localhost:5000/stats/licenseCount`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setLicensures(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Fetch the 5 top volunteers by total hours volunteered
   */
  const fetchTopHours = () => {
    console.log("Fetching Top Volunteers");
    fetch(`http://localhost:5000/stats/topHours`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setTopHours(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Fetch count of all volunteers in the system
   */
  const fetchVolunteerCount = () => {
    console.log("Fetching Volunteer Count");
    fetch(`http://localhost:5000/stats/volunteerCount`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setVolunteerCount(responseData[0].total_volunteers);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Fetch count of all sites in the system
   */
  const fetchSiteCount = () => {
    console.log("Fetching Volunteer Count");
    fetch(`http://localhost:5000/stats/siteCount`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setSiteCount(responseData[0].total_sites);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * useEffect hook to call all fetch functions for widgets
   */
  useEffect(() => {
    fetchTotalHours();
    fetchRecentVolunteers();
    fetchTopHours();
    fetchLicensures();
    fetchVolunteerCount();
    fetchSiteCount();
  }, []);

  return (
    <Box m="20px">
      {/* Header section */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome MRC Coordinator!" />
      </Box>

      {/* Grid section */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(10, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Row 1, Column 1 widget to display top volunteers by hour */}
        <Box
          gridColumn="span 2"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={"16px"}
          sx={{ boxShadow: "2" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`2px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography
              color={colors.greenAccent[400]}
              variant="h5"
              fontWeight="600"
            >
              Top Volunteers by Hour
            </Typography>
          </Box>

          {topHours.map((volunteer) => (
            <Box
              key={`${volunteer.volunteer_id}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography color={colors.grey[100]}>
                  {volunteer.first_name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {volunteer.last_name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{volunteer.total_hours}</Box>
            </Box>
          ))}
        </Box>

        {/* Row 1, column 3 start - display a barchart of all licenses */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={"16px"}
          sx={{ boxShadow: "2" }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.greenAccent[400]}
          >
            Licensures
          </Typography>
          <Box height="300px">
            <BarChart />
          </Box>
          <Typography
            variant="h5"
            color={colors.primary[100]}
            sx={{ mt: "15px" }}
            align="center"
          >
            Breakdown of Volunteer Licensures
          </Typography>
        </Box>

        {/* Row 1, column 6 - display most recently added volunteers */}
        <Box
          gridColumn="span 2"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={"16px"}
          sx={{ boxShadow: "2" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`2px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography
              color={colors.greenAccent[400]}
              variant="h5"
              fontWeight="600"
            >
              Recently Added Volunteers
            </Typography>
          </Box>

          {recentVolunteers.map((volunteer) => (
            <Box
              key={`${volunteer.volunteer_id}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography color={colors.grey[100]}>
                  {volunteer.first_name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {volunteer.last_name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
                {new Date(
                  Date.parse(volunteer.input_date.split("T")[0])
                ).toLocaleDateString("en-US")}
              </Box>
            </Box>
          ))}
        </Box>
        {/* Second row - total volunteer hours */}
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={"16px"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ boxShadow: "2" }}
        >
          <Box display="flex" justifyContent="space-between">
            <AccessTimeTwoToneIcon
              sx={{
                color: colors.greenAccent[300],
                fontSize: "36px",
                padding: "5px",
              }}
            />

            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
                padding={"5px"}
              >
                Total Hours:
              </Typography>
            </Box>

            <Typography variant="h4" padding={"5px"}>
              {hours}
            </Typography>
          </Box>
        </Box>

        {/* Row 2 - total volunteers in system */}
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={"16px"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ boxShadow: "2" }}
        >
          <Box display="flex" justifyContent="space-between">
            <PeopleAltTwoToneIcon
              sx={{
                color: colors.greenAccent[300],
                fontSize: "36px",
                padding: "5px",
              }}
            />

            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
                padding={"5px"}
              >
                Total Volunteers:
              </Typography>
            </Box>

            <Typography variant="h4" padding={"5px"}>
              {volunteerCount}
            </Typography>
          </Box>
        </Box>

        {/* Row 2, total sites in system */}
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={"16px"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ boxShadow: "2" }}
        >
          <Box display="flex" justifyContent="space-between">
            <HomeWorkTwoToneIcon
              sx={{
                color: colors.greenAccent[300],
                fontSize: "36px",
                padding: "5px",
              }}
            />

            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
                padding={"5px"}
              >
                Total Sites:
              </Typography>
            </Box>

            <Typography variant="h4" padding={"5px"}>
              {siteCount}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
