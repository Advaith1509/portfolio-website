import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import dog from "../assets/3d/dog3.glb";
import minecraftScreen from "../assets/images/minecraft_screen.png";
import { displayFont } from "../utils";

const blink = keyframes`
  50% { opacity: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const portalOut = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
  }
  64% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const ringOpen = keyframes`
  to {
    transform: translate(-50%, -50%) scale(4.2);
    opacity: 0;
  }
`;

const logoOut = keyframes`
  to {
    transform: scale(0.82);
    opacity: 0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  color: #fff;
  font-family: "Roboto Mono", monospace;
  background: radial-gradient(
      1000px 700px at 80% -10%,
      rgba(42, 212, 230, 0.06),
      transparent 60%
    ),
    #1a1712;
  &.hide {
    animation: ${portalOut} 1.15s ease forwards;
  }
`;

const ConsoleIntro = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  text-align: center;
  animation: ${fadeIn} 0.35s ease;
  width: min(100%, 760px);
`;

const ConsoleStage = styled.div`
  position: relative;
  width: min(100%, 720px);
  height: clamp(300px, 52vh, 440px);
  display: grid;
  place-items: center;
  overflow: visible;

  @media (max-width: 560px) {
    height: clamp(270px, 50vh, 340px);
  }
`;

const ConsoleRings = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const ConsoleRing = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  border: 2px solid rgba(42, 212, 230, 0.26);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0.75);
  animation: ${fadeIn} 0.4s ease;

  &.r1 {
    width: clamp(132px, 23vw, 180px);
    aspect-ratio: 1;
  }

  &.r2 {
    width: clamp(214px, 38vw, 280px);
    aspect-ratio: 1;
    animation: ${fadeIn} 0.4s ease 0.08s;
  }

  &.r3 {
    width: clamp(292px, 62vw, 390px);
    aspect-ratio: 1;
    animation: ${fadeIn} 0.4s ease 0.16s;
  }

  &.pulse {
    animation: pulse 3.2s ease-in-out infinite;
  }

  ${Overlay}.hide & {
    animation: ${ringOpen} 1s ease forwards;
  }

  ${Overlay}.hide &.r2 {
    animation-delay: 0.05s;
  }

  ${Overlay}.hide &.r3 {
    animation-delay: 0.1s;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(0.94);
      opacity: 0.15;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.04);
      opacity: 0.75;
    }
  }
`;

const ConsoleMark = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: min(100%, 560px);
  min-height: clamp(132px, 24vw, 176px);
  padding: 0 1rem;
`;

const ConsoleLogo = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  font-family: ${displayFont};
  font-size: clamp(1.05rem, 4vw, 2.15rem);
  line-height: 1.42;
  letter-spacing: 1px;
  text-shadow: 0 0 20px var(--accent), 0 0 6px #fff;

  .line2 {
    color: var(--accent);
  }

  @media (max-width: 560px) {
    font-size: clamp(0.92rem, 7vw, 1.32rem);
    line-height: 1.55;
  }

  ${Overlay}.hide & {
    animation: ${logoOut} 0.72s ease forwards;
  }
`;

const PulseCore = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: clamp(118px, 20vw, 158px);
  aspect-ratio: 1;
  border: 2px solid rgba(42, 212, 230, 0.5);
  border-radius: 50%;
  box-shadow: 0 0 18px rgba(42, 212, 230, 0.3), inset 0 0 18px rgba(42, 212, 230, 0.18);
  transform: translate(-50%, -50%);
  animation: corePulse 1.6s ease-in-out infinite;

  @keyframes corePulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(0.96);
      opacity: 0.55;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.08);
      opacity: 1;
    }
  }

  ${Overlay}.hide & {
    animation: ${ringOpen} 1s ease forwards;
  }
`;

const PressHint = styled.div`
  font-family: ${displayFont};
  font-size: 0.85rem;
  color: var(--accent);
  opacity: 0;
  text-align: center;
  min-height: 1.6em;

  &.show {
    animation: ${blink} 1.05s steps(1) infinite;
    opacity: 1;
  }

  @media (max-width: 560px) {
    font-size: 0.62rem;
  }

  ${Overlay}.hide & {
    opacity: 0;
    animation: none;
  }
`;

const Intro = () => {
  const [hide, setHide] = useState(false);
  const [done, setDone] = useState(false);
  const [bootReady, setBootReady] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const startedRef = useRef(false);
  const queuedStartRef = useRef(false);
  const exitTimerRef = useRef(null);
  const doneTimerRef = useRef(null);

  const revealSite = () => {
    if (exitTimerRef.current) return;
    exitTimerRef.current = setTimeout(() => setHide(true), 120);
    doneTimerRef.current = setTimeout(() => setDone(true), 1280);
  };

  useEffect(() => {
    let active = true;
    setBootReady(false);
    setAssetsReady(false);
    const bootTimer = setTimeout(() => setBootReady(true), 2600);
    const gltfLoader = new GLTFLoader();
    const textureLoader = new TextureLoader();

    Promise.all([
      new Promise((resolve, reject) => {
        gltfLoader.load(dog, resolve, undefined, reject);
      }),
      new Promise((resolve, reject) => {
        textureLoader.load(minecraftScreen, resolve, undefined, reject);
      }),
    ])
      .then(() => {
        if (active) setAssetsReady(true);
      })
      .catch(() => {
        if (active) setAssetsReady(true);
      });

    return () => {
      active = false;
      clearTimeout(bootTimer);
      clearTimeout(exitTimerRef.current);
      clearTimeout(doneTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!bootReady || !assetsReady || !queuedStartRef.current) return;
    queuedStartRef.current = false;
    revealSite();
  }, [bootReady, assetsReady]);

  useEffect(() => {
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      if (bootReady && assetsReady) {
        revealSite();
      } else {
        queuedStartRef.current = true;
      }
    };

    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, [bootReady, assetsReady]);

  if (done) return null;

  return (
    <Overlay className={hide ? "hide" : ""}>
      <ConsoleIntro>
        <ConsoleStage>
          <ConsoleRings>
            <ConsoleRing className="r1 pulse" />
            <ConsoleRing className="r2 pulse" />
            <ConsoleRing className="r3 pulse" />
          </ConsoleRings>
          <ConsoleMark>
            <PulseCore />
            <ConsoleLogo>
              <div>ADVAITH&apos;S</div>
              <div className="line2">PORTFOLIO</div>
            </ConsoleLogo>
          </ConsoleMark>
        </ConsoleStage>
        <PressHint className={bootReady && assetsReady ? "show" : ""}>
          PRESS START
        </PressHint>
      </ConsoleIntro>
    </Overlay>
  );
};

export default Intro;
