import ReactDom from "react-dom";
import { useContext } from "react";
import { ThemeContext } from "../page/DashboardPage";
import styled from "styled-components";

import { useGSAP } from "@gsap/react";
import gsap, { Expo } from "gsap";

const Wrapper = styled.div`
  background: ${({ theme }) => theme["primary-100"]};
  background: linear-gradient(
    43deg,
    ${({ theme }) => (theme.light ? theme["primary-100"] : "#ffe4e1")} 0%,
    ${({ theme }) => (theme.light ? theme["primary-200"] : "#f89487")} 48%,
    ${({ theme }) => (theme.light ? theme["primary-300"] : "#f46645")} 100%
  );
`;

const Modal = ({ setIsOpen, children }) => {
  const { theme } = useContext(ThemeContext);

  useGSAP(() => {
    gsap.from(".outside", {
      duration: 0.8,
      scale: 0,
      ease: Expo.easeOut,
      opacity: 0,
    });
  });

  return ReactDom.createPortal(
    <div
      style={{
        background: "rgba(9, 8, 8,.8)",
      }}
      className="outside absolute left-0 flex justify-center items-center z-50   top-0 h-screen w-[100%] sm:screen"
    >
      <Wrapper
        theme={theme}
        className=" sm-px-0 w-[100%] px-3  h-[90%] sm:w-[70%] sm:h-[90%] rounded-3xl relative"
      >
        {children}
        <button
          className="absolute   top-0 right-0 sm:right-5  text-white btn btn-ghost  text-5xl"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
      </Wrapper>
    </div>,

    document.getElementById("portal")
  );
};

export default Modal;
