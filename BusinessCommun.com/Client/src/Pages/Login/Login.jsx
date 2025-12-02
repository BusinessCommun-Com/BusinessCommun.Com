import React, { useState } from "react"
import "./Login.css"
import img1 from '../../assets/UI_Images/_0013.png'
import { useNavigate, useSearchParams } from "react-router-dom"
import { FcGoogle }  from "react-icons/fc"
import {FaApple, FaFacebook} from 'react-icons/fa'
import { login } from "../../Services/users"

function Login() {
  // add the state members for inputs
  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')

  //const navigate function reference 
  const navigate = useNavigate()

 // const {setUser} = useAuth()

  const onLogin = async () => { 
    if(email.length == 0) { 
      toast.warning('Please enter Email')
    }else if(password.length == 0) { 
      toast.warning('Please enter Password')
    }else { 
      const response = await login(email,password)
      if(response['status'] == 'success'){
        toast.success('Login Successful')

        // get the token from response and cache it in local storage
        localStorage.setItem("token", response["data"]["token"]);
        localStorage.setItem("firstName", response["data"]["firstName"]);
        localStorage.setItem("lastName", response["data"]["lastName"]);

        // if login successful then add the user's details
        // setUser( {
        //   firstName : response['data']['firstName'],
        //   lastName : response['data']['lastName']
        // })

        //Navigate to the Landing page
      } else {
        toast.error(response["error"]);
      }
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

                      <form>
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
                            required
                          />
                        </div>
                        <button
                          onClick={onLogin}
                          type="submit"
                          className="btn btn-theme"
                        >
                          Login
                        </button>
                        <a
                          href="#"
                          className="forgot-link float-right text-primary"
                        >
                          Forgot password?
                        </a>
                        <hr />
                        <div className="option">
                          <button id="google" className="btn btn-sm">
                            {" "}
                            <FcGoogle size={22} /> <span>Google</span>
                          </button>
                          <button id="facebook" className="btn btn btn-sm">
                            {" "}
                            <FaFacebook size={22} /> <span>Facebook</span>
                          </button>
                          <button id="apple" className="btn btn btn-sm">
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
              <a href="/register" className="text-primary ml-1">
                Register Here
              </a>
            </p>
          </div>
          {/* end col */}
        </div>
        {/* end row */}
      </div>
    </div>
  );
}

export default Login;