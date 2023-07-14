import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import PieChart from "../../components/PieChart";

//TODO: Fix Grid/Create more widgets
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [hours, setHours] = useState("");
  const [volunteers, setVolunteers] = useState([]);

  const fetchTotalHours = () => {
    console.log("Fetching License");
    // const token = Cookies.get("XSRF-TOKEN");
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

  useEffect(() => {
    fetchTotalHours();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* Grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={"16px"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          
        >
          
          <Box
            display="flex"
            justifyContent="space-between"
            
          >
            
            <AccessTimeTwoToneIcon
              sx={{ color: colors.greenAccent[300], fontSize: "36px" }}
            />
            
            
            <Box>
              
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                Total Hours Volunteered
              </Typography>
              
            </Box>

            <Typography variant="h4">{hours}</Typography>
          </Box>
        </Box>
        {/* ROW 3 */}
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={"16px"}
        >
          <Typography variant="h5" fontWeight="600">
            Licensures
          </Typography>
          <Box height="300px">
            <PieChart />
          </Box>
          <Typography
            variant="h5"
            color={colors.blueAccent[400]}
            sx={{ mt: "15px" }}
            align="center"
          >
            Breakdown of Volunteer Licensures
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
