// trigger vercel
import { FC } from 'react'
import { Provider } from 'react-redux'

import Router from './router'
import store from './store'

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
