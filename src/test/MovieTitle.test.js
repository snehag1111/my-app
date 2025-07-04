import { fireEvent, render, screen } from "@testing-library/react"
import Movie3 from '../images/Movie3.png';
import MovieTitle from "../MovieTitle";

const movie = 
      {
            imageUrl: Movie3,
            movieName: 'Inception',
            genres: ['Action', 'Sci-Fi', 'Thriller'],
            duration: '2h 28m',
            releaseYr: 2010,
            desc: 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
        };

describe('MovieTitle component', () => {
    test('renders movie name', () => {
        render(
            <MovieTitle
                movie = { movie }
                onClick={() => {}}
            />
        );
        expect(screen.getByText('Inception')).toBeInTheDocument();
    });

    test('renders movie genre and releaseYr', () => {
        render(
            <MovieTitle
                movie = { movie }
                onClick={() => {}}
            />
        );
        expect(screen.getByText('Action')).toBeInTheDocument();
        expect(screen.getByText('2010')).toBeInTheDocument();
    });

    
    test('calls onClick when clicked', () => {
        const onClick = jest.fn();
        render(
            <MovieTitle
                movie = {movie}
                onClick = {onClick}
            />
        );

        const movieName = screen.getByText('Inception');
        fireEvent.click(movieName);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(movie);
    });
});