import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import img1 from "../../assets/UI_Images/_0013.png";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { login } from "../../Services/users";
import { toast } from "react-toastify";
import { useAuth } from "../../Providers/AuthProvider";
import { decodeUserFromToken } from "../../Services/auth";

function Login() {
  // add the state members for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //const navigate function reference
  const navigate = useNavigate();

  const { setUser } = useAuth();

  useEffect(() => {
    const expired = localStorage.getItem("sessionExpired");

    if (expired) {
      toast.warning("Your session has expired. Please login again.");
      localStorage.removeItem("sessionExpired");
    }
  }, []);
  const onLogin = async (e) => {
    e.preventDefault();

    if (email.length == 0) {
      toast.warning("Please enter Email");
      return;
    } else if (password.length == 0) {
      toast.warning("Please enter Password");
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);
      console.log("Login Response:", response.status);
      if (response && response.status == "success") {
        toast.success("Login Successful");

        const token = response?.data?.token;
        //add token in localStorage and set default axios header
        if (token) {
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
          // Decode user from token and set in context
          const userData = decodeUserFromToken(token);
          setUser(userData);
          
          //role based navigation
          if (userData.roles.includes("ROLE_ADMIN")) {
            navigate("/admin/");
          } else {
            navigate("/home/");
          }
        }

      } else {
        toast.error(
          response && response["error"] ? response["error"] : "Login failed",
        );
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }

    // const onGoogle = () => {

    // }

    // const onFacebook = () => {

    // }

    // const onApple = () => {

    // }
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
                          Login
                        </h3>
                      </div>

                      <h6 className="h5 mb-0">Welcome back!</h6>
                      <p className="text-muted mt-2 mb-5">
                        Enter your email address and password to login
                      </p>

                      <form onSubmit={onLogin}>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <input
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={email}
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
                            }}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-theme"
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Login"}
                        </button>
                        <a
                          href="#"
                          className="forgot-link float-right text-primary"
                        >
                          Forgot password?
                        </a>
                        <hr />
                        <div className="option">
                          <button
                            type="button"
                            id="google"
                            className="btn btn-sm"
                          >
                            {" "}
                            <FcGoogle size={22} /> <span>Google</span>
                          </button>
                          <button
                            type="button"
                            id="facebook"
                            className="btn btn btn-sm"
                          >
                            {" "}
                            <FaFacebook size={22} /> <span>Facebook</span>
                          </button>
                          <button
                            type="button"
                            id="apple"
                            className="btn btn btn-sm"
                          >
                            {" "}
                            <FaApple size={22} /> <span>Apple</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Right Side (Testimonial) */}
                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right"></div>
                      <div className="account-testimonial">
                        <img className="logo1" src={img1} alt="" />
                        <h4 className=" mb-3">WELCOME TO</h4>
                        <h4 className=" mb-4">BusinessCommun.com</h4>
                        <p
                          className="lead text-white"
                          style={{ fontSize: "1.3rem" }}
                        >
                          "BusinessCommun — where vision meets opportunity."
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
              Don't have an account?{" "}
              <Link to="/register" className="text-primary ml-1">
                Register Here
              </Link>
            </p>
          </div>
          {/* end col */}
        </div>
      </div>
    </div>
  );
}

export default Login;
