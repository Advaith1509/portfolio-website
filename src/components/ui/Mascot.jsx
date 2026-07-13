import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

const burst = keyframes`
  0% { transform: scale(0.45); opacity: 0; }
  35% { opacity: 1; }
  100% { transform: scale(1.8); opacity: 0; }
`;

const wiggle = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  18% { transform: translateY(-3px) rotate(-8deg) scale(1.08); }
  36% { transform: translateY(1px) rotate(8deg) scale(1.1); }
  54% { transform: translateY(-2px) rotate(-5deg) scale(1.06); }
  72% { transform: translateY(0) rotate(4deg) scale(1.03); }
`;

const pop = keyframes`
  from { transform: translate(-50%, 8px) scale(0.85); opacity: 0; }
  to { transform: translate(-50%, 0) scale(1); opacity: 1; }
`;

const GhostRoot = styled.div`
  position: relative;
  width: 60px;
  height: 66px;
  cursor: pointer;
  animation: ${bob} 2.8s ease-in-out infinite;
  outline: none;

  &.excited {
    animation: ${wiggle} 0.62s ease, ${bob} 2.8s ease-in-out 0.62s infinite;
  }
`;

const GhostBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.18s ease, filter 0.18s ease;

  ${GhostRoot}:hover & {
    transform: scale(1.12);
    filter: drop-shadow(0 0 10px rgba(42, 212, 230, 0.7));
  }

  ${GhostRoot}.excited & {
    filter: drop-shadow(0 0 14px rgba(42, 212, 230, 0.95));
  }

  .shell {
    position: absolute;
    inset: 0 0 9px 0;
    background: var(--accent);
    border-radius: 30px 30px 0 0;
    box-shadow: 0 0 14px rgba(42, 212, 230, 0.45);
  }

  .feet {
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 12px;
    display: flex;
  }
  .feet i {
    flex: 1;
    background: var(--accent);
    border-radius: 0 0 50% 50%;
  }

  .eye {
    position: absolute;
    top: 20px;
    width: 16px;
    height: 19px;
    background: #fff;
    border-radius: 50%;
  }
  .eye.l {
    left: 11px;
  }
  .eye.r {
    right: 11px;
  }

  .pupil {
    position: absolute;
    top: 5px;
    left: 4px;
    width: 8px;
    height: 10px;
    background: var(--accent-ink);
    border-radius: 50%;
    transition: transform 0.05s linear;
  }

  ${GhostRoot}.excited .pupil {
    height: 4px;
    top: 8px;
    border-radius: 999px;
  }
`;

const SpeechBubble = styled.div`
  position: absolute;
  left: 50%;
  top: calc(100% + 14px);
  z-index: 4;
  min-width: 168px;
  max-width: min(240px, 70vw);
  padding: 0.62rem 0.7rem;
  border: 2px solid var(--accent);
  border-radius: 6px;
  background: rgba(4, 37, 43, 0.94);
  color: #fff;
  font-family: "Press Start 2P", "Roboto Mono", monospace;
  font-size: 0.48rem;
  line-height: 1.75;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 0 0 18px rgba(42, 212, 230, 0.22);
  animation: ${pop} 0.18s ease forwards;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: -8px;
    width: 12px;
    height: 12px;
    background: rgba(4, 37, 43, 0.94);
    border-left: 2px solid var(--accent);
    border-top: 2px solid var(--accent);
    transform: translateX(-50%) rotate(45deg);
  }

  @media screen and (max-width: 720px) {
    left: 50%;
    top: calc(100% + 12px);
    min-width: min(168px, 62vw);
    max-width: 62vw;
    transform-origin: top center;
    animation: ${pop} 0.18s ease forwards;

    &::after {
      left: 50%;
      top: -8px;
      border-left: 2px solid var(--accent);
      border-top: 2px solid var(--accent);
      border-right: 0;
      border-bottom: 0;
      transform: translateX(-50%) rotate(45deg);
    }
  }
`;

const SparkRing = styled.span`
  position: absolute;
  inset: -10px;
  border: 2px solid rgba(42, 212, 230, 0.72);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;

  ${GhostRoot}.excited & {
    animation: ${burst} 0.58s ease-out;
  }
`;

const MESSAGES = [
  "hover the dog to spin it",
  "try the project cubes",
  "the skill cloud moves",
  "the name follows your cursor",
  "send a message at the end",
  "use the nav to jump sections",
];

export const Mascot = () => {
  const leftPupil = useRef(null);
  const rightPupil = useRef(null);
  const hideTimer = useRef(null);
  const [messageIndex, setMessageIndex] = useState(null);
  const [excited, setExcited] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)").matches;
    if (!fine) return;

    const handleMouseMove = (e) => {
      [leftPupil.current, rightPupil.current].forEach((pupil) => {
        if (!pupil) return;
        const eye = pupil.parentElement;
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = Math.min(4, Math.hypot(e.clientX - cx, e.clientY - cy) / 32);
        pupil.style.transform = `translate(${Math.cos(angle) * dist}px, ${
          Math.sin(angle) * dist
        }px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    return () => clearTimeout(hideTimer.current);
  }, []);

  const performTrick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setExcited(false);
    window.requestAnimationFrame(() => setExcited(true));
    setMessageIndex((current) =>
      current === null ? 0 : (current + 1) % MESSAGES.length
    );

    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setExcited(false);
      setMessageIndex(null);
    }, 2600);
  };

  return (
    <GhostRoot
      aria-label="mascot"
      className={excited ? "excited" : ""}
      onClick={performTrick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          performTrick(e);
        }
      }}
      role="button"
      tabIndex={0}
      title="Click the mascot"
    >
      {messageIndex !== null && (
        <SpeechBubble>{MESSAGES[messageIndex]}</SpeechBubble>
      )}
      <SparkRing />
      <GhostBody>
        <div className="shell" />
        <div className="feet">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="eye l">
          <span className="pupil" ref={leftPupil} />
        </div>
        <div className="eye r">
          <span className="pupil" ref={rightPupil} />
        </div>
      </GhostBody>
    </GhostRoot>
  );
};
