import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

/**
 * Header component accepts a title and subtitle as parameters
 * This can be used on a page for a title and optional subtitle.
 * Subtitle is an alternate color.
 */
const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      {/* Title */}
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      {/* Subtitle */}
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
