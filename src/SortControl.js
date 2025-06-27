import React from "react";

const SortControl = ({ selectedValue, onChange }) => {

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
            marginBottom: '20px',
        },
        label: {
            fontSize: '18px',
            padding: '10px',
            color: '#DEDDDD',
        },
        select: {
            padding: '6px 10px',
            fontSize: '16px',
            border: '#353131',
            backgroundColor: '#353131',
            color: '#fff'
        },
    };

    return React.createElement(
        'div',
        { style: StyleSheet.container },
        React.createElement(
            'label',
            { style: styles.label },
            'SORT BY'
        ),
        React.createElement(
            'select',
            {
                value: selectedValue,
                onChange: (e) => onChange(e.target.value),
                style: styles.select
            },
            [
                React.createElement(
                    'option',
                    { 
                        key: 'release', 
                        value: 'Release Date'
                    },
                    'RELEASE DATE'
                ),
                React.createElement(
                    'option',
                    {
                        key: 'title',
                        value: 'Title'
                    },
                    'TITLE'
                )
            ]
        )
    );
};

export default SortControl;