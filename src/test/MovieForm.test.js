import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieForm from '../MovieForm';

afterEach(cleanup);

describe('MovieForm component', () => {
  const mockSubmit = jest.fn();

  const baseInitial = {
    id: 42,
    title: 'Inception',
    release_date: '2010-07-16',
    poster_path: 'https://example.com/inception.jpg',
    rating: 8.8,
    genres: ['Crime', 'Drama'],
    runtime: 148,
    overview: 'Dream-sharing thriller by Nolan.'
  };

  test('renders form with initial values', () => {
    render(<MovieForm initialMovie={baseInitial} onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText('TITLE')).toHaveValue('Inception');
    expect(screen.getByLabelText('RELEASE DATE')).toHaveValue('2010-07-16');
    expect(screen.getByLabelText('MOVIE URL')).toHaveValue('https://example.com/inception.jpg');
    expect(screen.getByLabelText('RATING')).toHaveValue(8.8);
    expect(screen.getByLabelText('RUNTIME')).toHaveValue(148);
    expect(screen.getByLabelText('OVERVIEW')).toHaveValue('Dream-sharing thriller by Nolan.');
  });

  test('form validation shows error when no genre selected', async () => {
    render(<MovieForm initialMovie={null} onSubmit={mockSubmit} />);
    
    await userEvent.click(screen.getByText('Submit'));
    
    expect(await screen.findByText('Genre is required')).toBeVisible();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('reset button clears all fields', async () => {
    render(<MovieForm initialMovie={null} onSubmit={mockSubmit} />);
    
    const titleInput = screen.getByLabelText('TITLE');
    const runtimeInput = screen.getByLabelText('RUNTIME');
    
    await userEvent.type(titleInput, 'Test Title');
    await userEvent.type(runtimeInput, '150');
    
    expect(titleInput).toHaveValue('Test Title');
    expect(runtimeInput).toHaveValue(150);
    
    await userEvent.click(screen.getByText('Reset'));
    
    expect(titleInput).toHaveValue('');
    expect(runtimeInput).toHaveValue(0);
  });

});
