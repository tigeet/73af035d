import FontPage from "pages/fontPage";
import GridPage from "pages/gridPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GridPage />} />
        <Route path="/:id" element={<FontPage />} />
      </Routes>
    </>
  );
}

export default App;
