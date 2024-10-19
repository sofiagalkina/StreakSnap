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
          number: { value: 37 },
          size: { value: 18 },
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
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 5, // Adds 5 particles on click
            },
            repulse: {
              distance: 100, // Repulses particles within 100px on hover
            },

          },
        },
      }}
    />
  );
};

export default Particle;
