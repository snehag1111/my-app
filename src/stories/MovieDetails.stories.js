import MovieDetails from '../MovieDetails';
import Movie2 from '../images/Movie2.png';

export default {
    title: 'MovieDetails',
    component: MovieDetails
};

const Template = (args) => <MovieDetails {...args }/>

    const movie = 
        {
            imageUrl: Movie2,
            movieName: 'The Dark Knight',
            genres: ['Action', 'Crime', 'Drama'],
            releaseYr: 2008,
            duration: '2h 32m',
            desc: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent. Their efforts are derailed by the Joker — a criminal mastermind who thrusts Gotham into chaos and forces Batman to confront the fine line between hero and vigilante.'
        };

export const Default = Template.bind({});
Default.args = {
    movie: movie,
    onSearchClick: () => alert(`Clicked on Search icon`),
};
