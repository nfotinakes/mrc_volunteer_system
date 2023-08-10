import { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext } from "../../theme";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

/**
 * The Topbar component is the global component that holds the 
 * dark/light mode toggle. Any other menu items could be added here
 */
const Topbar = () => {
  // Theme and colors
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
