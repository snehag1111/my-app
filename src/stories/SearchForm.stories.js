import { userEvent, within } from '@storybook/testing-library';
import SearchForm from '../SearchForm';

export default {
    title: 'SearchForm',
    component: SearchForm
};

const Template = (args) => <SearchForm {...args }/>

export const Default = Template.bind({});
Default.args ={
    initialQuery: 'Baby\'s Day Out',
    onSearch: (value) => alert(`Searching for: ${value}`)
};

Default.play = async({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchBtn = canvas.getByRole('button', { name: 'Search'});

    await userEvent.click(searchBtn);
    userEvent.type(searchBtn, '{enter}');
};