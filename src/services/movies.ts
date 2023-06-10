interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
}

export const searchMovies = async ({ search }: { search: string }) => {
    if (search === "") return null

    try {
        const API_KEY = '4287ad07'
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
        const data = await response.json();

        const movies = data.Search

        return movies?.map((movie: Movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster
        }))
    } catch (error) {
        throw new Error("Error en la busqueda");
    }
}