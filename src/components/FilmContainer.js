import "../App.css";

function FilmContainer({ firstFilm }) {
  return (
    <div className="film-container">
      <article className="film-item">
        <h2>{firstFilm?.title}</h2>
        <img
          className="film-item__img"
          src={firstFilm?.image}
          alt={firstFilm?.title}
        />
      </article>
    </div>
  );
}

export default FilmContainer;
