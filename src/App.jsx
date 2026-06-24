import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CountriesProvider } from './context/CountriesContext';
import Navbar from './components/layout/Navbar';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <CountriesProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/country/:cca3" element={<DetailPage />} />
        </Routes>
      </CountriesProvider>
    </BrowserRouter>
  );
}
