import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { CafePage } from './pages/cafe-page';
import { CafeFormPage } from './pages/cafe-form-page';
import { EmployeePage } from './pages/employee-page';
import { EmployeeFormPage } from './pages/employee-form-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<CafePage />}/>
        <Route path="cafes" element={<CafePage />}/>
        <Route path="cafes/new" element={<CafeFormPage />}/>
        <Route path="cafes/:id/edit" element={<CafeFormPage />}/>
        <Route path="employees" element={<EmployeePage />} />
        <Route path="employees/new" element={<EmployeeFormPage />} />
        <Route path="employees/:id/edit" element={<EmployeeFormPage />} />
      </Route>
    </Routes>
  );
}

export default App
