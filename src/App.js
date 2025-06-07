import React, { useState } from 'react';
import GenreList from './GenreList';
import Counter from './Counter';
import SearchBox from './SearchBox';

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
            SearchBox,
            { 
                initialQuery: 'Baby\'s Day Out',
                onSearch: handleSearch
                }
        ),
        React.createElement(
            GenreList, 
            {
                genres,
                selectedGenre,
                onSelect: handleSelectGenre
            }
        ),
    );
}

export default App;