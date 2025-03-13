import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import { UserProvider } from './Context/UserContext';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<UserProvider>

</UserProvider>*/}
<App />
  </StrictMode>,
)
