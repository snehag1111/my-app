import { fireEvent, render, screen } from "@testing-library/react";
import GenreSelect from "./GenreSelect";

describe('GenreSelect Component', () => {
    test('render all genres passed in props', () => {
        const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
        render(<GenreSelect genres={genres} selectedGenre={'ALL'} onSelect={() => {}} />);
        genres.forEach(genre => {
            expect(screen.getByText(genre)).toBeInTheDocument();            
        });
    });

    test('highlight selected genre passed in the props', () => {
        const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
        const selectedGenre = 'ALL';
        render(<GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={() => {}} />);
        expect(screen.getByText(selectedGenre)).toHaveStyle('borderBottom: 3px solid #e74c3c');
    });

    test('calls onSelect with select of a genre', () => {
        const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
        const selectedGenre = 'ALL';
        const mockOnSelect = jest.fn();
        render(<GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={mockOnSelect} />);
        fireEvent.click(screen.getByText('COMEDY'));
        expect(mockOnSelect).toHaveBeenCalledWith('COMEDY');
    });
})