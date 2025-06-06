import React, { useState } from 'react';

function Counter(props) {
    const [counter, setCounter] = useState(props.initialValue);

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
            { onClick: () => setCounter(counter + 1), style: { marginRight: '10px' } },
            'Increment'
        ),
        React.createElement(
            'button',
            { onClick: () => setCounter(counter - 1) },
            'Decrement'
        )
    );
}

export default Counter;