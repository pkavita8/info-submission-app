import * as React from "react";
import Address from "./Address";
import BasicInfo from "./BasicInfo";
import PaymentDetails from "./PaymentDetails";
import AccountSummary from "./AccountSummary";

const UserRegistrationForm = ({ activeStep }) => {

  const renderStepContent = () => {
    
    switch (activeStep) {
      case 0:
        return <BasicInfo />;

      case 1:
        return <Address />;

      case 2:
        return <PaymentDetails />;

      case 3:
        return <AccountSummary />;

      default:
        return null;
    }
  };

  return renderStepContent();
};

export default UserRegistrationForm;
