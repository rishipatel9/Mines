
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.js'
import './index.css'
import { store } from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>

)
