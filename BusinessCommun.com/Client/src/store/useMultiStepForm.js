import { create } from "zustand";

const useMultiStepForm = create((set) => ({
    step: 0,
    totalSteps: 4,  // total unique screens

    formData: {},
    userType: null,

    // Normal navigation
    nextStep: () => set((s) => ({ step: Math.min(s.step + 1, s.totalSteps - 1) })),

    //context aware
    prevStep: () =>
        set((s) => {
            if (s.step === 3 && s.userType === "investor") {
                s.userType = null;
                return { step: 1 }; // go back to pitch
            }
            if (s.step === 2 && s.userType === "partner") {

                s.userType = null;
                return { step: 1 }; // go back to pitch
            }
            return { step: Math.max(s.step - 1, 0) };
        }),

    // Jump to step directly
    goTo: (n) =>
        set((s) => {
            // Prevent jumping to step 2/3 if userType is not set
            if ((n === 2 || n === 3) && !s.userType) {
                return s; // Don't change state - user must choose path first
            }
            return {
                step: n,
                userType: n === 1 ? null : s.userType    // RESET userType when going back to step 1 (Pitch)
            };
        }),

    // Store values
    updateForm: (values) =>
        set((s) => ({ formData: { ...s.formData, ...values } })),

    // MAIN NEW FUNCTION
    choosePath: (type) =>
        set((s) => ({
            step: type === "investor" ? 3 : 2, // jump based on user choice
            userType: type,
            formData: { ...s.formData, userType: type }  // optional store who they are
        })),
}));

export default useMultiStepForm;
