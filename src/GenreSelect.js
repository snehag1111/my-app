import React from 'react';
import SortControl from './SortControl';

function GenreSelect(props) {
    const { genres, selectedGenre, onSelect, selectedSortBy, onSortByChange } = props;

    const barStyle = {
        position: 'absolute',
        display: 'flex',
        gap: '32px',
        padding: '16px 32px',
        backgroundColor: '#353131',
        alignItems: 'center',
        height: '60px',
        boxSizing: 'border-box',
        top: '522.5px', 
        left: '115.45px',
        width: '1083.1px',
        borderRadius: '4px', 
        flexWrap: 'wrap',
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

    const sortWrapper = {
        marginLeft: 'auto', // ensures it goes to the right
    };

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
        ...genreItems,
        React.createElement(
            'div',
            { style: sortWrapper },
            React.createElement(
                SortControl,
                {
                    selectedValue: selectedSortBy,
                    onChange: onSortByChange
                }
            )
        )
    );
};

export default GenreSelect;