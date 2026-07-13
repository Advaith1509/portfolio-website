import styled from "styled-components";

export const StyledNavbar = styled.nav`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  z-index: 100;
  transition: transform 0.28s ease, opacity 0.28s ease;

  &.hidden {
    transform: translateX(-50%) translateY(-140%);
    opacity: 0;
    pointer-events: none;
  }

  &.collapsed .full-nav {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    pointer-events: none;
  }

  &.collapsed .dots-nav {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
  }

  @media screen and (max-width: 720px) {
    top: 0;
    left: 0;
    transform: translateX(-150%);
    width: 70vw;
    height: 100%;
    border: 0;
    border-radius: 0;
    background-color: #121212cc;
    backdrop-filter: blur(5px);
    transition: transform 0.2s ease-in-out;

    &.hidden {
      transform: translateX(-150%);
      opacity: 1;
      pointer-events: auto;
    }

    &.collapsed .full-nav,
    .full-nav {
      opacity: 1;
      visibility: visible;
      transform: none;
      pointer-events: auto;
      flex-direction: column;
      align-items: flex-start;

      .home_navbar-item {
        order: -1;
      }
    }

    .dots-nav {
      display: none;
    }

    &.active {
      transform: translateX(0%);
    }
  }
`;

export const FullNavList = styled.ul.attrs({ className: "full-nav" })`
  position: relative;
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9), 0 0 8px rgba(42, 212, 230, 0.24);
  transition: opacity 0.22s ease, transform 0.22s ease, visibility 0.22s ease;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -0.55rem;
    width: min(96vw, 520px);
    height: 1px;
    transform: translateX(-50%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(42, 212, 230, 0.58),
      transparent
    );
  }

  .mobile-home-item {
    display: none;
  }

  @media screen and (max-width: 720px) {
    gap: 2rem;
    padding: 1rem;
    text-shadow: none;

    &::after {
      display: none;
    }

    .mobile-home-item {
      display: list-item;
    }
  }
`;

export const DotsNav = styled.div.attrs({ className: "dots-nav" })`
  position: absolute;
  left: 50%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  padding: 0.5rem 0.65rem;
  border: 1px solid rgba(42, 212, 230, 0.16);
  border-radius: 999px;
  background: rgba(4, 37, 43, 0.44);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(8px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateX(-50%) translateY(-8px);
  transition: opacity 0.22s ease, transform 0.22s ease, visibility 0.22s ease;

  .mascot-slot {
    width: 54px;
    height: 62px;
    margin: 0 0.1rem;
    display: grid;
    place-items: center;
  }
`;

export const DotButton = styled.button`
  position: relative;
  width: 9px;
  height: 9px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition: width 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;

  &.active {
    width: 26px;
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 12px rgba(42, 212, 230, 0.62);
  }

  &::after {
    content: attr(data-label);
    position: absolute;
    left: 50%;
    top: calc(100% + 0.7rem);
    transform: translateX(-50%) translateY(-4px);
    padding: 0.35rem 0.48rem;
    border: 1px solid rgba(42, 212, 230, 0.28);
    border-radius: 4px;
    background: rgba(4, 37, 43, 0.92);
    color: #fff;
    font: 700 0.68rem "Roboto Mono", monospace;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.16s ease, transform 0.16s ease;
  }

  &:hover::after,
  &:focus-visible::after,
  &.active::after {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  &.active::after {
    opacity: 0.78;
  }
`;
