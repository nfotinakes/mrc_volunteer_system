import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

/**
 * BarChart component is used to display all licensure types in the system.
 * Utilizes the Nivo library for analytical display. View Nivo documentation for
 * more details on how to use barchart.
 * @returns the bar chart
 */
const BarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [licensures, setLicensures] = useState([]); // licensure count

  /**
   * Fetch licensure count from the database and save to state
   */
  const fetchLicensures = () => {
    console.log("Fetching Licensures");
    fetch(`http://localhost:5000/stats/licenseCount`)
      .then((response) => {
        console.log("Fetch licensure count response: ", response);
        return response.json();
      })
      .then((responseData) => {
        setLicensures(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchLicensures();
  }, []);

  return (
    <ResponsiveBar
      data={licensures}
      keys={["Total"]}
      indexBy="licensure"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={colors.blueAccent[400]}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Licensures",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Count",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelTextColor={colors.primary[700]}
    />
  );
};

export default BarChart;
