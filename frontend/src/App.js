import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import Sidebar from './Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Movies</Link>
        <Link to="/add">Add Movie</Link>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/add" element={<AddMovie />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
