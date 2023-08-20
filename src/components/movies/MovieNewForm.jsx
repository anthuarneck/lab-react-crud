import { createMovie } from "../../api/fetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

const MovieNewForm = () => {
  const [movie, setMovie] = useState({
    type: "",
    title: "",
    country: "",
    dateAdded: "",
    releaseYear: "",
    rating: "",
    duration: "",
    listedIn: "",
    description: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    createMovie(movie)
      .then((createdMovie) => {
        console.log(createdMovie)
        alert(`New movie created: ${createdMovie.title}`);
        navigate(`/movies/${createdMovie.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleTextChange(e) {
    setMovie({
      ...movie,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={movie.title}
        onChange={handleTextChange}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={movie.description}
        onChange={handleTextChange}
      />

      <label htmlFor="type">Type:</label>
      <input
        type="text"
        id="type"
        value={movie.type}
        onChange={handleTextChange}
      />

      <label htmlFor="type">Rating:</label>
      <input
        type="text"
        id="rating"
        value={movie.rating}
        onChange={handleTextChange}
      />

      <label htmlFor="listedIn">Listed In:</label>
      <input
        type="text"
        id="listedIn"
        value={movie.listedIn}
        onChange={handleTextChange}
      />

      <label htmlFor="duration">Duration:</label>
      <input
        type="text"
        id="duration"
        value={movie.duration}
        onChange={handleTextChange}
      />

      <label htmlFor="releaseYear">Release Year:</label>
      <input
        type="text"
        id="releaseYear"
        value={movie.releaseYear}
        onChange={handleTextChange}
      />

      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        value={movie.country}
        onChange={handleTextChange}
      />

      <label htmlFor="dateAdded">Date Added:</label>
      <input
        type="text"
        id="dateAdded"
        value={movie.dateAdded}
        onChange={handleTextChange}
      />

      <br />

      <input type="submit" />
    </form>
  );
};

export default MovieNewForm;