import React from 'react'

// => GlobalStyles
import GlobalStyles from './styles/GlobalStyles'

// => Routes
import Routes from './routes'

// => Context
import AppContexts from './hooks'

const App: React.FC = () => {
  return (
    <AppContexts>
      <Routes />

      <GlobalStyles />
    </AppContexts>
  )
}

export default App
