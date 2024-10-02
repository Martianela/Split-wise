import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import { AlertProvider } from './components/AlterProvider';
import withAuth from './components/withAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Profile from './components/Profile';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index Component={withAuth(Home)} />
              <Route path="/my-profile" Component={withAuth(Profile)} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </QueryClientProvider>
  );
}

export default App;
