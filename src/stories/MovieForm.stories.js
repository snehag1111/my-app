import { useState } from 'react';
import MovieForm from '../MovieForm';

export default {
  title: 'MovieForm',
  component: MovieForm,
};

const Template = (args) => {
  const [movie, setMovie] = useState(null);

  const handleSubmit = (data) => {
    alert('Movie submitted');
    setMovie(data);
  };

  return <MovieForm {...args} onSubmit={handleSubmit} />;
};

export const NewMovieForm = Template.bind({});
NewMovieForm.args = {
  initialMovie: null,
};
