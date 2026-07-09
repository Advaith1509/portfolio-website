import styled, { keyframes } from "styled-components";
import { displayFont } from "../../utils";

export const HomeWrapper = styled.main`
  display: grid;
  height: 100vh;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
  @media screen and (max-width: 920px) {
    grid-template-rows: 1fr 1fr;
  }
`;

export const DogContainer = styled.aside`
  grid-column: 8/13;
  @media screen and (max-width: 920px) {
    grid-column: 1/ 13;
    align-self: start;
  }
`;

export const TextContainer = styled.section`
  grid-column: 2/ 8;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  perspective: 900px;
  @media screen and (max-width: 1204px) {
    gap: 2.5rem;
  }
  @media screen and (max-width: 920px) {
    grid-column: 1/ 13;
    align-self: end;
    padding-inline: 1rem;
    justify-self: center;
    align-self: center;
  }
  @media screen and (max-width: 480px) {
    gap: 1.5rem;
  }
`;

export const Name = styled.h1`
  font-family: ${displayFont};
  font-size: 3rem;
  font-weight: bolder;
  margin: 0;
  line-height: 1.2;
  color: #fff;
  transform-style: preserve-3d;
  @media screen and (max-width: 1204px) {
    font-size: 2.4rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.6rem;
    text-align: center;
  }
`;

export const Surname = styled.h1`
  font-family: ${displayFont};
  font-size: 3rem;
  font-weight: bolder;
  margin: 0;
  line-height: 1.2;
  color: var(--accent);
  cursor: default;
  transform-style: preserve-3d;
  @media screen and (max-width: 1204px) {
    font-size: 2.4rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 1.6rem;
    text-align: center;
  }
`;

const letterIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const NameBlock = styled.div`
  transform-style: preserve-3d;
  will-change: transform;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  .ltr {
    display: inline-block;
    will-change: transform;
    animation: ${letterIn} 0.5s ease backwards;
  }
  @media screen and (max-width: 480px) {
    align-items: center;
  }
`;
