/* ... imports remain the same ... */
import ContactUs from "./Pages/ContactUs/ContactUs.jsx";
import CompanyDetails from "./Pages/Company/CompanyDetails.jsx";
import CompanyPitch from "./Component/Forms/Partner_Investor_Forms/Pitch_Details_Form/Pitch_Detail_Form.jsx";
import useMultiStepForm from "./store/useMultiStepForm.js";
import ProgressIndicator from "./Component/Multipage_Form__Stepper/Form_Progress_Indicator.jsx";
import PremiumService from "./Pages/PremiumService/PremiumService.jsx";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login/Login.jsx";
import Home from "./Pages/Home/Home.jsx";
import CompanyDetail from "./Component/Forms/Partner_Investor_Forms/Company_Details_Form/Comp_Detail_Form.jsx";
import PartnerConnect from "./Component/Forms/Partner_Investor_Forms/Partner_Form/Partner_Form.jsx";
import Register from "./Pages/Register/Register.jsx";
import InvestorConnect from "./Component/Forms/Partner_Investor_Forms/Investor_Form/Investor_Form.jsx";
import About from "./Pages/About/About.jsx";
import NewsPage from "./Pages/News_page/NewsPage.jsx";
import GovernmentSchemes from "./Pages/GovernmentSchemes/GovernmentSchemes.jsx";
import MyAccount from "./Pages/MyAccount/MyAccount.jsx";

import AdminLayout from "./Admin/Layout/AdminLayout";
import Dashboard from "./Admin/Pages/Dashboard";
import Companies from "./Admin/Pages/Companies";
import AdminCompanyProfile from "./Admin/Pages/CompanyProfile";
import PendingRequests from "./Admin/Pages/PendingRequests";
import ApprovedCompanies from "./Admin/Pages/ApprovedCompanies";
import AdminManagement from "./Admin/Pages/AdminManagement";
import { ProtectedRoute } from "./Component/ProtectedRoute/ProtectedRoute.jsx";
import Companies_listing from "./Pages/Companies_listing/Compnies_listing.jsx";
import SlideShow from "./Component/SlideShow/SlideShow.jsx";
import Unauthorized from "./Component/Unauthorized_Page/Unauthorized.jsx";

function App() {
  const { step } = useMultiStepForm();

  // Multi-step pages
  const pages = [
    <CompanyDetail />,
    <CompanyPitch />,
    <PartnerConnect />,
    <InvestorConnect />,
  ];

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* Redirect root to /home/login (or just /home if you prefer landing page) */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 
           HOME LAYOUT (Public Shell) 
           Everything here gets Navbar + Footer 
        */}
        <Route path="/home" element={<Home />}>

          {/* Public Pages inside Home Layout */}
          <Route index element={<Companies_listing />} /> {/* Or a Landing Page */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<ContactUs />} />

          <Route path="companies" element={
            <Companies_listing />
          } />

          <Route path="news" element={
            <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
              <NewsPage />
            </ProtectedRoute>
          } />
          <Route path="premium-service" element={
            <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
              <PremiumService />
            </ProtectedRoute>
          } />
          <Route path="government-schemes" element={
            <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
              <GovernmentSchemes />
            </ProtectedRoute>
          } />

          {/* Your Feature: My Account */}
          <Route path="my-account" element={
            <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
              <MyAccount />
            </ProtectedRoute>
          } />

          {/* Company Details */}
          <Route path="companies/:id" element={
            <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
              <CompanyDetails />
            </ProtectedRoute>
          } />


          {/* COMPANY REGISTRATION (Wizard) */}
          <Route
            path="company-registration/*"
            element={
              <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
                <div className="root">
                  <div id="main-wrapper" className="container">
                    <ProgressIndicator />
                    {pages[step]}
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ADMIN ROUTES (Protected - Main) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />
          <Route path="company/:id" element={<AdminCompanyProfile />} />
          <Route path="pending" element={<PendingRequests />} />
          <Route path="approved" element={<ApprovedCompanies />} />
          <Route path="admins" element={<AdminManagement />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;