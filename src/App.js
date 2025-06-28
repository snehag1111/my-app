import React, { useState } from 'react';
import Counter from './Counter';
import GenreSelect from './GenreSelect';
import SearchForm from './SearchForm';
import Movie1 from './images/Movie1.png';
import Movie2 from './images/Movie2.png';
import Movie3 from './images/Movie3.png';
import Movie from './Movie';
import MovieDetails from './MovieDetails';
import Dialog from './Dialog';
import MovieForm from './MovieForm';

function App() {
    const [selectedGenre, setSelectedGenre] = useState('ALL');
    const [selectedMovieDetail, setSelectedMovieDetail] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [sortBy, setSortBy] = useState('Release Date');
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('ADD MOVIE');
    const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

    const handleSearch = (query) => {
        alert(`Searching for: ${query}`);
    };

    const handleSelectGenre = (genre) => {
        setSelectedGenre(genre);
    };

    const handleMovieSelect = (movie) => {
        console.log(movie);
        setSelectedMovie(movie);
        setSelectedMovieDetail(true);
        movie.action === 'Edit' ? setTitle('EDIT MOVIE') : (movie.action === 'Delete' ? setTitle('DELETE MOVIE') : setTitle('ADD MOVIE'));
        movie.action === 'Edit' ? setIsOpen(true) : (movie.action === 'Delete' ? setIsOpen(true) : setIsOpen(false));
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

    

    const moviesList = [
        {
            imageUrl: Movie1,
            movieName: 'Bays\'s Day Out',
            releaseYr: '1994',
            genres: ['Comedy', 'Drama', 'Children\'s Film'],
            duration: '1h 39m',
            desc: 'A wealthy couple\'s baby is kidnapped by three inept criminals, but the baby escapes and embarks on an adventurous crawl through the city, unknowingly staying one step ahead of the pursuers at every turn.'
        },
        {
            imageUrl: Movie2,
            movieName: 'The Dark Knight',
            genres: ['Action', 'Crime', 'Drama'],
            releaseYr: 2008,
            duration: '2h 32m',
            desc: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent. Their efforts are derailed by the Joker — a criminal mastermind who thrusts Gotham into chaos and forces Batman to confront the fine line between hero and vigilante.'
        },
        {
            imageUrl: Movie3,
            movieName: 'Inception',
            genres: ['Action', 'Sci-Fi', 'Thriller'],
            duration: '2h 28m',
            releaseYr: 2010,
            desc: 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
        }
    ];

    const sortedMoviesList = [...moviesList].sort((a, b) => {
        if(sortBy === 'Title') {
            return a.movieName.localeCompare(b.movieName);
        }
        else if(sortBy === 'Release Date') {
            return b.releaseYr - a.releaseYr;
        }
        return 0;
    });

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
    }

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
                onSearch: handleSearch
                }
        ),
        ),
        React.createElement(
            GenreSelect, 
            {
                genres,
                selectedGenre,
                onSelect: handleSelectGenre,
                selectedSortBy: sortBy,
                onSortByChange: (value) => {
                    setSortBy(value);
                }
            }
        ),
        React.createElement(
            Movie,
            {
                movies: sortedMoviesList,
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