import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
      </Routes>
    </Router>
  );
}

export default App;
