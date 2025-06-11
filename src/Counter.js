import React, { useState } from 'react';

function Counter(props) {
    const [counter, setCounter] = useState(props.initialValue);

    const buttonStyle = {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '10px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '12px',
        transition: 'background-color 0.3s',
        marginRight: '10px'
    }

    return React.createElement(
        'div',
        { className: 'display_num'},
        React.createElement(
            'h2',
            { className: 'counter' },
            `Count: ${counter}`
        ),
        React.createElement(
            'button',
            { className: 'inc-btn', onClick: () => setCounter(counter + 1), style: buttonStyle },
            'Increment'
        ),
        React.createElement(
            'button',
            { className: 'dec-btn', onClick: () => setCounter(counter - 1), style: buttonStyle },
            'Decrement'
        )
    );
}

export default Counter;