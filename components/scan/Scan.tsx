import React, { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";

interface ScanProps {
  id: string;
  filePath: string;
  position: number[];
  props: any;
}
export default function Scan({ id, filePath, position, props }: ScanProps) {
  const gltf = useLoader(GLTFLoader, filePath);

  return (
    <>
      <Float
        position={[1, 1.1, -0.5]}
        rotation={[Math.PI / 3.5, 0, 0]}
        rotationIntensity={1.5}
        floatIntensity={1}
        speed={1}
      >
        <mesh  {...props} receiveShadow castShadow>
          <primitive
            object={gltf.scene}
            position={position}
            children-0-castShadow
          />
        </mesh>
      </Float>
    </>
  );
}