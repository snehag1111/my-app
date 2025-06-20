import { userEvent, within } from '@storybook/testing-library';
import GenreSelect from '../GenreSelect';

export default {
    title: 'GenreSelect',
    component: GenreSelect
};

const Template = (args) => <GenreSelect {...args }/>

export const Default = Template.bind({});
Default.args ={
    genres: ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'],
    selectedGenre: 'DOCUMENTARY',
};
