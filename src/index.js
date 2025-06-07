import React from 'react';
import ReactDOM from 'react-dom/client';
import Counter from './Counter';
import SearchBox from './SearchBox';
import GenreList from './GenreList';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(
  //   Counter,
  //   { initialValue: 0 }
  // ),
  // React.createElement(
    // SearchBox, 
    // { initialQuery: 'Baby\'s Day Out',
    //   onSearch: handleSearch
    //  }
    App
  )
);
