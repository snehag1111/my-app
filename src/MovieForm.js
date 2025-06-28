import PropTypes from "prop-types";
import { useEffect, useState } from "react"

const MovieForm  =({ initialMovie, onSubmit }) => {

    const [movie, setMovie] = useState({
        title: initialMovie?.movieName || '', 
    releaseDate: initialMovie?.releaseYr || '', 
    movieUrl: initialMovie?.movieUrl || '', 
    rating: initialMovie?.rating || '', 
    genre: initialMovie?.genre || '', 
    runtime: initialMovie?.duration || '', 
    overview: initialMovie?.desc || ''
    });

    useEffect(() => {
        if(initialMovie) {
            setMovie({
                title: initialMovie.title,
                releaseDate: initialMovie.releaseDate,
                movieUrl: initialMovie.movieUrl,
                rating: initialMovie.rating,
                genre: initialMovie.genre,
                runtime: initialMovie.runtime,
                overview: initialMovie.overview
            });
        }
    }, [initialMovie]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(movie);
    };

    const handleReset = () => {
        setMovie({
            title: '',
            releaseYear: '',
            movieUrl: '',
            rating: '',
            genre: '',
            runtime: '',
            overview: ''
        });
    };

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '0 auto',
  },
  columnContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',  // Two columns
    gridColumnGap: '40px',
    gridRowGap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  },
   input: {
    width: '100%',        // Set the input width to 100% of the container
    height: '30px',       // Set a custom height for the input
    padding: '5px',       // Add padding to make the input more user-friendly
    fontSize: '20px',
    backgroundColor: 'rgb(95 92 92)',
    color: 'rgb(225 225 225)',
  },
  select: {
    width: '100%',
    height: '45px',  // Increase height of the select dropdown
    padding: '5px',  // Optional: Add padding to give space inside the select box
    backgroundColor: 'rgb(95 92 92)',
    fontSize: '20px',
  },
  textAreaGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    height: '100px',
    padding: '5px',  // Optional: Add padding to give space inside the select box
    backgroundColor: 'rgb(95 92 92)',
    fontSize: '20px',
    color: 'rgb(225 225 225)',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  submitButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
  },
  resetButton: {
    backgroundColor: 'rgb(41 38 38)',
    border: '1px solid #f44336',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
  },
};

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.columnContainer}>
            <div style={styles.inputGroup}>
                <label htmlFor="title">TITLE</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={movie.title}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="releaseDate">RELEASE DATE</label>
                <input
                    type="date"
                    id="releaseDate"
                    name="releaseDate"
                    value={movie.releaseDate}
                    onChange={handleInputChange}
                    style={styles.input}
                />
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="movieUrl">MOVIE URL</label>
                <input
                    type="url"
                    id="movieUrl"
                    name="movieUrl"
                    value={movie.movieUrl}
                    onChange={handleInputChange}
                    style={styles.input}
                />
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="rating">RATING</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={movie.rating}
                    onChange={handleInputChange}
                    style={styles.input}
                />
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="genre">GENRE</label>
                <select
                    id="genre"
                    name="genre"
                    value={movie.genre}
                    onChange={handleInputChange}
                    style={styles.select}
                >
                <option value="">Select Genre</option>
                <option value="Documentary">Documentary</option>
                <option value="Comedy">Comedy</option>
                <option value="Horror">Horror</option>
                <option value="Crime">Crime</option>
                </select>
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="runtime">RUNTIME</label>
                <input
                    type="text"
                    id="runtime"
                    name="runtime"
                    value={movie.runtime}
                    onChange={handleInputChange}
                    style={styles.input}
                />
            </div>
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="overview">OVERVIEW</label>
                <textarea
                    id="overview"
                    name="overview"
                    value={movie.overview}
                    onChange={handleInputChange}
                    style={styles.textAreaGroup}
                />
            </div>
            <div style={styles.buttonGroup}>
                <button type="button" onClick={handleReset} style={styles.resetButton}>
                    Reset
                </button>
                <button type="submit" style={styles.submitButton}>
                    Submit
                </button>
            </div>
        </form>
    );
};

MovieForm.propTypes = {
    initialMovie: PropTypes.shape({
        title: PropTypes.string,
        releaseDate: PropTypes.string,
        movieUrl: PropTypes.string,
        rating: PropTypes.number,
        genre: PropTypes.string,
        runtime: PropTypes.number,
        overview: PropTypes.string
    }),
    onSubmit: PropTypes.func.isRequired
};

MovieForm.defaultProps = {
    initialMovie: null
};

export default MovieForm;