import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particle = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log("Particles initializing...");
    await loadFull(engine); // Ensure the engine is fully loaded with all interactions
    console.log("Particles loaded!");
  }, []);

  return (
    <Particles
      className="h-screen w-full z-0"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 27 },
          size: { value: 16 },
          move: { enable: true, speed: 2 },
          shape: {
            type: "image",
            image: {
              src: "/assets/plum.png",
              width: 70,
              height: 100,
            },
          },
          color: { value: "#FF1493" },
        },
      }}
    />
  );
};

export default Particle;
