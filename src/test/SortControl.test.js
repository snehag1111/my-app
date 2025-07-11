import { render, screen } from "@testing-library/react"
import SortControl from "../SortControl";
import { fireEvent } from "@storybook/testing-library";

describe('Sort Control', () => {
    test('renders label and select with option', () => {
        render(
            <SortControl
                selectedValue = 'Release Date'
                onChange = {() => {}}
            />
        );
        expect(screen.getByText('SORT BY')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getAllByRole('option')[0].value).toBe('Release Date');
        expect(screen.getAllByRole('option')[1].value).toBe('Title');
    });

    test('selectes the correct initial value', () => {
        render(
            <SortControl
                selectedValue = 'Title'
                onChange = {() => {}}
            />
        );
        const drpDwn = screen.getByRole('combobox');
        expect(drpDwn.value).toBe('Title');
    });

    test('calls onChange when a new option is selected', () => {
        const handleChange = jest.fn();
        render(
            <SortControl
                selectedValue = 'Title'
                onChange = {handleChange}
            />
        );
        const drpDwn = screen.getByRole('combobox');
        fireEvent.change(drpDwn, { target: { value: 'Title' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('Title');
    });
});