import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { CafePage } from './pages/cafe-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<CafePage />}/>
        <Route path="cafes" element={<CafePage />}/>
      </Route>
    </Routes>
  );
}

export default App
