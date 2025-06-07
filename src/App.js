import React, { useState } from 'react';
import Counter from './Counter';
import GenreSelect from './GenreSelect';
import SearchForm from './SearchForm';

function App() {
    const [selectedGenre, setSelectedGenre] = useState('ALL');
    const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

    const handleSearch = (query) => {
        alert(`Searching for: ${query}`);
    };

    const handleSelectGenre = (genre) => {
        setSelectedGenre(genre);
    };

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
    );
}

export default App;