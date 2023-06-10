import React from "react";
import { useMovies } from "../hooks/useMovies"

interface ContextType {
    loading: boolean;
    error: string | boolean;
    item: Array<object>;
    search: string;
    sort: boolean;
    getMovies: (params: { search: string }) => Promise<void>;
    onSearch: (search: string) => void;
    onSort: () => void;
}
const Context = React.createContext<ContextType>({} as ContextType);

function MoviesProvider({ children }: any) {
    const { error, loading, item, search, sort, getMovies, onSearch, onSort } = useMovies();
    return(
        <Context.Provider value={
            {
            error, 
            loading, 
            item, 
            search,
            sort,
            getMovies,
            onSearch,
            onSort
            }}>
            { children }
        </Context.Provider>
    )
}

export { MoviesProvider, Context }