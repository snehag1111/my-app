import React, { useState } from 'react';
import GenreList from './GenreList';

function App() {
    const [selectedGenre, setSelectedGenre] = useState('ALL');
    const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

    const handleSelectGenre = (genre) => {
        setSelectedGenre(genre);
    };

    return React.createElement(
        GenreList, 
        {
            genres,
            selectedGenre,
            onSelect: handleSelectGenre
        }
    );
}

export default App;