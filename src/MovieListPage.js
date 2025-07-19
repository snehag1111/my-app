import React, { useEffect, useState } from 'react';
import Counter from './Counter';
import GenreSelect from './GenreSelect';
import SearchForm from './SearchForm';
import Movie from './Movie';
import MovieDetails from './MovieDetails';
import Dialog from './Dialog';
import MovieForm from './MovieForm';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

function MovieListPage({ showDialog = false }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { movieId, id: editId } = useParams();

    // const isAddMovie = location.pathname.endsWith('/new');
    // const isEditMovie = location.pathname.endsWith('/edit/');
    // const isDetailMovie = movieId !== undefined;

    const searchParams = new URLSearchParams(location.search);
    const initialSearchQuery = searchParams.get('query') || '';
    const initialGenre = searchParams.get('genre') || 'ALL';
    const initialSortBy = searchParams.get('sortBy') || 'release_date';
    
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [selectedGenre, setSelectedGenre] = useState(initialGenre);
    const [sortBy, setSortBy] = useState(initialSortBy);
    const [moviesList, setMoviesList] = useState({
        "totalAmount": 0,
        "data": []
    });

    const [selectedMovieDetail, setSelectedMovieDetail] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('ADD MOVIE');
    const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

    
    const buttonStyle = {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '10px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '12px',
        transition: 'background-color 0.3s',
        marginRight: '10px',
        marginTop: '10px',
        position: 'absolute',
        right: '500px',
        top: '30px',
    };  

    const handleMovieSelect = (movie) => {
        console.log('movie');
        console.log(movie.id);
        const newSearchParams = new URLSearchParams();
        newSearchParams.set('query', searchQuery);
        newSearchParams.set('genre', selectedGenre);
        newSearchParams.set('sortBy', sortBy);

        navigate(`/movie/${movie.id}?${newSearchParams.toString()}`);
    };

    const handleMovieAdd = () => {
        setSelectedMovie(null);
        setSelectedMovieDetail(false);
        setTitle('ADD MOVIE');
        // setIsOpen(true);
        navigate('/new');
    }

        const handleMovieEdit = (movie) => {
        console.log(movie);
        setSelectedMovie(movie);
        setSelectedMovieDetail(false);
        setTitle('EDIT MOVIE');
        // setIsOpen(true);
        navigate(`/edit/${movie.id}`);
    }

    // const handleSearchIcon = () => {
    //     setSelectedMovieDetail(false);
    //     setSelectedMovie(null);
    //      const newSearchParams = new URLSearchParams();
    //     newSearchParams.set('query', searchQuery);
    //     newSearchParams.set('genre', selectedGenre);
    //     newSearchParams.set('sortBy', sortBy);
    //     navigate(`/?${newSearchParams.toString()}`);
    // }

    const handleSearchIcon = () => {
  setSelectedMovieDetail(false);
  setSelectedMovie(null);
  const newSearchParams = new URLSearchParams();
  newSearchParams.set('query', searchQuery);
  newSearchParams.set('genre', selectedGenre);
  newSearchParams.set('sortBy', sortBy);
  navigate(`/?${newSearchParams.toString()}`);
};

    
    const closeDialog = () => {
        setIsOpen(false);
        navigate('/');
    }

    const handleMovie = async (movie) => {
        // alert('movie handled');
        console.log(movie);
        const response = await fetch('http://localhost:4000/movies', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: movie.title, //"La La Land",
                // tagline: "Here's to the fools who dream.",
                // vote_average: 7.9,
                // vote_count: 6782,
                release_date: movie.releaseDate, //"2016-12-29",
                poster_path: movie.movieUrl, //"https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg",
                overview: movie.overview,
                //"Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
                // budget: 30000000,
                // revenue: 445435700,
                runtime: movie.runtime, //128,
                genres: [movie.genre] //["Comedy", "Drama", "Romance"],
            }),
        });
        if(!response.ok)
            console.log('Failed to add movie');
        else {
            const data = await response.json();
            console.log(data);
        }
    };

    const fetchMovie = async() => {
        const baseUrl = 'http://localhost:4000/movies';
        const params = new URLSearchParams();
        if(selectedGenre !== 'ALL')
            params.append('filter', selectedGenre);
        params.append('limit', 50); 
        params.append('search', searchQuery);
        params.append('searchBy', 'title');
        params.append('sortOrder', 'asc');
        params.append('sortBy', sortBy);
        const url = `${baseUrl}?${params}`;
        console.log('url ' + url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMoviesList({totalAmount: data.totalAmount, data: data.data});
        }
        catch(error) {
            throw new Error('Failed to fetch movies');
        }
    };

    const handleSearchSubmit = (value) => {
        setSearchQuery(value);  
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('query', value);
        newSearchParams.set('genre', selectedGenre);
        newSearchParams.set('sortBy', sortBy);
        navigate(`${location.pathname}?${newSearchParams.toString()}`);
    };

    const handleGenreChange = (newGenre) => {
        setSelectedGenre(newGenre);
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('query', searchQuery);
        newSearchParams.set('genre', newGenre);
        newSearchParams.set('sortBy', sortBy);
        navigate(`${location.pathname}?${newSearchParams.toString()}`);
    };

    const handleSortByChange = (newSortBy) => {
        setSortBy(newSortBy);
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('query', searchQuery);
        newSearchParams.set('genre', selectedGenre);
        newSearchParams.set('sortBy', newSortBy);
        navigate(`${location.pathname}?${newSearchParams.toString()}`);
    };

    const fetchSelectedMovie = async(id) => {
        const url = `http://localhost:4000/movies/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setSelectedMovie(data);
        setSelectedMovieDetail(true);
    }

    // useEffect(() => {
    //     console.log('calling useEffect');
    // //     if (showDialog) {
    // //   setSelectedMovie(null);
    // //   setSelectedMovieDetail(false);
    // //   setTitle('ADD MOVIE');
    // //   setIsOpen(true);
    // // }
    //     console.log(movieId);
    //     if(movieId)
    //         fetchSelectedMovie(movieId);
    //     fetchMovie();
    //     const isAdd = location.pathname.endsWith('/new');
    //     // const isEdit = location.pathname.includes('/edit/');
    //     // const isEdit = `^\/edit\/\d+`.test(location.pathname);
    //     const isEdit = /^\/edit\/\d+/.test(location.pathname);


    //     setIsOpen(isAdd || isEdit);
    //     setTitle(isAdd ? 'ADD MOVIE' : isEdit ? 'EDIT MOVIE' : '');
    //     if (selectedMovie && title === 'EDIT MOVIE') {
    //         navigate(`/edit/${selectedMovie.id}`);
    //     }
    //     // if(isAddMovie || isEditMovie) {
    //     //     setTitle(isAddMovie ? 'ADD MOVIE' : 'EDIT MOVIE');
    //     // }
    // }, [selectedGenre, searchQuery, sortBy, movieId, showDialog, selectedMovie, title]);

//     useEffect(() => {
//   const fetchAndPrepare = async () => {
//     const isAdd = location.pathname.endsWith('/new');
//     const isEdit = /^\/edit\/\d+/.test(location.pathname);

//     setTitle(isAdd ? 'ADD MOVIE' : isEdit ? 'EDIT MOVIE' : '');

//     if (isEdit) {
//       const match = location.pathname.match(/^\/edit\/(\d+)/);
//       const movieId = match?.[1];

//       if (movieId) {
//         const response = await fetch(`http://localhost:4000/movies/${movieId}`);
//         const data = await response.json();
//         setSelectedMovie(data);
//         setIsOpen(true);
//       }
//     }

//     if (isAdd) {
//       setSelectedMovie(null);
//       setIsOpen(true);
//     }
//   };

//   fetchMovie();
//   fetchAndPrepare();
// }, [location.pathname, searchQuery, selectedGenre, sortBy]);

useEffect(() => {
  const fetchAndPrepare = async () => {
    const pathname = location.pathname;
    const isAdd = pathname.endsWith('/new');
    const isEdit = /^\/edit\/\d+/.test(pathname);
    const isDetails = /^\/movie\/\d+/.test(pathname);

    setTitle(isAdd ? 'ADD MOVIE' : isEdit ? 'EDIT MOVIE' : '');

    if (isDetails) {
      const match = pathname.match(/^\/movie\/(\d+)/);
      const movieId = match?.[1];
      if (movieId) {
        const response = await fetch(`http://localhost:4000/movies/${movieId}`);
        const data = await response.json();
        setSelectedMovie(data);
        setSelectedMovieDetail(true);
        setIsOpen(false); // Ensure no modal
        return;
      }
    }

    if (isEdit) {
      const match = pathname.match(/^\/edit\/(\d+)/);
      const movieId = match?.[1];

      if (movieId) {
        const response = await fetch(`http://localhost:4000/movies/${movieId}`);
        const data = await response.json();
        setSelectedMovie(data);
        setIsOpen(true);
        setSelectedMovieDetail(false);
        return;
      }
    }

    if (isAdd) {
      setSelectedMovie(null);
      setIsOpen(true);
      setSelectedMovieDetail(false);
      return;
    }

    // Fallback
    setSelectedMovieDetail(false);
    setIsOpen(false);
    setSelectedMovie(null);
  };

  fetchMovie();
  fetchAndPrepare();
}, [location.pathname, searchQuery, selectedGenre, sortBy]);



    console.log('selectedMovie');
    console.log(selectedMovie)

    return React.createElement(
        'div',
        null,
        // React.createElement(
        //     Counter,
        //     { initialValue: 0 }
        // ),
        selectedMovieDetail ? 
        React.createElement(
            MovieDetails,
            { 
                movie: selectedMovie,
                onSearchClick: handleSearchIcon
             }
        ) :
        React.createElement(
            'div',
            null,
            
        React.createElement(
            'button',
            { onClick: handleMovieAdd, style: buttonStyle },
            'Add Movie'
        ),
        React.createElement(
            Outlet
        ),
        React.createElement(
            SearchForm,
            { 
                initialQuery: searchQuery,
                onSearch: handleSearchSubmit
            }
        ),
        ),
        React.createElement(
            GenreSelect, 
            {
                genres, 
                selectedGenre,
                onSelect: handleGenreChange,
                selectedSortBy: sortBy,
                onSortByChange: handleSortByChange
            }
        ),
        React.createElement(
            Movie,
            {
                movies: moviesList.data,
                onMovieSelect: (movie) => handleMovieSelect(movie),
                onMovieEdit: (movie) => handleMovieEdit(movie)
            }
        ),
        (isOpen && (title === 'ADD MOVIE' || (title === 'EDIT MOVIE' && selectedMovie))) &&
        React.createElement(
            Dialog,
            { title: title, onClose: closeDialog },
            React.createElement(
                MovieForm, {
                    initialMovie: selectedMovie,
                    onSubmit: handleMovie
                }
            )
        )
    );
};

export default MovieListPage;