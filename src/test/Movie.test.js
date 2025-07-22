import { render, screen } from "@testing-library/react"
import Movie from "../Movie"
import Movie1 from '../images/Movie1.png';
import Movie2 from '../images/Movie2.png';
import Movie3 from '../images/Movie3.png';
import { fireEvent } from "@storybook/testing-library";

const moviesList = [
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
            release_date: '2008',
            runtime: '2h 32m',
            overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent. Their efforts are derailed by the Joker — a criminal mastermind who thrusts Gotham into chaos and forces Batman to confront the fine line between hero and vigilante.'
        },
        {
            poster_path: Movie3,
            title: 'Inception',
            genres: ['Action', 'Sci-Fi', 'Thriller'],
            runtime: '2h 28m',
            release_date: '2010',
            overview: 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
        }
    ];

describe('Movie component', () => {
    test('renders all movie names', () => {
        render(
            <Movie
                movies = { moviesList }
                onMovieSelect={() => {}}
            />
        );
        expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
        expect(screen.getByText('Inception')).toBeInTheDocument();
    });

    test('calls onMovieSelect when a movie is clicked', () => {
        const onMovieSelect = jest.fn();
        render(
            <Movie
                movies = { moviesList }
                onMovieSelect={onMovieSelect}
            />
        );

        const movie = screen.getByText('Inception');
        fireEvent.click(movie);
        expect(onMovieSelect).toHaveBeenCalledTimes(1);
        expect(onMovieSelect).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Inception',
            })
        )
    });

    test('handles empty movie list', () => {
        render(
            <Movie
                movies = { [] }
                onMovieSelect={() => {}}
            />
        );

        expect(screen.queryByText('The Dark Knight')).not.toBeInTheDocument();
        expect(screen.queryByText('Inception')).not.toBeInTheDocument();
    })
});