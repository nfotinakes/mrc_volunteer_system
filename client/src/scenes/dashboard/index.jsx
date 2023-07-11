import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";

//TODO: Create analytical widgets
const Dashboard = () => {
  const [volunteers, setVolunteers] = useState([]);

  const fetchVolunteerData = () => {
    console.log("fetch Volunteers");
    // const token = Cookies.get("XSRF-TOKEN");

    fetch(`http://localhost:5000/volunteer`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setVolunteers(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchVolunteerData();
  }, []);

  //TODO: Could use header here see commented out section below
  return (
    <Box>
      <div>Dashboard</div>
      <div style={{ width: "100%" }}>
        For DEBUG: display state.<br></br>
        {JSON.stringify(volunteers)}
      </div>
    </Box>
  );
};

// const Dashboard = () => {
//   return (
//     <Box m="20px">
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Header title="DASHBOARD" subtitle="Welcome to your dashboard"></Header>
//       </Box>
//     </Box>
//   );
// };

export default Dashboard;
