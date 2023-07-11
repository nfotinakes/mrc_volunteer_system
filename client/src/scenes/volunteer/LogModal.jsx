import { useState } from "react";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { tokens } from "../../theme";
import { Box, Typography, useTheme, Modal, IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LogModal = ({ id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <ArticleOutlinedIcon
          sx={{ color: colors.blueAccent[600] }}
        ></ArticleOutlinedIcon>
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Log Modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Data Grid with logs of volunteer by ID Volunteer ID: {id}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default LogModal;
