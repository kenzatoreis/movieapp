import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const getMovies = () => axios.get(`${BASE_URL}/`);
export const addMovie = (movie) => axios.post(`${BASE_URL}/movies`, movie);
export const updateMovie = (id, movie) => axios.put(`${BASE_URL}/movies/${id}`, movie);
export const deleteMovie = (id) => axios.delete(`${BASE_URL}/movies/${id}`);
