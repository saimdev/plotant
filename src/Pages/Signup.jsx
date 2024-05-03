import { React, useState } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Signup.css";
import SignupLoader from "../Components/Loaders/SignupLoader";
import HomeSectionBg from "../Components/Loaders/HomeSectionBg";

export function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const renderBg = () => {
    const elements = [];

    for (let i = 0; i < 1; i++) {
      elements.push(
        <div key={i}>
          <HomeSectionBg />
        </div>
      );
    }

    return elements;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);

    if (confirmPassword !== password) {
      setConfirmPasswordError("Password not matched");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });

    const data = await res.json();

    if (data.error || !data) {
      window.alert(data.error);
      window.location.reload();
    } else {
      window.alert("Successfully Registered");
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="signup_page">
      <Header />
      {/* <div className="homebg d-flex flex-row justify-content-around align-items-center flex-wrap">
                {renderBg()}
            </div> */}
      <div className="signup-page d-flex flex-column justify-content-center align-items-center mb-3">
        <form
          action=""
          method="post"
          className="signup-form d-flex flex-column"
          style={{ width: "400px" }}
        >
          <h2>Sign Up</h2>
          <label htmlFor="" className="mt-3">
            Email
          </label>
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && (
            <p style={{ color: "red", fontSize: "12px" }} className="">
              {emailError}
            </p>
          )}
          <label htmlFor="" className="mt-3">
            Name
          </label>
          <input
            type="text"
            name="name"
            id=""
            value={name}
            placeholder="Enter your name"
            onChange={handleName}
          />
          <label htmlFor="" className="mt-3">
            Password
          </label>
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <p style={{ color: "red", fontSize: "12px" }} className="">
              {passwordError}
            </p>
          )}
          <label htmlFor="" className="mt-3">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmpassword"
            id=""
            placeholder="Enter confirm password"
            value={confirmpassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPasswordError && (
            <p style={{ color: "red", fontSize: "12px" }} className="">
              {confirmPasswordError}
            </p>
          )}

          {loading ? (
            <input
              className="btn mt-4 mb-1"
              style={{
                background: "lightgray",
                color: "black",
                borderColor: "lightgrey",
              }}
              value="Registering new user...."
              disabled
            />
          ) : (
            <button
              type="submit"
              onClick={registerUser}
              className="btn signup-button text-white mt-4"
            >
              Sign up
            </button>
          )}

          <p style={{ fontSize: "0.9rem" }} className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--primary-color)" }}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
