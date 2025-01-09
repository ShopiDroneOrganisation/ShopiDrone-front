import Image from "next/image";
import "./PictureMenu.scss";

import drone from "../../public/images/drone.png";
import droneBattery from "../../public/images/droneBattery.png";
import dronePropellers from "../../public/images/dronePropellers.png";
import droneCamera from "../../public/images/droneCamera.png";
import droneRemote from "../../public/images/droneRemote.png";
import droneElectronic from "../../public/images/droneElectronic.png";

const PictureMenu = () => {
  const menuItems = [
    { label: "Drones", imageSrc: drone, className: "drones" },
    { label: "Batteries", imageSrc: droneBattery, className: "batteries" },
    { label: "Hélices", imageSrc: dronePropellers, className: "helices" },
    { label: "Cameras", imageSrc: droneCamera, className: "cameras" },
    { label: "Télécommandes", imageSrc: droneRemote, className: "telecommandes" },
    { label: "Électronique", imageSrc: droneElectronic, className: "electronique" },
  ];

  return (
    <div className="menu">
      {menuItems.map((item, index) => (
        <div key={index} className={`menuItem ${item.className}`}>
          <Image src={item.imageSrc} alt={item.label} className="image" width={80} height={80} />
          <span className="label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PictureMenu;