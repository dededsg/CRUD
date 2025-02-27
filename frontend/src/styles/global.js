import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        background-color: #f2f2f2;
    }
    
    html {
        overflow-x: hidden;
    }
`;

export default Global;