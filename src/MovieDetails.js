import React from "react";

const MovieDetails = ({ movie, onSearchClick }) => {

    console.log('movie ' + movie);

    const styles = {
        wrapper: {
            position: 'absolute', // key to anchor the search icon
            display: 'inline-block', // only as wide as the content
        },
        searchIcon: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '18px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        padding: '5px',
        borderRadius: '50%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        },
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            padding: '20px',
            maxWidth: '800px',
            gap: '20px',
            marginLeft: '116px'
        },
        image: {
            width: '300px',
            height: '380px',
            objectFit: 'cover',
            borderRadius: '8px',
        },
        content: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        title: {
            margin: 0,
            fontSize: '40px',
            // fontWeight: 'bold',
        },
        genres: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
        },
        genreBadge: {
            padding: '5px 2px',
            fontSize: '12px',
            color: '#666',
        },
        detailsRow: {
            display: 'flex',
            gap: '20px',
            fontSize: '14px',
            color: '#555',
        },
        detail: {
            padding: '4px 8px',
            color: '#F65261',
            fontSize: 'x-large',
            paddingRight: '50px'
        },
        description: {
            fontSize: '20px',
            color: '#444',
        },
        };

    return React.createElement(
        'div',
        { style: styles.wrapper },
        React.createElement(
            'div',
            { style: styles.searchIcon, onClick: onSearchClick },
            '🔍'
        ),
        React.createElement(
            'div',
            { style: styles.container },
            React.createElement(
                'img',
                {
                    src: movie?.imageUrl,
                    alt: movie?.movieName,
                    style: styles.image
                }
            ),
            React.createElement(
                'div',
                { style: styles.content },
                React.createElement(
                    'div',
                    { style: styles.title },
                    movie?.movieName.toUpperCase()
                ),
                React.createElement(
                    'div',
                    { style: styles.genres },
                    movie?.genres.map((genre, index) => {
                        return React.createElement(
                            'span',
                            { style: styles.genreBadge, key: index },
                            genre
                        )
                    }),
                ),
                React.createElement(
                    'div',
                    { style: styles.detailRow },
                    React.createElement(
                        'span',
                        { style: styles.detail },
                        movie?.releaseYr
                    ),
                    React.createElement(
                        'span',
                        { style: styles.detail },
                        movie?.duration
                    )
                ),
                React.createElement(
                    'p',
                    { style: styles.description },
                    movie?.desc
                )
            )
        )
    );
};

export default MovieDetails;