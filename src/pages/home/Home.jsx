import { Canvas } from "@react-three/fiber";
import React, { Suspense, useContext, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { NavbarContext } from "../../context";
import Dog from "./Dog";
import Loader3D from "../../components/Loader3D";
import {
  DogContainer,
  HomeWrapper,
  Name,
  NameBlock,
  Surname,
  TextContainer,
} from "./Home.styled";

export const Home = () => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const setPage = useContext(NavbarContext);
  const blockRef = useRef(null);

  useEffect(() => {
    if (inView) {
      setPage("home");
    }
  }, [inView]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const block = blockRef.current;
    if (!block) return;
    const letters = Array.from(block.querySelectorAll(".ltr"));
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const tilt = { x: 0, y: 0 };
    let raf;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      const targetY = (mouse.x / window.innerWidth - 0.5) * 26;
      const targetX = -(mouse.y / window.innerHeight - 0.5) * 20;
      tilt.x += (targetX - tilt.x) * 0.08;
      tilt.y += (targetY - tilt.y) * 0.08;
      block.style.transform = `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

      const R = 170;
      const rects = letters.map((l) => l.getBoundingClientRect());
      letters.forEach((l, i) => {
        const r = rects[i];
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
        const lift = Math.max(0, 1 - dist / R);
        l.style.transform = `translateZ(${lift * 45}px) scale(${1 + lift * 0.3})`;
        l.style.textShadow =
          lift > 0.08 ? `0 0 ${lift * 20}px rgba(42, 212, 230, ${lift})` : "none";
      });
      raf = requestAnimationFrame(loop);
    };

    const timer = setTimeout(loop, 1400);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const renderLetters = (text, start) =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className="ltr"
        style={{ animationDelay: `${(start + i) * 0.06}s` }}
      >
        {ch}
      </span>
    ));

  return (
    <HomeWrapper ref={ref} id="home-page">
      <TextContainer>
        <NameBlock ref={blockRef}>
          <Name>{renderLetters("Advaith", 0)}</Name>
          <Surname>{renderLetters("Moholkar", 7)}</Surname>
        </NameBlock>
      </TextContainer>
      <DogContainer>
        <Canvas camera={{ position: [0, 2, 5] }}>
          <Suspense fallback={<Loader3D />}>
            <Dog />
          </Suspense>
        </Canvas>
      </DogContainer>
    </HomeWrapper>
  );
};
