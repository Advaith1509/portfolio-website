import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// Classic arrow as a pixel bitmap: o = outline, X = fill, . = empty
const ARROW = [
  "oo..........",
  "oXo.........",
  "oXXo........",
  "oXXXo.......",
  "oXXXXo......",
  "oXXXXXo.....",
  "oXXXXXXo....",
  "oXXXXXXXo...",
  "oXXXXXXXXo..",
  "oXXXXXoooo..",
  "oXXoXXo.....",
  "oXo.oXXo....",
  "oo...oXXo...",
  ".....oXXo...",
  "......oo....",
];
const PX = 2;
const W = ARROW[0].length * PX;
const H = ARROW.length * PX;

const CursorRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10001;
  will-change: transform;
  transform: translate3d(-100px, -100px, 0);
`;

const CursorScale = styled.div`
  transform-origin: 0 0;
  transition: transform 0.15s ease;
  &.hover {
    transform: scale(1.4);
  }
  &.click {
    transform: scale(1.1);
  }
`;

const CustomCursor = () => {
  const rootRef = useRef(null);
  const scaleRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("custom-cursor");

    const move = (e) => {
      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${e.clientX - 1}px, ${
          e.clientY - 1
        }px, 0)`;
      }
    };
    const isInteractive = (el) =>
      el.closest &&
      el.closest(
        "a, button, input, textarea, [role='button'], .navbar-item, canvas"
      );
    const over = (e) => {
      if (isInteractive(e.target)) scaleRef.current?.classList.add("hover");
    };
    const out = (e) => {
      if (isInteractive(e.target)) scaleRef.current?.classList.remove("hover");
    };
    const down = () => scaleRef.current?.classList.add("click");
    const up = () => scaleRef.current?.classList.remove("click");

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <CursorRoot ref={rootRef}>
      <CursorScale ref={scaleRef}>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          shapeRendering="crispEdges"
        >
          {ARROW.flatMap((row, r) =>
            row.split("").map((ch, c) =>
              ch === "." ? null : (
                <rect
                  key={`${r}-${c}`}
                  x={c * PX}
                  y={r * PX}
                  width={PX}
                  height={PX}
                  fill={ch === "o" ? "var(--accent-ink)" : "var(--accent)"}
                />
              )
            )
          )}
        </svg>
      </CursorScale>
    </CursorRoot>
  );
};

export default CustomCursor;
