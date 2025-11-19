import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';


function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;