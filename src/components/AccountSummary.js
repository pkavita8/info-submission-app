import * as React from "react";
import Address from "./Address";
import BasicInfo from "./BasicInfo";
import PaymentDetails from "./PaymentDetails";

const AccountSummary = () => {
  return (
    <>
      <BasicInfo />
      <Address />
      <PaymentDetails />
    </>
  );
};

export default AccountSummary;
