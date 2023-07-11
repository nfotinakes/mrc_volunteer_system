import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import AddSite from "./AddSite";

const Sites = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sites, setSites] = useState([]);
  const [snackbar, setSnackbar] = useState(null);

  // Fetch all Sites from database
  const fetchSiteData = () => {
    console.log("Fetching Volunteers");

    fetch(`http://localhost:5000/site`)
      .then((response) => {
        console.log("FETCH RESP:" + response);
        return response.json();
      })
      .then((responseData) => {
        setSites(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addSite = (site) => {
    fetch(`http://localhost:5000/site/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(site),
    })
      .then((res) => {
        console.log(res);
        fetchSiteData();
        setSnackbar({
          children: "Volunteer succesfully added!",
          severity: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // On Page load, fetch all sites
  useEffect(() => {
    fetchSiteData();
  }, []);

  // Column info for datagrid
  const columns = [
    { field: "site_id", headerName: "ID", flex: 0.5 },
    {
      field: "site_name",
      headerName: "Site Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "city",
      headerName: "city",
      flex: 1,
    },
    {
      field: "zipcode",
      headerName: "Zipcode",
      flex: 1,
    },
    {
      field: "note",
      headerName: "Note",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="SITES"></Header>
      <div style={{ width: "100%" }}>
        For DEBUG: display state.<br></br>
        {JSON.stringify(sites)}
      </div>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            // borderBottom: "none",
          },
          "& .name-column--cell": {
            // color: colors.greenAccent[400],
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
        <AddSite addSite={addSite}></AddSite>
        <DataGrid
          getRowId={(row) => row.site_id}
          rows={sites}
          columns={columns}
          disableRowSelectionOnClick
          editMode="row"
          loading={!sites.length}
          // processRowUpdate={processRowUpdate}
          // onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Sites;
