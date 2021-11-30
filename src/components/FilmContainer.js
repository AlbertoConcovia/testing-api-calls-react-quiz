
function FilmContainer({firstFilm}) {
  return (
    <div>
      <h2>{firstFilm?.title}</h2>
      <img
        className="character-item__img"
        src={firstFilm?.image}
        alt={firstFilm?.title}
      />
    </div>
  );
}

export default FilmContainer;
