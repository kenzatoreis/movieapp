import { useEffect, useState } from 'react';
import { getMovies, deleteMovie } from './api';

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then((res) => setMovies(res.data));
  }, []);

  const handleDelete = (id) => {
    deleteMovie(id).then(() =>
      setMovies((prev) => prev.filter((m) => m.id !== id))
    );
  };

  return (
    <div className="container mt-4 ">
      
      <div className="row justify-content-center">
      <h2 className="text-center mb-4">My Movie List</h2>
        {movies.map((movie) => (
          <div className="col-md-4 mb-4" key={movie.id}>
            
            <div className="card h-100 ">
              <img
                src="https://via.placeholder.com/286x180.png?text=Movie+Poster"
                className="card-img-top"
                alt={`${movie.title} Poster`}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text text-muted">
                  {movie.release_year} – {movie.genre}
                </p>
                <p className="card-text">{movie.personal_notes}</p>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => handleDelete(movie.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
