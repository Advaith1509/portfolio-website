import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { displayFont } from "../utils";

const fillBar = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: #1a1712;
  transition: opacity 0.6s ease, visibility 0.6s ease;
  &.hide {
    opacity: 0;
    visibility: hidden;
  }
  .brand {
    font-family: ${displayFont};
    color: var(--accent);
    font-size: 1.8rem;
    letter-spacing: 2px;
    text-shadow: 0 0 18px rgba(42, 212, 230, 0.5);
  }
  .bar {
    width: min(240px, 60vw);
    height: 12px;
    border: 2px solid var(--accent);
    padding: 2px;
  }
  .bar span {
    display: block;
    height: 100%;
    background: var(--accent);
    animation: ${fillBar} 1.6s ease forwards;
  }
  .msg {
    font-family: "Roboto Mono", monospace;
    font-size: 0.8rem;
    color: #ffffffaa;
    letter-spacing: 1px;
  }
  @media (max-width: 480px) {
    .brand {
      font-size: 1.2rem;
    }
  }
`;

const Intro = () => {
  const [hide, setHide] = useState(false);
  const [remove, setRemove] = useState(
    () => sessionStorage.getItem("introSeen") === "1"
  );

  useEffect(() => {
    if (remove) return;
    const t1 = setTimeout(() => setHide(true), 1900);
    const t2 = setTimeout(() => {
      setRemove(true);
      sessionStorage.setItem("introSeen", "1");
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [remove]);

  if (remove) return null;

  return (
    <Overlay className={hide ? "hide" : ""}>
      <div className="brand">ADVAITH</div>
      <div className="bar">
        <span />
      </div>
      <div className="msg">LOADING PORTFOLIO...</div>
    </Overlay>
  );
};

export default Intro;
