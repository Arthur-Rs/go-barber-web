import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }

  
  body{ 
    background: #312e38;
    color: #f6f6f6;
    --webkit-font-smoothing: antialiased;
    
  }

  *:focus{
    outline: 0;
  }

  body,input, button{
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
`

export default GlobalStyle
