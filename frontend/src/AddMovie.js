import { useState } from 'react';
import { addMovie } from './api';

export default function AddMovie() {
  const [formData, setFormData] = useState({
    title: '',
    release_year: '',
    genre: '',
    personal_notes: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(formData).then(() => alert('Movie added!'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="release_year" placeholder="Year" onChange={handleChange} />
      <input name="genre" placeholder="Genre" onChange={handleChange} />
      <textarea name="personal_notes" placeholder="Notes" onChange={handleChange} />
      <button type="submit">Add Movie</button>
    </form>
  );
}
