import React, { useState } from 'react';
import Counter from './Counter';
import GenreSelect from './GenreSelect';
import SearchForm from './SearchForm';
import Movie1 from './images/Movie1.png';
import Movie2 from './images/Movie2.png';
import Movie from './Movie';

function App() {
    const [selectedGenre, setSelectedGenre] = useState('ALL');
    const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

    const handleSearch = (query) => {
        alert(`Searching for: ${query}`);
    };

    const handleSelectGenre = (genre) => {
        setSelectedGenre(genre);
    };

    const handleMovieSelect = (movie) => {
        alert(`You clicked ${movie}`);
    }

    const moviesList = [
        {
            imageUrl: Movie1,
            movieName: 'Bays\'s Day Out',
            releaseYr: '1994',
            genres: ['Comedy', 'Drama', 'Children\'s Film'],
        },
        {
            imageUrl: Movie2,
            movieName: 'The Dark Knight',
            genres: ['Action', 'Crime', 'Drama'],
            releaseYr: 2008,
        },
    ]

    return React.createElement(
        'div',
        null,
        React.createElement(
            Counter,
            { initialValue: 0 }
        ),
        React.createElement(
            SearchForm,
            { 
                initialQuery: 'Baby\'s Day Out',
                onSearch: handleSearch
                }
        ),
        React.createElement(
            GenreSelect, 
            {
                genres,
                selectedGenre,
                onSelect: handleSelectGenre
            }
        ),
        React.createElement(
            Movie,
            {
                movies: moviesList,
                onMovieSelect: handleMovieSelect
            }
        )
        // React.createElement(
        //     'div',
        //     { style: { display: 'flex', gap: '20px', flexWrap: 'wrap' } },
        //     React.createElement(
        //         MovieTitle,
        //         {
        //             imageUrl: Movie1,
        //             movieName: '123',
        //             releaseYr: '2020',
        //             genres: genres,
        //             onClick: handleMovieClick('123')
        //         }
        //     )
        // )
    );
};

export default App;