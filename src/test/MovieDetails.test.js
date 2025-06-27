import { render, screen } from "@testing-library/react";
import MovieDetails from "../MovieDetails";
import Movie3 from '../images/Movie3.png';
import { fireEvent } from "@storybook/testing-library";


const movie = 
      {
            imageUrl: Movie3,
            movieName: 'Inception',
            genres: ['Action', 'Sci-Fi', 'Thriller'],
            duration: '2h 28m',
            releaseYr: 2010,
            desc: 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
        };

describe('MovieDetails component', () => {
    test('renders movieName and releaseYr', () => {
        render(
            <MovieDetails
                movie = {movie}
                onSearchSelect = {() => {}}
            />
        );

        expect(screen.getByText('INCEPTION')).toBeInTheDocument();
        expect(screen.getByText('2010')).toBeInTheDocument();
    });

    test('renders genres', () => {
        render(
            <MovieDetails
                movie = {movie}
                onSearchSelect = {() => {}}
            />
        );

        expect(screen.getByText('Action')).toBeInTheDocument();
        expect(screen.getByText('Thriller')).toBeInTheDocument();
    });

    test('renders duration and description', () => {
        render(
            <MovieDetails
                movie = {movie}
                onSearchSelect = {() => {}}
            />
        );

        expect(screen.getByText('2h 28m')).toBeInTheDocument();
        expect(screen.getByText('A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.')).toBeInTheDocument();
    });

    test('renders image with correct src and alt', () => {
        render(
            <MovieDetails
                movie = {movie}
                onSearchSelect = {() => {}}
            />
        );

        const img = screen.getByRole('img');

        expect(img).toHaveAttribute('src', movie.imageUrl);
        expect(img).toHaveAttribute('alt', movie.movieName);
    });
});