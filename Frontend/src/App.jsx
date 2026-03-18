import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Books from './pages/Books';
import Authors from './pages/Authors';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/books" replace />} />
          <Route path="books" element={<Books />} />
          <Route path="authors" element={<Authors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
