import Movie from '../Movie';
import Movie1 from '../images/Movie1.png'
import Movie2 from '../images/Movie2.png';

export default {
    title: 'Movie',
    component: Movie
};

const Template = (args) => <Movie {...args }/>

    const movies = [
        {
            poster_path: Movie1,
            title: 'Bays\'s Day Out',
            release_date: '1994',
            genres: ['Comedy', 'Drama', 'Children\'s Film'],
            runtime: '1h 39m',
            overview: 'A wealthy couple\'s baby is kidnapped by three inept criminals, but the baby escapes and embarks on an adventurous crawl through the city, unknowingly staying one step ahead of the pursuers at every turn.'
        },
        {
            poster_path: Movie2,
            title: 'The Dark Knight',
            genres: ['Action', 'Crime', 'Drama'],
            release_date: 2008,
            runtime: '2h 32m',
            overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent. Their efforts are derailed by the Joker — a criminal mastermind who thrusts Gotham into chaos and forces Batman to confront the fine line between hero and vigilante.'
        },
    ];

export const Default = Template.bind({});
Default.args = {
    movie: movies,
    onClick: () => alert(''),
};
