import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import * as yup from "yup";
import { useFormik } from "formik";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()
  const {signIn } = useContext(UserContext)

  async function sendToApi(value) {
    setIsLoading(true)
     const response = await signIn(value)
     console.log(response);
     if (response == "invalid password" || "email not exist") {
    setIsLoading(false)
    setMsg("invalid password or email")
      
     }
     if(response.msg == "done"){
    
      setMsg("Done")
      setTimeout(()=>{
        navigate("/")
      },2000)
     
    } 
    
    
   

  }


  const validationSchema = yup.object({

    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .matches(/^[A-Z]/, "password must start with uppercase letter")
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
   
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    
    },
    validationSchema,
    onSubmit: sendToApi,
  });
  return (
    <section className=" min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form
          onSubmit={formik.handleSubmit}
          className="col-md-4 d-flex flex-column justify-content-center px-5"
        >
          <h2 className="m-0 fw-bold font-Montserrat">Login</h2>
          <p className="mb-3"> Thanks for returning! Please sign in to access your account </p>

          {!msg ? (
            ""
          ) : msg == "Done" ? (
            <div className="alert h4 alert-success text-center">{msg}</div>
          ) : (
            <div className="alert h4 alert-danger text-center">{msg}</div>
          )}
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
          

            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="error">{formik.errors.email}</p>
            ) : (
              ""
            )}

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : (
              ""
            )}


            <button type="submit" className="btn btn-main">
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
              
            </button>
            <p>
              You don't have account yet ?{" "}
              <Link to="/signUp" className="text-decoration-underline">
              signUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
