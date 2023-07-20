import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Volunteer from "./scenes/volunteer";
import Sites from "./scenes/sites";
import Logs from "./scenes/logged";
import Calendar from "./scenes/calendar";
import DataImport from "./scenes/data_import";
import BarChart from "./components/BarChart";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/dataImport" element={<DataImport />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/bar" element={<BarChart />} />


            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
