import React from 'react';

function GenreSelect(props) {
    const { genres, selectedGenre, onSelect } = props;

    const barStyle = {
        position: 'absolute',
        display: 'flex',
        gap: '32px',
        padding: '16px 32px',
        backgroundColor: '#666',
        alignItems: 'center',
        height: '60px',
        boxSizing: 'border-box',
        top: '522.5px', 
        left: '115.45px',
        width: '1083.1px',
        borderRadius: '4px'
    }

    const genreItemStyle = (genre) => ({
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        borderBottom: genre === selectedGenre ? '3px solid #e74c3c' : '3px solid transparent',
        paddingBottom: '6px',
        transition: 'border-bottom 0.3s',
        userSelect: 'none'
    });

    const genreItems = genres.map((genre, index) => 
        React.createElement(
            'div',
            {
                key: index,
                style: genreItemStyle(genre),
                onClick: () => onSelect(genre),
            },
            genre
        )
    );

    return React.createElement(
        'div',
        {
            style: barStyle
        },
        ...genreItems
    );
}

export default GenreSelect;