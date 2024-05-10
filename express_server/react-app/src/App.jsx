import { AuthWrapper } from './auth/AuthWrapper';
import { BrowserRouter } from 'react-router-dom';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </>
  )
}

