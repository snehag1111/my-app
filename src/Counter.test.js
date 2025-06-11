import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component', () => {
    test('renders with provided initial value', () => {
        render(<Counter initialValue={5}/>);
        expect(screen.getByText('Count: 5')).toBeInTheDocument();
    });

    test('increment the count', () => {
        render(<Counter initialValue={0} />);
        fireEvent.click(screen.getByText('Increment'));
        expect(screen.getByText('Count: 1')).toBeInTheDocument();
    });

    test('decrement the count', () => {
        render(<Counter initialValue={0} />);
        fireEvent.click(screen.getByText('Decrement'));
        expect(screen.getByText('Count: -1')).toBeInTheDocument();
    });
})