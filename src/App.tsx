import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./container/Landing";
import Kanban from "./container/Kanban";
import { AppProvider } from "./lib/Providers";
import { GlobalStyles } from "./lib/globalStyles";
import { darkTheme } from "./lib/theme";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <GlobalStyles theme={darkTheme} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
