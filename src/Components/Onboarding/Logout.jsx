import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();

  //   useEffect(() => {

  //   }, []);

  const loggingOut = async () => {
    const res = await fetch("/account/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    if (data.message) {
      navigate("/login");
    }
  };

  loggingOut();

  return (
    <div style={{ background: "white", height: "100vh" }}>
      {/* <p>Logging out...</p> */}
    </div>
  );
}
