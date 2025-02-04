import { useRef, useState } from "react";
import Loading from "../../utilities/Loading";
import API from "../../services/API";
import Notify from "../../utilities/Toasts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Expo } from "gsap";
import { useNavigate } from "react-router-dom";

const Login = ({ setActive, firstRender }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from(".login", {
      delay: firstRender ? 1.6 : 0.2,
      duration: 2,
      opacity: 0,
      skewX: 30,
      skewY: -20,
      scale: 0.7,
      x: -500,
      ease: Expo.easeOut,
    });
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    const data = await API.login("/login", body);
    if (data.success) {
      Notify("success", data.message);
      setLoading(false);
      navigate("/dashboard");
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

        // background: "#862103",
      }}
      className="login border-r-[2px] border-l-[2px]  border-t-[10px] border-b-[10px] rounded-3xl py-8 px-5 shadow-lg shadow-black border-orange-950 scale-90"
    >
      <h2 className="text-3xl text-center underline text-white font-bold mb-8">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="box1 flex flex-col ">
          <label
            className="text-xl  font-bold tracking-wide text-gray-200 "
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

        <div className="box2 flex flex-col">
          <label
            className="text-xl  font-bold tracking-wide text-gray-200  "
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="bg-transparent text-white py-2 pl-2 border-b-4 border-b-orange-900 text-xl sm:font-bold tracking-wide focus:outline-none"
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
            Login
          </button>
        )}
      </form>
      <p className="text-center mt-5 text-xl">
        Do Not Have An Account ,{" "}
        <span
          onClick={() => setActive("register")}
          className="text-white underline cursor-pointer"
        >
          Register.
        </span>
      </p>
      <p className="text-center mt-4 text-xl">
        <span
          onClick={() => setActive("forgotPassword")}
          className="text-red-50 underline cursor-pointer"
        >
          Forgot Password
        </span>
      </p>
    </div>
  );
};

export default Login;
