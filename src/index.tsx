import * as React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { App } from './App';

const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        background-image: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
    }
`;

ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>, document.getElementById('root'));
