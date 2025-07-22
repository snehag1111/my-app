import React, { useEffect, useState } from 'react';
import GenreSelect from './GenreSelect';
import SearchForm from './SearchForm';
import Movie from './Movie';
import MovieDetails from './MovieDetails';
import Dialog from './Dialog';
import MovieForm from './MovieForm';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function MovieListPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const initialSearchQuery = searchParams.get('query') || '';
    const initialGenre = searchParams.get('genre') || 'ALL';
    const initialSortBy = searchParams.get('sortBy') || 'release_date';
    
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [selectedGenre, setSelectedGenre] = useState(initialGenre);
    const [sortBy, setSortBy] = useState(initialSortBy);
    const [moviesList, setMoviesList] = useState({
        "totalAmount": 0,
        "data": []
    });

    const [selectedMovieDetail, setSelectedMovieDetail] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('ADD MOVIE');
    const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

    
    const buttonStyle = {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '10px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '12px',
        transition: 'background-color 0.3s',
        marginRight: '10px',
        marginTop: '10px',
        position: 'absolute',
        right: '500px',
        top: '30px',
    };  

    const handleMovieSelect = (movie) => {
        console.log('movie');
        console.log(movie.id);
        const newSearchParams = new URLSearchParams();
        newSearchParams.set('query', searchQuery);
        newSearchParams.set('genre', selectedGenre);
        newSearchParams.set('sortBy', sortBy);

        navigate(`/movie/${movie.id}?${newSearchParams.toString()}`);
    };

    const handleMovieAdd = () => {
        setSelectedMovie(null);
        setSelectedMovieDetail(false);
        setTitle('ADD MOVIE');
        navigate('/new');
    }

        const handleMovieEdit = (movie) => {
        console.log(movie);
        setSelectedMovie(movie);
        setSelectedMovieDetail(false);
        setTitle('EDIT MOVIE');
        navigate(`/edit/${movie.id}`);
    }

    const handleSearchIcon = () => {
        setSelectedMovieDetail(false);
        setSelectedMovie(null);
        const newSearchParams = new URLSearchParams();
        newSearchParams.set('query', searchQuery);
        newSearchParams.set('genre', selectedGenre);
        newSearchParams.set('sortBy', sortBy);
        navigate(`/?${newSearchParams.toString()}`);
    };

    
    const closeDialog = () => {
        setIsOpen(false);
        navigate('/');
    }

    const handleMovie = async (movie) => {
        console.log('movie to edit');
        console.log(movie);
        const pathname = location.pathname;
        const isAdd = pathname.endsWith('/new');
        const isEdit = /^\/edit\/\d+/.test(pathname);
        if(isAdd) {
        const response = await fetch('http://localhost:4000/movies', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: movie.title, 
                release_date: movie.releaseDate,
                poster_path: movie.movieUrl, 
                overview: movie.overview,
                runtime: movie.runtime,
                genres: Array.isArray(movie.genre) ? movie.genre : [movie.genre] 
            }),
        });
        if(!response.ok)
            console.log('Failed to add movie');
        else {
            const data = await response.json();
            console.log(data);
        }
        }
        if(isEdit) {
            const response = await fetch('http://localhost:4000/movies', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: movie.id,
                    title: movie.title,
                release_date: movie.releaseDate,
                poster_path: movie.movieUrl, 
                overview: movie.overview,
                runtime: movie.runtime, 
                genres: Array.isArray(movie.genre) ? movie.genre : [movie.genre]
                }),
            });
            if(!response.ok)
                console.log('Failed to edit movie');
            else {
                const data = await response.json();
                console.log(data);
            }
        }
        closeDialog();
    };

    const fetchMovie = async() => {
        const baseUrl = 'http://localhost:4000/movies';
        const params = new URLSearchParams();
        if(selectedGenre !== 'ALL')
            params.append('filter', selectedGenre);
        params.append('limit', 50); 
        params.append('search', searchQuery);
        params.append('searchBy', 'title');
        params.append('sortOrder', 'asc');
        params.append('sortBy', sortBy);
        const url = `${baseUrl}?${params}`;
        console.log('url ' + url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMoviesList({totalAmount: data.totalAmount, data: data.data});
        }
        catch(error) {
            throw new Error('Failed to fetch movies');
        }
    };

    const handleSearchSubmit = (value) => {
        setSearchQuery(value);  
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('query', value);
        newSearchParams.set('genre', selectedGenre);
        newSearchParams.set('sortBy', sortBy);
        navigate(`${location.pathname}?${newSearchParams.toString()}`);
    };

    const handleGenreChange = (newGenre) => {
        setSelectedGenre(newGenre);
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('query', searchQuery);
        newSearchParams.set('genre', newGenre);
        newSearchParams.set('sortBy', sortBy);
        navigate(`${location.pathname}?${newSearchParams.toString()}`);
    };

    const handleSortByChange = (newSortBy) => {
        setSortBy(newSortBy);
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('query', searchQuery);
        newSearchParams.set('genre', selectedGenre);
        newSearchParams.set('sortBy', newSortBy);
        navigate(`${location.pathname}?${newSearchParams.toString()}`);
    };

