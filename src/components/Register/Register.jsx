import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("")

  const navigate = useNavigate();
  const { signUp } = useContext(UserContext);

  async function sendToApi(value) {
    setIsLoading(true);
    const response = await signUp(value);
    console.log(response);

    if(response == "email is already exist"){
      setIsLoading(false);
      setMsg("email is already exist")
    }

    if (response.msg == "done") {
      setMsg("Done")
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    
  }

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "username must be more than 3 characters")
      .max(8, "username must be less than 8 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .matches(/^[A-Z]/, "password must start with uppercase letter")
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .required("Phone number is required"),
    age: yup
      .number()
      .min(18, "You must be at least 18 years old")
      .required("Age is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      age: "",
    },
    validationSchema,
    onSubmit: sendToApi,
  });

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form
          onSubmit={formik.handleSubmit}
          className="col-md-4 d-flex flex-column justify-content-center px-5"
        >
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>

          {!msg ? (
            ""
          ) : msg == "Done" ? (
            <div className="alert h4 alert-success text-center">{msg}</div>
          ) : (
            <div className="alert h4 alert-danger text-center">{msg}</div>
          )}
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="name"
              id="name"
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="error">{formik.errors.name}</p>
            ) : (
              ""
            )}

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

            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              onBlur={formik.handleBlur}
              value={formik.values.age}
              onChange={formik.handleChange}
            />
            {formik.touched.age && formik.errors.age ? (
              <p className="error">{formik.errors.age}</p>
            ) : (
              ""
            )}

            <input
              type="tel"
              inputMode="numeric"
              className="form-control"
              placeholder="phone"
              name="phone"
              id="phone"
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p className="error">{formik.errors.phone}</p>
            ) : (
              ""
            )}

            <button type="submit" className="btn btn-main">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Create account"
              )}
            </button>
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
