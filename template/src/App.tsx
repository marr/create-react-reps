import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Palette from "./Palette.tsx";
import Practice from "./Practice.tsx";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <BrowserRouter basename={routerBasename || undefined}>
      <Routes>
        <Route element={<Practice />} path="/" />
        <Route element={<Palette />} path="/palette" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
