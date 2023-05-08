/* eslint-disable react/no-children-prop */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Canvas, useThree } from "@react-three/fiber";
import Scan from "@/components/scan/Scan";
import { Lightmap } from "@react-three/lightmap";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { log } from "console";
const inter = Inter({ subsets: ["latin"] });


var scanPosition: number = 0;
var scanPositions: number[][] = [
  [0, 0, 0],
  [-12, 0, -12],
  [0, 12, 0],
  [-12, 0, 12],
  [12, 0, -12],
  [12, 0, 12],
  // [0, -12, 0],
];
const camPosition: number[] = [-6, 7, 7];

var focusIterator = 1;
var orbitPosition: number[] = [];


export default function Home() {
  const [scan1, setScan1] = useState(1);
  const [scan2, setScan2] = useState(2);
  const [scan3, setScan3] = useState(3);
  const [scan4, setScan4] = useState(4);
  const [scan5, setScan5] = useState(5);
  const [scan6, setScan6] = useState(6);

  useEffect(() => {

  })


  function repositionScan(currentPos: number) {
    let pos = ((focusIterator + currentPos) % 5) + 1;

    // if (pos === )
    
    return pos;
  }

  if (typeof window === "object") {
    document.onkeydown = (e) => {
      console.log("key", e.code);
  
      switch (e.code) {
        case "ArrowLeft":
          focusIterator -= 1;
          break;
        case "ArrowRight":
          focusIterator += 1;
          break;
      }
      if (focusIterator < 0) focusIterator = 0;
      if (focusIterator > 5) focusIterator = 5;
      // if (focusIterator < 1) focusIterator = 1;
      // if (focusIterator > 6) focusIterator = 6;
      
    };
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.sceneContainer}>
          <Canvas
            shadows
            className={styles.canvas}
            camera={{
              position: [camPosition[0], camPosition[1], camPosition[2]],
            }}
          >
            <ambientLight color="white" intensity={0.3} />
            <directionalLight
              intensity={1.5}
              position={[-3, 2, 0]}
              castShadow
            />
            {/* <SpotLight
              position={[3, 2, 2]}
              distance={15}
              angle={1.0}
              attenuation={15}
              anglePower={5} // Diffuse-cone anglePower (default: 5)
            /> */}
            {/* <Lightmap> */}
            <Scan
              id="flur"
              filePath="/scans/Flur_scan.glb"
              // position={scanPositions[1]}
              position={scanPositions[repositionScan(1)]}
              props={""}
            />
            <Scan
              id="dach"
              filePath="/scans/Dach_scan.glb"
              position={scanPositions[repositionScan(2)]}
              props={""}
            />
            <Scan
              id="küche"
              filePath="/scans/Küche_scan.glb"
              position={scanPositions[repositionScan(3)]}
              props={""}
            />
            <Scan
              id="polizeirevier"
              filePath="/scans/Polizeirevier_scan.glb"
              position={scanPositions[repositionScan(4)]}
              props={""}
            />
            <Scan
              id="wohnzimmer"
              filePath="/scans/Wohnzimmer_scan.glb"
              position={scanPositions[repositionScan(5)]}
              props={""}
            />
            <Scan
              id="parkplatz"
              filePath="/scans/Parkplatz_scan.glb"
              position={scanPositions[repositionScan(6)]}
              props={""}
            />

            <OrbitControls
            // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
              target={scanPositions[focusIterator]}
              rotateSpeed={0.3}
              panSpeed={0.05}
            />
            {/* </Lightmap> */}
          </Canvas>
        </div>
      </main>
    </>
  );
}
function useFrame(arg0: (state: any) => void) {
  throw new Error("Function not implemented.");
}
