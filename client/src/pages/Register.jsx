import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
  });


  const handleChange = (e)=>{

    setUser({
      ...user,
      [e.target.name]:e.target.value
    });

  };


  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      await API.post(
        "/auth/register",
        user
      );


      alert("Registration Successful!");

      navigate("/");


    }
    catch(error){

      console.log(error);

      alert("Registration Failed");

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

        padding:"30px"

      }}

    >


      <div

        className="container"

        style={{

          maxWidth:"1250px"

        }}

      >


        <div

          className="row align-items-center justify-content-center"

          style={{

            gap:"70px"

          }}

        >



          {/* LEFT SIDE */}


          <div

            className="col-lg-7 text-white"

          >



            <h1

              style={{

                fontSize:"72px",

                fontWeight:"800",

                letterSpacing:"-3px"

              }}

            >

              Finora

            </h1>




            <h2

              style={{

                color:"#e0e7ff",

                marginTop:"25px",

                fontSize:"34px",

                fontWeight:"600"

              }}

            >

              Start your financial journey

            </h2>




            <p

              style={{

                marginTop:"35px",

                fontSize:"20px",

                color:"#c7d2fe",

                lineHeight:"1.8",

                width:"700px",

                whiteSpace:"nowrap"

              }}

            >

              Create your account and unlock smarter expense tracking, savings management, and financial insights.

            </p>





            <div

              style={{

                marginTop:"45px",

                fontSize:"18px",

                color:"#f8fafc"

              }}

            >

              <p>
                ✦ Organize your expenses effortlessly
              </p>


              <p>
                ✦ Track your financial growth
              </p>


              <p>
                ✦ Build better money habits
              </p>


            </div>


          </div>







          {/* REGISTER CARD */}




          <div

            className="col-lg-4"

          >



            <div

              style={{

                background:"rgba(255,255,255,0.97)",

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

                  color:"#111827",

                  marginBottom:"15px"

                }}

              >

                Create Account

              </h2>





              <p

                className="text-center text-muted"

                style={{

                  marginBottom:"45px"

                }}

              >

                Join Finora today

              </p>





              <form onSubmit={handleSubmit}>


                <label

                  style={{

                    fontWeight:"600",

                    marginBottom:"12px"

                  }}

                >

                  Full Name

                </label>


                <input

                  type="text"

                  name="name"

                  placeholder="Enter your name"

                  className="form-control"

                  style={{

                    height:"52px",

                    borderRadius:"15px",

                    marginBottom:"30px"

                  }}

                  value={user.name}

                  onChange={handleChange}

                  required

                />





                <label

                  style={{

                    fontWeight:"600",

                    marginBottom:"12px"

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

                    fontWeight:"600",

                    marginBottom:"12px"

                  }}

                >

                  Password

                </label>




                <input

                  type="password"

                  name="password"

                  placeholder="Create password"

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

                  Create Account →

                </button>



              </form>





              <p

                className="text-center"

              >

                Already have an account?


                <Link

                  to="/"

                  className="ms-2"

                  style={{

                    color:"#6366f1",

                    fontWeight:"700"

                  }}

                >

                  Login

                </Link>


              </p>




            </div>


          </div>




        </div>


      </div>


    </div>


  );

}


export default Register;