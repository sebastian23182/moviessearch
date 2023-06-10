import React from "react";
import './App.css';
import { Context } from "./context/Context";
import { Movies } from "./components/Movies";
import debounce from 'just-debounce-it'

function App() {
  const { error, loading, item, search, sort, getMovies, onSearch, onSort } = React.useContext(Context);

  const debouncedGetMovies = React.useCallback(
    debounce((search: string) => {
      getMovies({ search })
    }, 300), [getMovies]
  )

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    getMovies({ search });
  }

  const handleSort = () => {
    onSort();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    onSearch(newSearch);
    debouncedGetMovies(newSearch);
  }

  return(
        <div className="container">
          <header>
            <h1>Buscar pelicula</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} placeholder="Avatar, Avengers, Star Wars, The Matrix..." onChange={handleChange}/>
              <button type="submit">Buscar</button>
              <input type='checkbox' onChange={handleSort} checked={sort}/>
            </form>  
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </header>
          <main>
            {
              loading ? <p>Cargando...</p> : <Movies movies={item as []}/>
            }
          </main>
        </div>
  )
}

export default App
