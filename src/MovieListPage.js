import React, { useEffect, useState } from 'react';
import Counter from './Counter';
import GenreSelect from './GenreSelect';
import SearchForm from './SearchForm';
import Movie from './Movie';
import MovieDetails from './MovieDetails';
import Dialog from './Dialog';
import MovieForm from './MovieForm';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function MovieListPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { movieId } = useParams();

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
        setIsOpen(true);
    }

    const handleSearchIcon = () => {
        setSelectedMovieDetail(false);
        setSelectedMovie(null);
         const newSearchParams = new URLSearchParams();
        newSearchParams.set('query', searchQuery);
        newSearchParams.set('genre', selectedGenre);
        newSearchParams.set('sortBy', sortBy);
        navigate(`/?${newSearchParams.toString()}`);
    }
    
    const closeDialog = () => setIsOpen(false);

    const handleMovie = (movie) => {
        alert('movie handled');
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

    const fetchSelectedMovie = async(id) => {
        const url = `http://localhost:4000/movies/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setSelectedMovie(data);
        setSelectedMovieDetail(true);
    }

    useEffect(() => {
        console.log('calling useEffect');
        console.log(movieId);
        if(movieId)
            fetchSelectedMovie(movieId);
            fetchMovie();
    }, [selectedGenre, searchQuery, sortBy, movieId]);

    return React.createElement(
        'div',
        null,
        React.createElement(
            Counter,
            { initialValue: 0 }
        ),
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
                onMovieSelect: (movie) => handleMovieSelect(movie)
            }
        ),
        isOpen && 
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