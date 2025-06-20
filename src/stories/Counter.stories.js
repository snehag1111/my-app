import { userEvent, within } from '@storybook/testing-library';
import Counter from '../Counter';

export default {
    title: 'Counter',
    component: Counter
};

const Template = (args) => <Counter {...args }/>

export const Default = Template.bind({});
Default.args ={
    initialValue: 0
};

Default.play = async({ canvasElement }) => {
    const canvas = within(canvasElement);
    const incBtn = canvas.getByRole('button', { name: 'Increment'});
    const decBtn = canvas.getByRole('button', { name: 'Decrement'});

    await userEvent.click(incBtn);
    await userEvent.click(incBtn);

    await userEvent.click(decBtn);
};