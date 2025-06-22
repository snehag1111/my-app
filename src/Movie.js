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
                    imageUrl: movie.imageUrl, 
                    movieName: movie.movieName, 
                    releaseYr: movie.releaseYr, 
                    genres: movie.genres, 
                    onClick: () => onMovieSelect(movie.movieName)
                }
            )
        })
    );
};

export default Movie;