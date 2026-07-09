import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { displayFont } from "../utils";

const blink = keyframes`
  50% { opacity: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: "Roboto Mono", monospace;
  background: radial-gradient(
      1000px 700px at 80% -10%,
      rgba(42, 212, 230, 0.06),
      transparent 60%
    ),
    #1a1712;
  transition: opacity 0.6s ease, visibility 0.6s ease;
  &.hide {
    opacity: 0;
    visibility: hidden;
  }
`;

const Arcade = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  font-family: ${displayFont};
  animation: ${fadeIn} 0.35s ease;
  .hiscore {
    font-size: 0.7rem;
    color: #ff5c8a;
    letter-spacing: 1px;
  }
  .t1 {
    font-size: 2.6rem;
    color: #fff;
    text-shadow: 4px 4px 0 var(--accent-ink);
  }
  .t2 {
    font-size: 2.6rem;
    color: var(--accent);
    text-shadow: 4px 4px 0 var(--accent-ink);
    margin-bottom: 0.6rem;
  }
  .press {
    font-size: 1rem;
    color: var(--accent);
    animation: ${blink} 1.1s steps(1) infinite;
  }
  &.pressed .press {
    animation: ${blink} 0.12s steps(1) infinite;
  }
  .credit {
    font-size: 0.55rem;
    color: #ffffff88;
    letter-spacing: 1px;
    margin-top: 0.8rem;
  }
  @media (max-width: 560px) {
    .t1,
    .t2 {
      font-size: 1.5rem;
    }
  }
`;

const Tips = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  animation: ${fadeIn} 0.35s ease;
  .spinner {
    width: 42px;
    height: 42px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 3px;
  }
  .spinner i {
    background: var(--accent);
    opacity: 0.2;
    transition: opacity 0.1s;
  }
  .now {
    font-family: ${displayFont};
    font-size: 0.85rem;
    color: var(--accent);
  }
  .tip {
    font-size: 0.82rem;
    color: #ffffffcc;
    min-height: 1.4em;
    text-align: center;
    padding: 0 1rem;
  }
  .tip b {
    color: var(--accent);
  }
`;

const TIPS = [
  "hover the dog to spin it",
  "your cursor is a pixel arrow",
  "hover a project to flip the cube",
  "the name reacts to your mouse",
  "built with React + Three.js",
];

const Intro = () => {
  const [stage, setStage] = useState(1);
  const [pressed, setPressed] = useState(false);
  const [hide, setHide] = useState(false);
  const [done, setDone] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const spinnerRef = useRef(null);
  const startedRef = useRef(false);

  // Stage 1: wait for the user to "press start" (any click or key press)
  useEffect(() => {
    if (stage !== 1) return;
    let toStage2;
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      setPressed(true);
      toStage2 = setTimeout(() => setStage(2), 350);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
    return () => {
      clearTimeout(toStage2);
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, [stage]);

  // Stage 2: hold ~4s, then reveal the site
  useEffect(() => {
    if (stage !== 2) return;
    const t1 = setTimeout(() => setHide(true), 4000);
    const t2 = setTimeout(() => setDone(true), 4600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [stage]);

  // Stage 2: spinner + rotating tips
  useEffect(() => {
    if (stage !== 2) return;
    const ring = [0, 1, 2, 5, 8, 7, 6, 3];
    let k = 0;
    const spin = setInterval(() => {
      const cells = spinnerRef.current?.querySelectorAll("i");
      if (!cells) return;
      cells.forEach((c) => (c.style.opacity = "0.2"));
      cells[ring[k % ring.length]].style.opacity = "1";
      cells[ring[(k + 1) % ring.length]].style.opacity = "0.6";
      k++;
    }, 110);
    const tipTimer = setInterval(() => setTipIndex((i) => i + 1), 1400);
    return () => {
      clearInterval(spin);
      clearInterval(tipTimer);
    };
  }, [stage]);

  if (done) return null;

  return (
    <Overlay className={hide ? "hide" : ""}>
      {stage === 1 ? (
        <Arcade className={pressed ? "pressed" : ""}>
          <div className="hiscore">HI-SCORE 999999</div>
          <div className="t1">ADVAITH</div>
          <div className="t2">MOHOLKAR</div>
          <div className="press">PRESS START</div>
          <div className="credit">© 2026 ADVAITH · INSERT COIN</div>
        </Arcade>
      ) : (
        <Tips>
          <div className="spinner" ref={spinnerRef}>
            {Array.from({ length: 9 }).map((_, i) => (
              <i key={i} />
            ))}
          </div>
          <div className="now">NOW LOADING</div>
          <div className="tip">
            <b>TIP:</b> {TIPS[tipIndex % TIPS.length]}
          </div>
        </Tips>
      )}
    </Overlay>
  );
};

export default Intro;
