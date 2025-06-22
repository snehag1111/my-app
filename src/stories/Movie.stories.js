import { userEvent, within } from '@storybook/testing-library';
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
            imageUrl: Movie1,
            movieName: 'Bays\'s Day Out',
            releaseYr: '1994',
            genres: ['Comedy', 'Drama', 'Children\'s Film'],
            duration: '1h 39m',
            desc: 'A wealthy couple\'s baby is kidnapped by three inept criminals, but the baby escapes and embarks on an adventurous crawl through the city, unknowingly staying one step ahead of the pursuers at every turn.'
        },
        {
            imageUrl: Movie2,
            movieName: 'The Dark Knight',
            genres: ['Action', 'Crime', 'Drama'],
            releaseYr: 2008,
            duration: '2h 32m',
            desc: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent. Their efforts are derailed by the Joker — a criminal mastermind who thrusts Gotham into chaos and forces Batman to confront the fine line between hero and vigilante.'
        },
    ];

export const Default = Template.bind({});
Default.args = {
    movie: movies,
    onClick: () => alert(''),
};
