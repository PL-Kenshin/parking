import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer"

function App() {
  return (
    <div className="container-fluid p-0"  style={{backgroundImage:"url(/parking.jpeg)", backgroundRepeat:"no-repeat",
    backgroundSize: 'cover'}}>
      <Navbar />
      <div className="container pt-5 min-vh-100">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
