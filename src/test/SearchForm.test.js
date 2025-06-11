import { render, fireEvent, screen } from '@testing-library/react';
import SearchForm from "../SearchForm";
import userEvent from "@testing-library/user-event";

describe('SearchForm Component', () => {
    test('renders SearchForm with the initial value', () => {
        render(<SearchForm initialQuery={'Mission Impossible'} onSearch={() => {}} />);
        const input = screen.getByPlaceholderText('What do you want to watch?');
        expect(input.value).toBe('Mission Impossible');
    });

    test('calls onSearch with value on click of Search button', () => {
        const mockOnSearch = jest.fn();
        render(<SearchForm initialQuery={'Mission Impossible'} onSearch={mockOnSearch} />);
        const input = screen.getByPlaceholderText('What do you want to watch?');
        fireEvent.change(input, { target: { value: 'A Beautiful Mind' }});
        fireEvent.click(screen.getByText('Search'));
        expect(mockOnSearch).toHaveBeenCalledWith('A Beautiful Mind');
    });

    test('calls onSearch with value on press of enter button', () => {
        const mockOnSearch = jest.fn();
        render(<SearchForm initialQuery={'Mission Impossible'} onSearch={mockOnSearch} />);
        const input = screen.getByPlaceholderText('What do you want to watch?');
        userEvent.clear(input);
        userEvent.type(input, 'Home Alone');
        userEvent.type(input, '{enter}');
        expect(mockOnSearch).toHaveBeenCalledWith('Home Alone');
    });
})