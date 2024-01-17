import React from "react";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Toast } from '@capacitor/toast';
import { usePayslipContext } from "../context/payslipContext";
import { Payslip } from "../types/types";
import { Link, useParams } from "react-router-dom";
import { formatDateToMonthYearAndDay } from "../utils/dateformatter";
import logo from "../logo.svg";
import { blobToBase64 } from "../utils/blobToBase64";


export const PayslipDetails = () => {
  let { id } = useParams();
  const { payslips } = usePayslipContext();

  const payslip = payslips.find((p: Payslip) => p.id === id);

  if (!payslip) {
    console.log(id);
    // Handle invalid payslip id
    return <div>Error: Payslip not found</div>;
  }

  const handleDownload = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        fetch('/payslip.png', {
          method: 'GET',
          headers: {
            'Content-Type': 'image/png',
          },
        })
          .then(response => response.blob())
          .then(async (blob: Blob) => {
            const base64 = await blobToBase64(blob)
            console.log(base64);
            const result = await Filesystem.writeFile({
              path: `payslip_${payslip.id}.png`,
              data: base64,
              directory: Directory.Documents,
              encoding: Encoding.UTF8,
            });
            await Toast.show({
              text: 'File Saved to the Document Directory!',
            });
    
            console.log(`Payslip downloaded to mobile device. URI: ${result.uri}`);
           
    
        
          })
      } catch (error) {
        console.error(`Error downloading payslip: ${error}`);
      }
    } else {
      
      console.log(`Downloading payslip: ${payslip.file}`);
      const fileContent = "/payslip.png";
      const link = document.createElement("a");
      link.download = `payslip_${payslip.id}.png`;

      link.href = fileContent;

      link.click();
    }
  };

  return (
    <div className="payslip-details">
      <Link className="back-btn" to="/">
        Back
      </Link>
      <div className="card">
        <div className="card-body">
          <h4 className="payslip-title">{`Payslip for the period: ${formatDateToMonthYearAndDay(
            payslip.fromDate
          )} to ${formatDateToMonthYearAndDay(payslip.toDate)}`}</h4>
          <div className="row">
            <div className="col-sm-6 m-b-20">
              <img src={logo} className="inv-logo" alt="Logo" />
              <ul className="list-unstyled mb-0">
                <li>React Technologies</li>
                <li>Lorem Ipsum Valley</li>
                <li>24 Web dev Street</li>
              </ul>
            </div>
            <div className="col-sm-6 m-b-20">
              <div className="invoice-details">
                <h3 className="text-uppercase">{`Payslip ID: ${payslip.id}`}</h3>
                <ul className="list-unstyled">
                  <li>
                    Salary Month:{" "}
                    <span>
                      {formatDateToMonthYearAndDay(payslip.fromDate, false)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 m-b-20">
              <ul className="list-unstyled">
                <li>
                  <h5 className="mb-0">
                    <strong>John Doe</strong>
                  </h5>
                </li>
                <li>
                  <span>Frontend Engineer</span>
                </li>
                <li>Employee ID: FT-0009</li>
                <li>Joining Date: 1 Jan 2024</li>
              </ul>
            </div>
            <p>
              <strong>Net Salary: ${payslip.salary}</strong> (Fifty nine
              thousand six hundred and ninety eight only.)
            </p>
          </div>
          <div className="row flex-center">
            <button className="download-btn" onClick={handleDownload}>
              <i className="fa fa-cloud-download" aria-hidden="true"></i>
              Download Payslip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
