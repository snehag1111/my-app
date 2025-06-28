import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieForm from '../MovieForm';

afterEach(cleanup);

describe('MovieForm', () => {
  
  const mockSubmit = jest.fn();
  
  test('should render MovieForm with initial values', () => {
    const initialMovie = {
      title: 'Inception',
      releaseDate: '2010-07-16',
      movieUrl: 'https://www.imdb.com/title/tt1375666/',
      rating: 8.8,
      genre: '',
      runtime: '148 min',
      overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    };

    render(<MovieForm initialMovie={initialMovie} onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText('TITLE')).toHaveValue('Inception');
    expect(screen.getByLabelText('RELEASE DATE')).toHaveValue('2010-07-16');
    expect(screen.getByLabelText('MOVIE URL')).toHaveValue('https://www.imdb.com/title/tt1375666/');
    expect(screen.getByLabelText('RATING')).toHaveValue(8.8);
    expect(screen.getByLabelText('GENRE')).toHaveValue('');
    expect(screen.getByLabelText('RUNTIME')).toHaveValue('148 min');
    expect(screen.getByLabelText('OVERVIEW')).toHaveValue('A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.');
  });

  
  test('should handle input changes', () => {
    render(<MovieForm initialMovie={{
        title: '',
        releaseDate: '',
        movieUrl: '',
        rating: '',
        genre: '',
        runtime: '',
        overview: ''
    }} onSubmit={mockSubmit} />);
    
    const titleInput = screen.getByLabelText('TITLE');
    const runtimeInput = screen.getByLabelText('RUNTIME');
    
    userEvent.type(titleInput, 'New Movie Title');
    userEvent.type(runtimeInput, '160min');
    
    expect(titleInput).toHaveValue('New Movie Title');
    expect(runtimeInput).toHaveValue('160min');
  });

  test('should call onSubmit with correct data when form is submitted', () => {
    const initialMovie = {
      title: 'Inception',
      releaseDate: '2010-07-16',
      movieUrl: 'https://www.imdb.com/title/tt1375666/',
      rating: 8.8,
      genre: '',
      runtime: '148 min',
      overview: 'A thief who steals corporate secrets...',
    };

    render(<MovieForm initialMovie={initialMovie} onSubmit={mockSubmit} />);
    
    const submitButton = screen.getByText('Submit');
    
    userEvent.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Inception',
      releaseDate: '2010-07-16',
      movieUrl: 'https://www.imdb.com/title/tt1375666/',
      rating: 8.8,
      genre: '',
      runtime: '148 min',
      overview: 'A thief who steals corporate secrets...',
    });
  });

  test('should reset form when reset button is clicked', () => {
    render(<MovieForm initialMovie={{
        title: '',
        releaseDate: '',
        movieUrl: '',
        rating: '',
        genre: '',
        runtime: '',
        overview: ''
    }} onSubmit={mockSubmit} />);
    
    const titleInput = screen.getByLabelText('TITLE');
    const resetButton = screen.getByText('Reset');
    
    userEvent.type(titleInput, 'Another Movie Title');
    
    userEvent.click(resetButton);
    
    expect(titleInput).toHaveValue('');
  });

  test('should call onSubmit even when no initialMovie is provided', () => {
    render(<MovieForm initialMovie={null} onSubmit={mockSubmit} />);
    
    const titleInput = screen.getByLabelText('TITLE');
    const submitButton = screen.getByText('Submit');
    
    userEvent.type(titleInput, 'New Movie');
    userEvent.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'New Movie',
      releaseDate: '',
      movieUrl: '',
      rating: '',
      genre: '',
      runtime: '',
      overview: ''
    });
  });

});
