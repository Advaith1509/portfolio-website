import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { Page } from "../../components/Page";
import { blue, green, maroon } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import mac from "../../assets/images/mac.png";
import highschool from "../../assets/images/highschool.jpeg";
import sos from "../../assets/images/sos.png";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, []);
  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
            Hi! I'm Advaith, a third-year B.Tech student at IIT Jodhpur majoring in Computer Science and Engineering (CSE).
            I’m passionate about Machine Learning, Artifical Intelligence, Computer Vision, and Quantitative Finance.
            I enjoy solving complex problems using data-driven approaches, from autonomous driving systems to financial risk modeling.
          </Paragraph>
          <Educations>
            <AboutItem
              color={maroon}
              active
              data={{
                title: "IIT Jodhpur",
                p: "B.Tech - Majors in CSE (2023-2027)",
                image: mac,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "Jayshree Periwal High School",
                p: "Senior Secondary (2021-2023)",
                image: highschool,
              }}
            />

          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas camera={{ position: [0, 0, 18] }}>
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};
