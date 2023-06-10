import React from "react";
import { searchMovies } from "../services/movies.js";

function useMovies() {
    const [state, dispatch] = React.useReducer(reducer, initialState); 
    const { error, loading, item, search, sort } = state;
    const previousSearch = React.useRef(search);
    const isFirstInput = React.useRef(true)

    const onError = (error: string | boolean) => dispatch({ type: actionTypes.error, payload: error });
    const onSuccess = (movies: object | undefined) => dispatch({ type: actionTypes.success, payload: movies });
    const onLoading = () => dispatch({ type: actionTypes.loading });
    const onSearch = (search: string) => dispatch({ type: actionTypes.search, payload: search });
    const onSort = () => dispatch({ type: actionTypes.sort });

    React.useEffect(() => {
        if (isFirstInput.current) {
          isFirstInput.current = search === ''
          return
        }
    
        if (search === '') {
            onError('No se puede buscar una película vacía')
            return
        }
    
        if (search.match(/^\d+$/)) {
            onError('No se puede buscar una película con un número')
            return
        }
    
        if (search.length < 3) {
            onError('La búsqueda debe tener al menos 3 caracteres')
            return
        }
    
        onError(false)
      }, [search])

    const getMovies = React.useCallback(async ({ search }: { search: string })  => {
        if (search === previousSearch.current) return

        onLoading();
        try {
            previousSearch.current = search;
            const newMovies = await searchMovies({ search });
            onSuccess(await newMovies);
        } catch (error: any) {
            onError(error.message);
            throw new Error(error.message);
        } 
    }, [])

    const sortedMovies = React.useMemo(() => {
        return sort && item ? [...item].sort((a, b) => a.title.localeCompare(b.title)) : item
      }, [sort, item])

    return { error, loading, item: sortedMovies, search, sort, getMovies, onSearch, onSort }
}

const initialState = {
    error: false,
    loading: false,
    item: [],
    search: "", 
    sort: false
};

const actionTypes = {
    error: "ERROR",
    success: "SUCESS",
    loading: "LOADING",
    search: "SEARCH",
    sort: "SORT"
}

const reducerObject = (state: typeof initialState, payload: any) => ({
    [actionTypes.error]: {
        ...state,
        error: payload,
        loading: false
    },
    [actionTypes.success]: {
        ...state,
        error: false,
        item: payload,
        loading: false
    },
    [actionTypes.loading]: {
        ...state,
        loading: true
    },
    [actionTypes.search]: {
        ...state,
        search: payload
    },
    [actionTypes.sort]: {
        ...state,
        sort: !state.sort
    }
})

const reducer = (state: typeof initialState, action: any) => {
    return reducerObject(state, action.payload)[action.type] || state;
}

export { useMovies }