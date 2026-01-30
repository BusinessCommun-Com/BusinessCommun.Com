import useMultiStepForm from "../../store/useMultiStepForm";
import ProgressIndicator from "../Multipage_Form__Stepper/Form_Progress_Indicator";
import CompanyDetail from "./Company_Details_Form/Comp_Detail_Form";
import CompanyPitch from "./Pitch_Detail_Form/Pitch_Detail_Form";
import PartnerConnect from "./Partner_Form/Partner_Form";
import InvestorConnect from "./Investor_Form/Investor_Form";

const CompanyRegistration = () => {
  const { step } = useMultiStepForm();

  const pages = [
    <CompanyDetail />,
    <CompanyPitch />,
    <PartnerConnect />,
    <InvestorConnect />,
  ];

  return (
    <div className="root">
      <div id="main-wrapper" className="container">
        <ProgressIndicator />
        {pages[step]}
      </div>
    </div>
  );
};

export default CompanyRegistration;
