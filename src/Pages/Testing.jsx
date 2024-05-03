import React from "react";
import TestingBar from "../Components/Charts/TestingBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Testing() {
  const notify = () =>
    toast("Wow so easy !", {
      type: "info",
    });
  return (
    <>
      <button onClick={notify}>Notify !</button>
      <ToastContainer />
    </>
  );
}
