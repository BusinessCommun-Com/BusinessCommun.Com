import { Building2, Presentation, User, Handshake, BriefcaseBusiness, Check } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useMultiStepForm from "../../store/useMultiStepForm";
import "./Form_Progress_Indicator.css";

export default function ProgressIndicator() {
  const { step, goTo, userType } = useMultiStepForm();

  // Step-3 dynamic icon
  const step3Icon =
    !userType ? User : userType === "partner" ? Handshake : BriefcaseBusiness;

  const steps = [
    { id: 0, icon: Building2, label: "Company Reg" },
    { id: 1, icon: Presentation, label: "Pitch" },
    { id: 2, icon: step3Icon, label: userType ? (userType === "partner" ? "Partner" : "Investor") : "Partner/Investor" },
  ];

  // Calculate progress percentage
  const progressPercent = step === 0 ? 0 : ((step === 3) ? (step - 1) / 2 * 85 : ((step / 2) * 85));

  return (
    <div className="progress-container">

      {/* line behind circles */}
      <div className="progress-line" />

      {/* fill animation */}
      <motion.div
        className="progress-fill"
        animate={{ width: `${progressPercent}%` }}
        transition={{ duration: 0.4 }}
      />

      {/* CIRCLES */}
      {steps.map((s, i) => {
        const Icon = s.icon;
        const completed = (i < 2) ? i < step : false;            // user moved past step
        const active = (i < 2) ? i <= step : (step === 2 && i === 2 ? true : (step === 3 && i === 2 ? true : false));
        // Lock step 2 if user hasn't chosen a path yet
        const locked = i > step || (i === 2 && !userType && step < 2);

        return (
          <div className="step-wrapper" key={i}>

            {/* BOUNCE ANIMATION ON ACTIVE */}
            <motion.button
              type="button"
              disabled={locked}
              onClick={() => {
                if (!locked) {
                  // Prevent navigation to step 2 if userType is not set
                  if (i === 2 && !userType) {
                    return; // Don't navigate - user must choose Partner/Investor first
                  }
                  goTo(i);
                }
              }}
              animate={{ scale: active ? 1.2 : 1 }}     // BOUNCE
              transition={{ type: "spring", stiffness: 300 }}
              className={`step-circle 
                ${active ? "active" : ""}
                ${locked ? "disabled" : ""}
              `}
            >
              {/* SHOW CHECKMARK IF STEP COMPLETED */}
              {completed ? <Check size={22} /> : <Icon size={22} />}
            </motion.button>

            <div className="step-label">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}
