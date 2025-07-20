import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import Select from "react-select";

const MovieForm  =({ initialMovie, onSubmit }) => {

    const initialValues = {
        id: initialMovie?.id || 0,
        title: initialMovie?.title || '', 
        releaseDate: initialMovie?.release_date || '', 
        movieUrl: initialMovie?.poster_path || '', 
        rating: initialMovie?.rating || 0, 
        genre: Array.isArray(initialMovie?.genres) ? initialMovie.genres : [],
        runtime: initialMovie?.runtime || 0, 
        overview: initialMovie?.overview || ''
    };

    const genreOptions = [
        { value: 'Documentary', label: 'Documentary' },
        { value: 'Comedy', label: 'Comedy' },
        { value: 'Horror', label: 'Horror' },
        { value: 'Crime', label: 'Crime' },
    ];

    const validate = (values) => {
        console.log('values');
        console.log(values);
        const errors = {};
        if(!values.title) {
            errors.title = 'Title is required';
        }

        if(!values.releaseDate) {
            errors.releaseDate = 'Release Date is required';
        }

        if(!values.movieUrl) {
            errors.movieUrl = 'Invalid URL';
        }

        if(!values.rating && (values.rating < 1 || values.rating > 10)) {
            errors.rating = 'Rating must be between 1 and 10';
        }

        if (!values.genre || values.genre.length === 0) {
            errors.genre = 'Genre is required';
        }

        if(!values.runtime && values.runtime < 1) {
            errors.runtime = 'Runtime is required';
        }

        if(!values.overview) {
            errors.overview = 'Overview is required';
        }

        return errors;
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
    gridTemplateColumns: '2fr 1fr',
    gridColumnGap: '40px',
    gridRowGap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  },
   input: {
    width: '100%',        
    height: '30px',       
    padding: '5px',       
    fontSize: '20px',
    backgroundColor: 'rgb(95 92 92)',
    color: 'rgb(225 225 225)',
  },
  select: {
    width: '100%',
    height: '45px',  
    padding: '5px',  
    backgroundColor: 'rgb(95 92 92)',
    fontSize: '20px',
  },
  textAreaGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    height: '100px',
    padding: '5px',  
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
        <Formik
            initialValues={initialValues}
            validate={validate}
            enableReinitialize
            onSubmit={(values) => onSubmit(values)}
        >
            {({ resetForm, errors, touched }) => (
                <Form style={styles.form}>
          <div style={styles.columnContainer}>
            <div style={styles.inputGroup}>
              <label htmlFor="title">TITLE</label>
              <Field id="title" name="title" type="text" style={styles.input} />
              {errors.title && touched.title && (
                <div style={styles.error}>{errors.title}</div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="releaseDate">RELEASE DATE</label>
              <Field id="releaseDate" name="releaseDate" type="date" style={styles.input} />
              {errors.releaseDate && touched.releaseDate && (
                <div style={styles.error}>{errors.releaseDate}</div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="movieUrl">MOVIE URL</label>
              <Field id="movieUrl" name="movieUrl" type="url" style={styles.input} />
              {errors.movieUrl && touched.movieUrl && (
                <div style={styles.error}>{errors.movieUrl}</div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="rating">RATING</label>
              <Field id="rating" name="rating" type="number" style={styles.input} />
              {errors.rating && touched.rating && (
                <div style={styles.error}>{errors.rating}</div>
              )}
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="genre-select">GENRE</label>
                <Field id="genre" name="genre">
                {({ form, field }) => (
                    <Select
                    inputId="genre-select"
                    isMulti
                    options={genreOptions}
                    value={genreOptions.filter(opt => field.value.includes(opt.value))}
                    onChange={(selectedOptions) =>
                        form.setFieldValue(
                        'genre',
                        selectedOptions.map(opt => opt.value)
                        )
                    }
                    />
                )}
                </Field>
                {errors.genre && touched.genre && (
                    <div style={styles.error}>{errors.genre}</div>
                )}
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="runtime">RUNTIME</label>
              <Field id="runtime" name="runtime" type="number" style={styles.input} />
              {errors.runtime && touched.runtime && (
                <div style={styles.error}>{errors.runtime}</div>
              )}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="overview">OVERVIEW</label>
            <Field id="overview" name="overview" as="textarea" style={styles.textArea} />
            {errors.overview && touched.overview && (
                <div style={styles.error}>{errors.overview}</div>
              )}
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => resetForm()}
              style={styles.resetButton}
            >
              Reset
            </button>
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          </div>
        </Form>
            )}
        </Formik>
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