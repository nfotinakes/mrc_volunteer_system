import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Volunteer from "./scenes/volunteer";
import Sites from "./scenes/sites";
import Logs from "./scenes/logged";
import Calendar from "./scenes/calendar";
import DataImport from "./scenes/data_import";
import Info from "./scenes/info";
import { ColorModeContext, useMode } from "./theme";

/**
 * App is the top component of the application.
 * The entire app is wrapped with the ThemeProvider and ColorMode to 
 * give the themeing sitewide. 
 * Side and Top bars are global components, and the rest of the pages are routed.
 */
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
              <Route path="/info" element={<Info />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