useEffect(() => {
  const fetchAndPrepare = async () => {
    const pathname = location.pathname;
    const isAdd = pathname.endsWith('/new');
    const isEdit = /^\/edit\/\d+/.test(pathname);
    const isDetails = /^\/movie\/\d+/.test(pathname);

    setTitle(isAdd ? 'ADD MOVIE' : isEdit ? 'EDIT MOVIE' : '');

    if (isDetails) {
      const match = pathname.match(/^\/movie\/(\d+)/);
      const movieId = match?.[1];
      if (movieId) {
        const response = await fetch(`http://localhost:4000/movies/${movieId}`);
        const data = await response.json();
        setSelectedMovie(data);
        setSelectedMovieDetail(true);
        setIsOpen(false); 
        return;
      }
    }

    if (isEdit) {
      const match = pathname.match(/^\/edit\/(\d+)/);
      const movieId = match?.[1];

      if (movieId) {
        const response = await fetch(`http://localhost:4000/movies/${movieId}`);
        const data = await response.json();
        setSelectedMovie(data);
        setIsOpen(true);
        setSelectedMovieDetail(false);
        return;
      }
    }

    if (isAdd) {
      setSelectedMovie(null);
      setIsOpen(true);
      setSelectedMovieDetail(false);
      return;
    }

    setSelectedMovieDetail(false);
    setIsOpen(false);
    setSelectedMovie(null);
  };

  fetchMovie();
  fetchAndPrepare();
}, [location.pathname, searchQuery, selectedGenre, sortBy]);



    console.log('selectedMovie');
    console.log(selectedMovie)

    return React.createElement(
        'div',
        null,
        selectedMovieDetail ? 
        React.createElement(
            MovieDetails,
            { 
                movie: selectedMovie,
                onSearchClick: handleSearchIcon
             }
        ) :
        React.createElement(
            'div',
            null,
            
        React.createElement(
            'button',
            { onClick: handleMovieAdd, style: buttonStyle },
            'Add Movie'
        ),
        React.createElement(
            Outlet
        ),
        React.createElement(
            SearchForm,
            { 
                initialQuery: searchQuery,
                onSearch: handleSearchSubmit
            }
        ),
        ),
        React.createElement(
            GenreSelect, 
            {
                genres, 
                selectedGenre,
                onSelect: handleGenreChange,
                selectedSortBy: sortBy,
                onSortByChange: handleSortByChange
            }
        ),
        React.createElement(
            Movie,
            {
                movies: moviesList.data,
                onMovieSelect: (movie) => handleMovieSelect(movie),
                onMovieEdit: (movie) => handleMovieEdit(movie)
            }
        ),
        (isOpen && (title === 'ADD MOVIE' || (title === 'EDIT MOVIE' && selectedMovie))) &&
        React.createElement(
            Dialog,
            { title: title, onClose: closeDialog },
            React.createElement(
                MovieForm, {
                    initialMovie: selectedMovie,
                    onSubmit: handleMovie
                }
            )
        )
    );
};

export default MovieListPage;