import { createRoot } from 'react-dom/client'
import App, { store } from './App.tsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
      <App />
    </Provider>

)
