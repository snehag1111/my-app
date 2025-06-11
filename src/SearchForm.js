import React, { useState } from 'react';

function SearchForm(props) {
    const[query, setQuery] = useState(props.initialQuery);

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        props.onSearch(query);
    }

    const handlePressEnter = (event) => {
        if(event.key === 'Enter') {
            handleSearch();
        }
    }

    const inputStyle = {
        backgroundColor: '#333',
        color: '#c0c0c0',
        border: '1px solid #666',
        padding: '0 16px',
        width: '713px',
        height: '57px',
        fontSize: '16px'
    }

    const buttonStyle = {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '16px 24px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'background-color 0.3s',
        height: '57px',
        width: '233px',
    }

    const containerStyle = {
        position: 'absolute',
        top: '242px',
        left: '178px',
        display: 'flex',
        gap: '12px'
    }

    const handleButtonHover = (event) => {
        event.target.style.backgroundColor = '#c0392b';
    }

    const handleButtonOut = (event) => {
        event.target.style.backgroundColor = '#e74c3c'
    }

    return React.createElement(
        'div',
        { style: containerStyle },
        React.createElement(
            'input',
            { 
                type: 'text', 
                value: query, 
                onChange: handleQueryChange, 
                onKeyPress: handlePressEnter, 
                placeholder: 'What do you want to watch?', 
                style: inputStyle 
            }
        ),
        React.createElement(
            'button',
            { 
                onClick: handleSearch,
                onMouseEnter: handleButtonHover,
                onMouseLeave: handleButtonOut,
                style: buttonStyle
             },
            'Search'
        )
    );
}

export default SearchForm;