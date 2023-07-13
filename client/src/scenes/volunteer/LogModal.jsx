import { useState, useEffect } from "react";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { tokens } from "../../theme";
import { Box, Typography, useTheme, Modal, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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

const LogModal = ({ id, name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const[hours, setHours] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchLogs = (id) => {
    console.log("Fetching Logs");
    // const token = Cookies.get("XSRF-TOKEN");
    fetch(`http://localhost:5000/log/volId?id=${id}`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setLogs(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchHours = (id) => {
    console.log("Fetching Logs");
    // const token = Cookies.get("XSRF-TOKEN");
    fetch(`http://localhost:5000/log/volHours?id=${id}`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        if(responseData[0].total_hours === null) {
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
    if (open) {
      fetchLogs(id);
      fetchHours(id);
    }
  }, [id, open]);

  // Column info for datagrid
  const columns = [
    { field: "log_id", headerName: "Log ID", flex: 0.25 },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 0.75,
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 0.75,
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "site_name",
      headerName: "Site Name",
      flex: 0.75,
      editable: true,
    },
    {
      field: "zipcode",
      headerName: "Zipcode",
      flex: 0.5,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      editable: true,
      flex: 0.75,
    },
    {
      field: "hours",
      headerName: "Hours",
      flex: 0.75,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.75,
      editable: true,
    },
    {
      field: "note",
      headerName: "Note",
      flex: 1.5,
      editable: true,
    },
  ];

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <ArticleOutlinedIcon
          sx={{ color: colors.blueAccent[600] }}
        ></ArticleOutlinedIcon>
      </IconButton>
      <Box>
        {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
        <Dialog
          fullWidth
          maxWidth="false"
          open={open}
          onClose={handleClose}
          sx={{ color: "success" }}
          PaperProps={{
            style: {
              backgroundColor: colors.primary[700],
              boxShadow: "none",
            },
          }}
        >
          <DialogTitle style={{fontSize: 18, color: colors.greenAccent[200]}}>Viewing all logs for {name}</DialogTitle>
          <DialogContent style={{ paddingTop: 20 }}>
            <Box
              // m="40px 0 0 0"
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .name-column--cell": {
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.primary[400],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[700],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.primary[400],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
              {/* <div style={{ width: "50%", margin: "auto" }}>
            <div style={{ height: "75%", width: "100%" }}> */}
              <DataGrid
                // checkboxSelection
                rows={logs}
                columns={columns}
                getRowId={(row) => row.log_id}
                disableRowSelectionOnClick
                editMode="row"
                // processRowUpdate={processRowUpdate}
                // onProcessRowUpdateError={handleProcessRowUpdateError}
                slots={{ toolbar: GridToolbar }}
              />
              {/* </div>
          </div> */}
            </Box>
          </DialogContent>

          {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Log Modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Data Grid with logs of volunteer by ID Volunteer ID: {id}
          </Typography>
        </Box> */}
        <Box marginLeft={5} color={colors.greenAccent[200]}>
          Total Hours Volunteered: {hours}
        </Box>
        <div>
          
        </div>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* </Modal> */}
      </Box>
    </div>
  );
};

export default LogModal;
