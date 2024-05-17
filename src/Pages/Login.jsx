import { React, useState } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Login.css";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      //   credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log(res);
    const data = await res.json();
    console.log(data);
    if (data.error || !data) {
      window.alert(data.error);
      console.log(data.error);
      window.location.reload();
    } else {
      // window.alert("Successfully Logged In");
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="login_page">
      <Header />
      <div className="login-page w-100 d-flex flex-column align-items-center justify-content-center">
        <form
          action=""
          method="post"
          className="login-form d-flex flex-column w-25"
        >
          <h2>Login</h2>
          <label htmlFor="" className="mt-1">
            Email
          </label>
          <input
            type="email"
            name=""
            id="email"
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
            Password
          </label>
          <input
            type="password"
            name=""
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <p style={{ color: "red", fontSize: "12px" }} className="">
              {passwordError}
            </p>
          )}
          <Link style={{ fontSize: "0.8rem" }} className="my-2 text-dark">
            Forget Password?
          </Link>
          {loading ? (
            <input
              className="btn mt-4"
              style={{
                background: "lightgray",
                color: "black",
                borderColor: "lightgrey",
              }}
              value="Signing in...."
              disabled
              
            />
          ) : (
            <button
              type="submit"
              onClick={loginUser}
              className="btn login-button text-white mt-4"
            >
              Sign in
            </button>
          )}
          <p className="text-center mb-1 mt-1" style={{ fontSize: "0.9rem" }}>
            or continue with
          </p>
          {/* <Link style={{fontSize:"0.8rem"}} className="d-flex flex-row justify-content-center align-items-center btn bg-dark text-white"><img src={GoogleLogo} alt="google logo" className="mx-2"/>Sign in with Google</Link> */}
          {/* <GoogleOAuthProvider clientId="997143974374-g2ifonuqctckji0udpvn30pqouti75eg.apps.googleusercontent.com">
                            <Google />
                        </GoogleOAuthProvider> */}
          <p style={{ fontSize: "0.9rem" }} className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--primary-color)" }}>
              Register for free
            </Link>
          </p>
        </form>
        {/* {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )} */}
      </div>
    </div>
  );
}

export default Login;
