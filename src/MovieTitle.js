import React from "react";

function MovieTitle(props) {
    const { movie, onClick } = props;

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column', // Stack image and content vertically
    width: '300px', // Adjust card width
    // border: '1px solid #ccc',
    overflow: 'hidden',
    cursor: 'pointer',
    // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    marginBottom: '20px', // Space between cards
    marginLeft: '20px',
  },
  image: {
    width: '100%', // Make image take full width
    height: '400px', // Fixed height for the image
    objectFit: 'cover', // Maintain aspect ratio
  },
  textContent: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between', // This makes movieName and releaseYear on opposite sides
    alignItems: 'center',
  },
  title: {
    fontSize: '18px',
    // fontWeight: 'bold',
    marginBottom: '5px',
    wordWrap: 'break-word', // Ensure title doesn't overflow
  },
  releaseYear: {
    fontSize: '14px',
    color: '#555',
    // fontStyle: 'italic',
    border: '1px solid #aaa',
    padding: '4px 8px',
    borderRadius: '3px',
  },
  genres: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginTop: '10px',
  },
  genre: {
    // background: '#f1f1f1',
    padding: '5px 2px',
    // borderRadius: '15px',
    fontSize: '12px',
    color: '#666',
  },
};



    return React.createElement(
        'div',
        { className: 'movie-card', onClick: () => onClick(movie), style: { ...styles.card } },
        React.createElement(
            'img', 
            { src: movie.imageUrl, alt: movie.movieName, style: styles.image }
        ),
        React.createElement(
            'div',
            { style: styles.textContent },
            React.createElement(
                'div',
                { style: styles.topRow },
                React.createElement(
                    'div',
                    { style: styles.title },
                    movie.movieName
                ),
                React.createElement(
                    'span',
                    { style: styles.releaseYear },
                    movie.releaseYr
                )
            ),
                React.createElement(
                    'div',
                    { style: styles.genres },
                    movie.genres.map((genre, index) => {
                        return React.createElement(
                            'span',
                            { key: index, style: styles.genre},
                            genre
                        )
                    })
                )
            )
    );
};

export default MovieTitle;