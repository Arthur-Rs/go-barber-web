import React from 'react'

// => GlobalStyles
import GlobalStyles from './styles/GlobalStyles'

// => Routes
import Routes from './routes'

const App: React.FC = () => {
  return (
    <>
      <Routes />
      <GlobalStyles />
    </>
  )
}

export default App
