
import { payslipLists } from "../data/payslips";
import { PayslipContextType, Payslip } from "../types/types";

import React, { createContext, useContext, useState } from 'react';


const PayslipContext = createContext<PayslipContextType | undefined>(undefined);

export const PayslipProvider = ({ children } : {children: React.ReactNode}) => {
  const [payslips, setPayslips] = useState<Payslip[]>(payslipLists);

  return (
    <PayslipContext.Provider value={{ payslips, setPayslips }}>
      {children}
    </PayslipContext.Provider>
  );
};

export const usePayslipContext = () => {
  const context = useContext(PayslipContext);
  if (!context) {
    throw new Error('usePayslipContext must be used within a PayslipProvider');
  }
  return context;
};

