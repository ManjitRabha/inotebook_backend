import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

import Home from './components/Home'
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <Alert message={"This is amazing react course"} />
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>,
      </NoteState>

    </>
  );
}

export default App;
