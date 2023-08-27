import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import OpenerPage from "./OpenerPage";
import SortZone from "./SortZone";
import PathZone from './PathZone';
import SearchZone from './SearchZone'
const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<OpenerPage />} />
          <Route path="/SortZone" element={<SortZone />} />
          <Route path="/PathZone" element={<PathZone />} />
          <Route path="/SearchZone" element={<SearchZone />} />
        </Routes>
      </Router>
  );
};

export default App;
