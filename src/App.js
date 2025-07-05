import React, { useEffect, useState } from 'react';
import Counter from './Counter';
import GenreSelect from './GenreSelect';
import SearchForm from './SearchForm';
import Movie from './Movie';
import MovieDetails from './MovieDetails';
import Dialog from './Dialog';
import MovieForm from './MovieForm';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('ALL');
    const [selectedMovieDetail, setSelectedMovieDetail] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [sortBy, setSortBy] = useState('release_date');
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('ADD MOVIE');
    const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
    const [moviesList, setMoviesList] = useState({
        "totalAmount": 0,
        "data": []
    });

    const handleMovieSelect = (movie) => {
        console.log(movie);
        setSelectedMovieDetail(true);
        movie.action === 'Edit' ? setTitle('EDIT MOVIE') : (movie.action === 'Delete' ? setTitle('DELETE MOVIE') : setTitle('ADD MOVIE'));
        movie.action === 'Edit' ? setIsOpen(true) : (movie.action === 'Delete' ? setIsOpen(true) : setIsOpen(false));
        fetchSelectedMovie(movie.id);
    };

    const handleMovieAdd = () => {
        setSelectedMovie(null);
        setSelectedMovieDetail(false);
        setTitle('ADD MOVIE');
        setIsOpen(true)
    }

    const handleSearchIcon = () => {
        setSelectedMovieDetail(false);
    }
    
    const closeDialog = () => setIsOpen(false);

    const handleMovie = (movie) => {
        alert('movie handled');
    };

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

    const fetchSelectedMovie = async(id) => {
        const url = `http://localhost:4000/movies/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setSelectedMovie(data);
    }

    useEffect(() => {
        console.log('calling useEffect')
        fetchMovie();
    }, [selectedGenre, searchQuery, sortBy]);


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
                initialQuery: 'Baby\'s Day Out',
                onSearch: (value) => {
                    setSearchQuery(value);
                }
            }
        ),
        ),
        React.createElement(
            GenreSelect, 
            {
                genres,
                selectedGenre,
                onSelect: (value) => {
                    setSelectedGenre(value)
                },
                selectedSortBy: sortBy,
                onSortByChange: (value) => {
                    setSortBy(value);
                }
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

export default App;