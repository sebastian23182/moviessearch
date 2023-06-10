interface Movie {
  id: string;
  title: string;
  year: string;
  image: string;
}

interface ListOfMoviesProps {
  movies: Movie[];
}

function ListOfMovies ({ movies }: ListOfMoviesProps) {
    return (
      <ul className='movies'>
        {
          movies.map((movie) => (
            <li className='movie' key={movie.id}>
              <img
              src={movie.image !== "N/A" ? movie.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
              alt={movie.title}/>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
            </li>
          ))
        }
      </ul>
    )
}  
  
export function Movies ({ movies }: ListOfMoviesProps) {
    const hasMovies = movies?.length > 0;
  
    return (
      hasMovies
        ? <ListOfMovies movies={movies}/>
        : <p>No se encontraron películas para esta búsqueda</p>
    )
  }