import React, { useState } from "react";
import "./Register.css";
import img2 from "../../assets/UI_Images/logo2.png";
import { toast } from "react-toastify";
import { register } from "../../Services/users";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  // creating instances of all the inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  // create an instance of useNavigate
  const navigate = useNavigate();

  // Password validation regex and requirements
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20}$/;

  const validatePassword = (pwd) => {
    const errors = [];
    if (pwd.length === 0) {
      errors.push("Password is required");
      setPasswordErrors(errors);
      return false;
    }
    if (pwd.length < 5) errors.push("Password must be at least 5 characters");
    if (pwd.length > 20) errors.push("Password must not exceed 20 characters");
    if (!/\d/.test(pwd))
      errors.push("Password must contain at least one digit (0-9)");
    if (!/[a-z]/.test(pwd))
      errors.push("Password must contain at least one lowercase letter (a-z)");
    if (!/[#@$*]/.test(pwd))
      errors.push(
        "Password must contain at least one special character (#, @, $, *)",
      );

    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      if (firstName.trim().length == 0) {
        toast.warning("Please enter first name");
        return;
      } else if (lastName.trim().length == 0) {
        toast.warning("Please enter last name");
        return;
      } else if (email.trim().length == 0) {
        toast.warning("Please enter email");
        return;
      } else if (!validatePassword(password)) {
        toast.error("Password does not meet requirements");
        return;
      } else if (confirmPassword != password) {
        toast.warning("Passwords do not match");
        return;
      }

      setLoading(true);
      const response = await register(firstName, lastName, email, password);
      console.log("Registration Response:", response.status);
      if (response.status == "success") {
        toast.success("Registered successfully");
        // Clear form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      } else {
        toast.error(
          response && response["error"]
            ? response["error"]
            : "Registration failed",
        );
      }
    } catch (error) {
      toast.error("An error occurred during registration");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="root">
      <div id="main-wrapper" className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  {/* Left Side (Login Form) */}
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="mb-5">
                        <h3 className="h4 font-weight-bold text-theme">
                          Register
                        </h3>
                      </div>

                      <h6 className="h5 mb-0">Welcome back!</h6>
                      <p className="text-muted mt-2 mb-5">
                        Enter your details to create your account
                      </p>

                      <form onSubmit={onRegister}>
                        <div className="form-group">
                          <label htmlFor="exampleInputFirstName">
                            First Name
                          </label>
                          <input
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                            value={firstName}
                            type="text"
                            className="form-control"
                            id="exampleInputFirstName"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputLastName">
                            Last Name
                          </label>
                          <input
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                            value={lastName}
                            type="text"
                            className="form-control"
                            id="exampleInputLastName"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <input
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            value={email}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            required
                          />
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="exampleInputPassword1">
                            Password
                          </label>
                          <input
                            onChange={(e) => {
                              setPassword(e.target.value);
                              validatePassword(e.target.value);
                            }}
                            value={password}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                          />
                          {passwordErrors.length > 0 && (
                            <div className="password-errors mt-2">
                              {passwordErrors.map((error, index) => (
                                <div
                                  key={index}
                                  className="error-message text-danger"
                                  style={{ fontSize: "0.875rem" }}
                                >
                                  ✗ {error}
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="form-group mt-3">
                            <label htmlFor="exampleInputConfirmPassword">
                              Confirm Password
                            </label>
                            <input
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                              }}
                              value={confirmPassword}
                              type="password"
                              className="form-control"
                              id="exampleInputConfirmPassword"
                              required
                            />
                            {confirmPassword &&
                              password &&
                              confirmPassword !== password && (
                                <div
                                  className="error-message text-danger mt-2"
                                  style={{ fontSize: "0.875rem" }}
                                >
                                  ✗ Passwords do not match
                                </div>
                              )}
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-theme"
                          disabled={loading}
                        >
                          {loading ? "Registering..." : "Register"}
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Right Side (Testimonial) */}
                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right"></div>
                      <div className="account-testimonial">
                        <img className="logo1" src={img2} alt="" />
                        <h4 className=" mb-3">WELCOME TO</h4>
                        <h4 className=" mb-4">BusinessCommun.com</h4>
                        <p
                          className="lead text-white"
                          style={{ fontSize: "1.3rem" }}
                        >
                          "Create your Account"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end card-body */}
            </div>
            {/* end card */}

            <p className="text-muted text-center mt-3 mt-2">
              Already Have an Account?{" "}
              <Link to="/login" className="text-primary ml-1">
                Login Here
              </Link>
            </p>
          </div>
          {/* end col */}
        </div>
      </div>
    </div>
  );
}

export default Register;
