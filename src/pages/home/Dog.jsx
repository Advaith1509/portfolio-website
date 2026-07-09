import { OrbitControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MathUtils, TextureLoader } from "three";
import dog from "../../assets/3d/dog3.glb";
import minecraftScreen from "../../assets/images/minecraft_screen.png";
import { useIsMobile } from "../../hooks";

const Dog = () => {
  const { isMobile } = useIsMobile();
  const gltf = useLoader(GLTFLoader, dog);
  const ref = useRef();
  const texture = useLoader(TextureLoader, minecraftScreen);
  const targetScale = isMobile ? 2.2 : 2.0;

  useFrame(() => {
    ref.current.rotation.y += 0.002;
    ref.current.scale.setScalar(
      MathUtils.lerp(ref.current.scale.x, targetScale, 0.08)
    );
  });

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // console.log(child.name); // debug
        // Common mesh names for the screen in this model are Curve004 or similar
        // We look for the one that likely has a dark material or is 'Curve004'
        if (child.name === "Curve004" || child.name === "Curve002") {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [gltf, texture]);
  return (
    <>
      <spotLight position={[5, 10, 7.5]} />
      <spotLight position={[-3, 10, -7.5]} />
      <pointLight color={"#f00"} position={[0, 0.6, 0]} distance="1.5" />
      {isMobile ? null : <OrbitControls enableZoom={false} enablePan={false} />}
      <primitive object={gltf.scene} scale={0.01} ref={ref} />
    </>
  );
};

export default Dog;
