export interface Payslip {
  id: string;
  fromDate: string;
  toDate: string;
  file: string;
  salary: number;
}

export interface PayslipContextType {
  payslips: Payslip[];
  setPayslips: React.Dispatch<React.SetStateAction<Payslip[]>>;
}
