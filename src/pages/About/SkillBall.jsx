import { useFrame, extend } from "@react-three/fiber";
import SpriteText from "three-spritetext";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useIsMobile } from "../../hooks";
extend({ SpriteText });

const Skills = () => {
  const { isMobile } = useIsMobile();
  const getPos = (k) => {
    let a = Math.random();
    let b = Math.random();
    return b > 0.5 ? a * k : a * -1 * k;
  };
  const skills = [
    // Languages
    "Python",
    "C/C++",
    "C#",
    "SQL",
    "JavaScript",
    "HTML/CSS",

    // ML/DL
    "PyTorch",
    "TensorFlow",
    "OpenCV",
    "scikit-learn",
    "Albumentations",

    // Data/Tools
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Seaborn",
    "Streamlit",
    "Git",
    "PostgreSQL",
    "MySQL",
    "Excel",
    "VS Code",
    "Docker",
    "ASP.NET",
    "Azure",
  ];

  const g = useRef();
  useFrame(() => {
    g.current.rotation.x += 0.002;
    g.current.rotation.y += 0.002;
    // g.current.rotation.z += 0.001;
  });
  return (
    <>
      {isMobile ? null : <OrbitControls enablePan={false} enableZoom={false} />}
      <pointLight position={[-2, 2, 2]} args={["#fff", 0.3]} />
      <group ref={g} position={[0, 2, 0]} scale={0.11}>
        {skills.map((a, i) => {
          return (
            <spriteText
              text={a}
              key={i}
              fontSize={90}
              position={[getPos(80), getPos(80), getPos(80)]}
              fontFace={"'Fira Code','Roboto Mono', monospace"}
              color={i % 2 === 0 ? "#FAFF81" : "#E06D06"}
            />
          );
        })}
      </group>
    </>
  );
};

export default Skills;
