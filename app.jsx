import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import CaseSummary from './components/CaseSummary.jsx';

window.addEventListener('load', function onLoad() {
    ReactDOM.render(
        <CaseSummary />,
        document.getElementById("container")
    );
});
