import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background: #F5F7FB;
    font-family: 'Segoe UI';
    &::-webkit-scrollbar { 
      display: none; 
    }
  }
`
