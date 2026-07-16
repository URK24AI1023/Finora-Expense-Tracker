import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email:"",
    password:""
  });


  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    });
  };


  const handleSubmit = async(e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        user
      );


      localStorage.setItem(
        "token",
        response.data.token
      );


      navigate("/dashboard");


    } catch(error){

      alert("Invalid Email or Password");

    }

  };


  return (

    <div

      style={{

        minHeight:"100vh",

        background:
        "linear-gradient(135deg,#0f172a,#312e81,#1e1b4b)",

        display:"flex",

        alignItems:"center",

        justifyContent:"center",

        padding:"40px"

      }}

    >


      <div className="container">

        <div

          className="row align-items-center justify-content-center"

          style={{
            gap:"80px"
          }}

        >


          {/* LEFT SIDE */}

          <div className="col-lg-6 text-white">


            <h1

              style={{
                fontSize:"72px",
                fontWeight:"800"
              }}

            >
              Finora
            </h1>


            <h2
              style={{
                color:"#e0e7ff",
                marginTop:"25px"
              }}
            >
              Smarter money.
              Better decisions.
            </h2>


            <p

              style={{
                marginTop:"35px",
                fontSize:"20px",
                color:"#c7d2fe",
                lineHeight:"1.8"
              }}

            >

              Take complete control of your finances
              with intelligent expense tracking,
              savings insights, and powerful analytics.

            </p>


          </div>





          {/* LOGIN CARD */}

          <div className="col-lg-4">


            <div

              style={{

                background:"white",

                padding:"60px 55px",

                borderRadius:"35px",

                boxShadow:
                "0 30px 80px rgba(0,0,0,0.35)"

              }}

            >


              <h2

                className="text-center"

                style={{

                  fontWeight:"750",

                  marginBottom:"15px"

                }}

              >

                Welcome Back

              </h2>



              <p

                className="text-center text-muted"

                style={{

                  marginBottom:"50px"

                }}

              >

                Access your financial dashboard

              </p>




              <form onSubmit={handleSubmit}>


                <label

                  style={{

                    marginBottom:"12px",

                    fontWeight:"600"

                  }}

                >

                  Email Address

                </label>



                <input

                  type="email"

                  name="email"

                  placeholder="Enter your email"

                  className="form-control"

                  style={{

                    height:"52px",

                    borderRadius:"15px",

                    marginBottom:"30px"

                  }}

                  value={user.email}

                  onChange={handleChange}

                  required

                />





                <label

                  style={{

                    marginBottom:"12px",

                    fontWeight:"600"

                  }}

                >

                  Password

                </label>




                <input

                  type="password"

                  name="password"

                  placeholder="Enter your password"

                  className="form-control"

                  style={{

                    height:"52px",

                    borderRadius:"15px",

                    marginBottom:"40px"

                  }}

                  value={user.password}

                  onChange={handleChange}

                  required

                />






                <button

                  className="btn w-100"

                  style={{

                    height:"55px",

                    borderRadius:"16px",

                    background:
                    "linear-gradient(90deg,#6366f1,#8b5cf6)",

                    color:"white",

                    fontSize:"18px",

                    fontWeight:"700",

                    marginBottom:"35px"

                  }}

                >

                  Sign In →

                </button>



              </form>





              <p

                className="text-center"

                style={{

                  marginBottom:"0px"

                }}

              >

                New to Finora?


                <Link

                  to="/register"

                  className="ms-2"

                  style={{

                    color:"#6366f1",

                    fontWeight:"700"

                  }}

                >

                  Create Account

                </Link>


              </p>


            </div>


          </div>



        </div>

      </div>


    </div>

  );

}

export default Login;