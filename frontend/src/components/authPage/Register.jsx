import { useEffect, useRef, useState } from "react";
import API from "../../services/API";
import styled from "styled-components";
import Loading from "../../utilities/Loading";
import Notify from "../../utilities/Toasts";
import gsap, { Expo } from "gsap";
import { useGSAP } from "@gsap/react";

const Register = ({ setActive }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    emailRef.current.focus();
  });

  useGSAP(() => {
    gsap.from(".register", {
      delay: 0.2,
      duration: 2,
      skewX: -30,
      skewY: 20,
      // rotateY: -90,
      opacity: 0,
      x: 500,
      scale: 0.6,
      ease: Expo.easeOut,
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    const data = await API.register("/register", body);
    console.log(data);
    if (data.success) {
      Notify("success", data.message);
      setLoading(false);
    } else {
      setLoading(false);
      Notify("error", data.message);
    }
  };
  return (
    <div
      style={{
        width: "min(95%,400px)",
        background: "hsl(11, 89%, 62%)",
      }}
      className="register border-r-[2px] border-l-[2px]  border-t-[10px] border-b-[10px] rounded-3xl py-8 px-5 shadow-lg shadow-black border-orange-950 scale-90"
    >
      <h2 className="text-3xl text-center underline text-white font-bold mb-8">
        Register
      </h2>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <div className="box1 flex flex-col ">
          <label
            className="text-xl  font-bold tracking-wide text-gray-200 "
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="bg-transparent text-white py-2 pl-2 border-b-4 border-b-orange-900 text-xl tracking-wide focus:outline-none sm:font-bold"
            type="email"
            name="email"
            id="email"
            ref={emailRef}
          />
        </div>
        <div className="box2 flex flex-col">
          <label
            className="text-xl   font-bold tracking-wide text-gray-200 "
            htmlFor="name"
          >
            Username
          </label>
          <input
            className="bg-transparent text-white py-2 pl-2 border-b-4 border-b-orange-900 text-xl  tracking-wide focus:outline-none sm:font-bold"
            type="text"
            name="username"
            id="name"
            ref={usernameRef}
          />
        </div>
        <div className="box3 flex flex-col">
          <label
            className="text-xl font-bold tracking-wide text-gray-200  "
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="bg-transparent text-white py-2 pl-2 border-b-4 border-b-orange-900 text-xl  sm:font-bold tracking-wide focus:outline-none"
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center h-16">
            <Loading />
          </div>
        ) : (
          <button className="bg-gray-300 font-bold mt-4 tracking-wide text-orange-950  text-2xl py-2 px-10 w-fit mx-auto hover:bg-gray-200">
            Register
          </button>
        )}
      </form>
      <p className="text-center mt-5 text-xl">
        Already Registered ,{" "}
        <span
          onClick={() => setActive("login")}
          className=" cursor-pointer text-white underline"
        >
          Login.
        </span>
      </p>
    </div>
  );
};

export default Register;
