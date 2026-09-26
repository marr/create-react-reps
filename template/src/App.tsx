import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Palette from "./Palette.tsx";
import Practice from "./Practice.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Practice />} path="/" />
        <Route element={<Palette />} path="/palette" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
