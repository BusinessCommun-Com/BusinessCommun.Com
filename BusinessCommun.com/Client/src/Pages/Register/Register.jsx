import React, { useState } from 'react'
import './Register.css';
import img2 from '../../assets/UI_Images/logo2.png'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { register } from '../../Services/users';

export function Register() {

  // creating instances of all the inputs
  const [firstName , setFirstName] = useState('')
  const [lastName , setLastName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')

  // create an instance of useNavigate
  const navigate = useNavigate()

  const onRegister = async () => { 
    try { 
      if(firstName.length == 0) { 
        toast.warning("Please enter first name");
      }else if(lastName.length == 0){ 
        toast.warning("Please enter last name");
      }else if(email.length == 0){
        toast.warning("Please enter email");
      }else if(password.length == 0){
        toast.warning("Please enter password");
      }else if(confirmPassword != password){ 
        toast.warning("Please enter correct password")
      }else { 
        const respone = await register(firstName, lastName, email, password);
        if(respone['status'] == 'success'){ 
          toast.success('Registered successfully');
          navigate('/login')
        }else { 
          console.log(response['error']);
        } 
      }
    }catch(error){ 
      console.log('Error')
    }
  }
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
                              <h3 className="h4 font-weight-bold text-theme">Register</h3>
                            </div>
      
                            <h6 className="h5 mb-0">Welcome back!</h6>
                            <p className="text-muted mt-2 mb-5">
                              Enter your details to create your account
                            </p>
      
                            <form>
                               <div className="form-group">
                                <label htmlFor="exampleInputFirstName">First Name</label>
                                <input
                                  onChange={(e) => { 
                                    setFirstName(e.target.value)
                                  }}
                                  type="text"
                                  className="form-control"
                                  id="exampleInputFirstName"
                                  required
                                />
                              </div>
                               <div className="form-group">
                                <label htmlFor="exampleInputLastName">Last Name</label>
                                <input
                                  onChange={(e) => { 
                                    setLastName(e.target.value)
                                  }}
                                  type="text"
                                  className="form-control"
                                  id="exampleInputLastName"
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                  onChange={(e) => { 
                                    setEmail(e.target.value)
                                  }}
                                  type="email"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  required
                                />
                              </div>
                              <div className="form-group mb-4">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                  onChange={(e) => { 
                                    setPassword(e.target.value)
                                  }}
                                  type="password"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  required
                                />
                                 <div className="form-group">
                                <label htmlFor="exampleInputConfirmPassword">Confirm Password</label>
                                <input
                                  onChange={(e) => { 
                                    setConfirmPassword(e.target.value)
                                  }}
                                  type="password"
                                  className="form-control"
                                  id="exampleInputConfirmPassword"
                                  required
                                />
                              </div>
                              </div>
                              <button onClick={onRegister} type="submit" className="btn btn-theme">
                                Register
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
                              <p className="lead text-white" style={{ fontSize: "1.3rem" }}>
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
                    <a href="#" className="text-primary ml-1">
                      Login Here
                    </a>
                  </p>
                </div>
                {/* end col */}
              </div>
              {/* end row */}
            </div>
          </div>
        );
      };

export default Register
