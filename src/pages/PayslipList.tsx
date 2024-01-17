// src/components/PayslipList.tsx
import React, { useContext } from "react";
import "./Payslip.css";
import { Link } from "react-router-dom";
import { usePayslipContext } from "../context/payslipContext";
import { formatDateToMonthYearAndDay } from "../utils/dateformatter";

export const PayslipList: React.FC = () => {
  const { payslips } = usePayslipContext();

  return (
    <div className="slip-section row">
      <h1 className="section-title">Payslips</h1>
      <div className="sec-content">
        {payslips.map((payslip) => (
          <div className="slip" key={payslip.id}>
            <Link to={`/payslip/${payslip.id}`}>
              <div className="dash-card-container">
                <div className="dash-card-icon">
                  <i className="fa fa-suitcase" aria-hidden="true"></i>
                </div>
                <div className="dash-card-content">
                  <p>
                    {" "}
                    {`Payslip for the period of : ${formatDateToMonthYearAndDay(
                      payslip.fromDate
                    )} to ${formatDateToMonthYearAndDay(payslip.toDate)}`}
                  </p>
                </div>
                <div className="dash-card-avatars">
                  <div className="e-avatar">View</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
