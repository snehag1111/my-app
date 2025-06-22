import React from "react";
import MovieTitle from "./MovieTitle"

const Movie = ({ movies, onMovieSelect }) => {
    return React.createElement(
        'div',
        { style: { display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '598px', marginLeft: '116px', width: '1080px' } },
        movies.map((movie, index) => {
            return React.createElement(
                MovieTitle, 
                {
                    key: index,
                    movie,
                    onClick: () => onMovieSelect(movie)
                }
            )
        })
    );
};

export default Movie;