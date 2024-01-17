import {  useState } from 'react';
import { Payslip } from './types/types';
import { PayslipList } from './pages/PayslipList';
import { PayslipDetails } from './pages/PayslipDetails';

import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { payslipLists } from './data/payslips';
import { PayslipProvider } from './context/payslipContext';


function App() {
  const [payslips, setPayslips] = useState<Payslip[]>(payslipLists)
  return (
    <div className="App">
      <PayslipProvider>
      <Routes>
        <Route path="/" element={<PayslipList />} index />
        <Route path="/payslip/:id" element={<PayslipDetails />} />
      </Routes>
    </PayslipProvider>
    </div>
  );
}

export default App;
