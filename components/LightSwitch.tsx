import React from "react";
import { motion, useAnimation } from "framer-motion";
import sun_u from "../public/images/sun_u.png";
import moon from "../public/images/moon_u.png";
import Image from "next/image";

const LightSwitch = ({ isOn, setIsOn }: { isOn: any, setIsOn: any }) => {
  const controls = useAnimation();

  return (
    <div
      style={{
        marginTop: "20px",
      }}
      onClick={
        () => {
          console.log(isOn);
          if (isOn) {
            controls.start({
              x: 60,
              transition: {
                duration: 0.2,
                type: "spring",
                damping: 12,
              },
            });
          } else {
            controls.start({
              x: 5,
              transition: {
                duration: 0.2,
                type: "spring",
                damping: 12,
              },
            });
          }
          setIsOn(!isOn);
        }
      }>
      <Image style={{ borderRadius: "20px" }} src={isOn ? "/images/sun_u.png" : "/images/moon_u.png"} width={100} height={40} alt="button" />
      <motion.div
        className="LightSwitchToggle"
        animate={controls}
        initial={{ x: 5, y: 2 }}
        style={{
          position: 'absolute',
          top: 20,
          backgroundColor: isOn ? "white" : "black",
          width: 35,
          height: 35,
          borderRadius: 40,
        }}
      />
    </div>
  );
};

export default LightSwitch;