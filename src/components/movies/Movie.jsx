import { useEffect, useState } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import { getOneMovie, destroyMovie } from "../../api/fetch";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function Movie() {
  const [movie, setMovie] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getOneMovie(id)
      .then((movieData) => {
        setMovie(movieData);
        if (Object.keys(movieData).length === 0) {
          setLoadingError(true);
        } else {
          setLoadingError(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoadingError(true);
      });
  }, [id]);

  const navigate = useNavigate();

  function handleDelete(id) {
    destroyMovie(id)
      .then(() => {
        navigate("/movies");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <section className="movies-movie-wrapper">
      <h2>{movie.title}</h2>
      <section className="movies-movie">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {movie.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {movie.listedIn}
              </p>
              <p>
                <span>Country:</span> {movie.country}
              </p>
              <p>
                <span>Rating:</span> {movie.rating}
              </p>
              <p>
                <span>Date Added:</span> {movie.dateAdded}
              </p>
            </aside>
            <article>
              <p>{movie.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => handleDelete(movie.id)}>
                Remove Movie
              </button>
              <Link to={`/movies/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}
