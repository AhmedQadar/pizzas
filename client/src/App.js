import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Body';
import Navbar from './Components/Navbar';
import Restaurant from './Components/Restaurant';
import Footer from './Components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/restaurants/:id" element={<Restaurant />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;